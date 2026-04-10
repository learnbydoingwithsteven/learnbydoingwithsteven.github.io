import argparse
import io
import math
import posixpath
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps


WIDTH = 1600
HEIGHT = 900
NS_R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input_file", required=True)
    parser.add_argument("--output_file", required=True)
    parser.add_argument(
        "--preset",
        default="general",
        choices=["general", "ai-lessons", "hrbp"],
    )
    return parser.parse_args()


def load_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\msyhbd.ttc" if bold else r"C:\Windows\Fonts\msyh.ttc",
        r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


FONT_SMALL = load_font(28)
FONT_META = load_font(32, bold=True)
FONT_TITLE = load_font(70, bold=True)
FONT_SUBTITLE = load_font(48, bold=True)
FONT_BODY = load_font(28)
FONT_BADGE = load_font(30, bold=True)


def normalize_text(value):
    cleaned = value.replace("\u2022", " ").replace("\u00a0", " ")
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def dedupe_texts(values):
    seen = set()
    result = []
    for value in values:
        cleaned = normalize_text(value)
        if not cleaned:
            continue
        key = cleaned.casefold()
        if key in seen:
            continue
        seen.add(key)
        result.append(cleaned)
    return result


def extract_slide_texts(deck_path):
    with zipfile.ZipFile(deck_path) as archive:
        slide_xml = ET.fromstring(archive.read("ppt/slides/slide1.xml"))
        texts = [node.text for node in slide_xml.iter() if node.tag.endswith("t") and node.text]
    return dedupe_texts(texts)


def extract_first_slide_image(deck_path):
    with zipfile.ZipFile(deck_path) as archive:
        try:
            slide_xml = ET.fromstring(archive.read("ppt/slides/slide1.xml"))
            rels_xml = ET.fromstring(archive.read("ppt/slides/_rels/slide1.xml.rels"))
        except KeyError:
            return None

        rel_map = {
            rel.attrib.get("Id"): rel.attrib.get("Target")
            for rel in rels_xml
            if rel.attrib.get("Id") and rel.attrib.get("Target")
        }

        for node in slide_xml.iter():
            if not node.tag.endswith("blip"):
                continue
            rel_id = node.attrib.get(f"{{{NS_R}}}embed")
            target = rel_map.get(rel_id)
            if not target:
                continue
            zip_target = posixpath.normpath(posixpath.join("ppt/slides", target))
            try:
                with archive.open(zip_target) as image_file:
                    return Image.open(io.BytesIO(image_file.read())).convert("RGB")
            except Exception:
                continue
    return None


def blend(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def build_gradient(size, top_color, bottom_color):
    width, height = size
    image = Image.new("RGB", size, top_color)
    draw = ImageDraw.Draw(image)
    for y in range(height):
        color = blend(top_color, bottom_color, y / max(height - 1, 1))
        draw.line((0, y, width, y), fill=color)
    return image


def add_blur_blob(image, xy, radius, color, blur=50):
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    x, y = xy
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=color)
    overlay = overlay.filter(ImageFilter.GaussianBlur(blur))
    image.alpha_composite(overlay)


def add_grid_overlay(image, color, spacing=32, inset=36):
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    width, height = image.size
    for x in range(inset, width - inset, spacing):
        draw.line((x, inset, x, height - inset), fill=color, width=1)
    for y in range(inset, height - inset, spacing):
        draw.line((inset, y, width - inset, y), fill=color, width=1)
    image.alpha_composite(overlay)


def make_round_mask(size, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size[0], size[1]), radius=radius, fill=255)
    return mask


def draw_chip(base, box, text, fill, text_fill):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rounded_rectangle(box, radius=24, fill=fill)
    text_bbox = draw.textbbox((0, 0), text, font=FONT_BADGE)
    text_x = box[0] + ((box[2] - box[0]) - (text_bbox[2] - text_bbox[0])) / 2
    text_y = box[1] + ((box[3] - box[1]) - (text_bbox[3] - text_bbox[1])) / 2 - 2
    draw.text((text_x, text_y), text, font=FONT_BADGE, fill=text_fill)
    base.alpha_composite(overlay)


def tokenize(text):
    if re.search(r"[A-Za-z]", text) and " " in text:
        return re.findall(r"\S+\s*", text)
    return list(text)


def wrap_text(draw, text, font, max_width, max_lines):
    tokens = tokenize(text)
    lines = []
    current = ""
    truncated = False

    for token in tokens:
        candidate = f"{current}{token}"
        if not current or draw.textlength(candidate, font=font) <= max_width:
            current = candidate
            continue
        lines.append(current.rstrip())
        current = token.lstrip()
        if len(lines) >= max_lines:
            truncated = True
            break

    if len(lines) < max_lines and current:
        lines.append(current.rstrip())

    if len(lines) > max_lines:
        lines = lines[:max_lines]

    if truncated and lines:
        last = lines[-1].rstrip(". ")
        while draw.textlength(f"{last}...", font=font) > max_width and last:
            last = last[:-1]
        lines[-1] = f"{last}..."

    return lines


def draw_lines(draw, x, y, lines, font, fill, spacing):
    cursor = y
    for line in lines:
        draw.text((x, cursor), line, font=font, fill=fill)
        bbox = draw.textbbox((x, cursor), line, font=font)
        cursor = bbox[3] + spacing
    return cursor


def safe_ai_payload(deck_path, texts):
    stem = Path(deck_path).stem
    match = re.search(r"Lesson_(\d+)", stem, re.IGNORECASE)
    lesson_number = f"{int(match.group(1)):03d}" if match else None

    filtered = [
        text
        for text in texts
        if text not in {"零基础到前沿 AI", "100课系列", "Zero to SOTA AI", "100-Lesson Series"}
    ]

    zh_title = next((text for text in filtered if text.startswith("第") and "课" in text), None)
    en_title = next((text for text in filtered if text.lower().startswith("lesson ")), None)
    summary = next((text for text in filtered if "goal" in text.lower() or "目标" in text), None)

    if not zh_title and filtered:
        zh_title = filtered[0]
    if not en_title:
        en_title = next((text for text in filtered if re.search(r"[A-Za-z]{4}", text)), "Bilingual frontier AI curriculum")
    if not summary:
        summary = "100 bilingual lessons spanning AI fundamentals, tools, models, agents, multimodal systems and frontier workflows."

    return {
        "eyebrow": "Zero to SOTA AI",
        "badge": f"Lesson {lesson_number}" if lesson_number else "100 Lessons",
        "title_lines": [zh_title or "Zero to SOTA AI", en_title],
        "summary": summary,
        "footer_left": "ZH / EN bilingual curriculum",
        "footer_right": "AI learning series",
    }


def safe_hrbp_payload(deck_path):
    stem = Path(deck_path).stem
    match = re.search(r"HRBP_Logistics_(\d+)_(.+?)_CN-IT", stem, re.IGNORECASE)
    module_number = f"{int(match.group(1)):02d}" if match else "00"
    topic_slug = match.group(2) if match else stem

    title = topic_slug.replace("_", " ").strip()
    title = title.replace("Recruitment Training", "Recruitment & Training")
    title = title.replace("HRBP", "HRBP")
    title = re.sub(r"\s+", " ", title).title()

    return {
        "eyebrow": "Logistics HRBP Playbook",
        "badge": f"Module {module_number}",
        "title_lines": [title, "CN / IT bilingual delivery deck"],
        "summary": "Sanitized public showcase covering people operations, governance, capability building and compliance workflows.",
        "footer_left": "Industry training archive",
        "footer_right": "Sanitized display",
    }


def general_payload(deck_path, texts):
    stem = Path(deck_path).stem.replace("_", " ")
    title = texts[0] if texts else stem
    subtitle = texts[1] if len(texts) > 1 else "Presentation archive"
    summary = texts[2] if len(texts) > 2 else "Fallback cover generated from the first slide package contents."
    return {
        "eyebrow": "Presentation archive",
        "badge": "Deck",
        "title_lines": [title, subtitle],
        "summary": summary,
        "footer_left": "Generated fallback cover",
        "footer_right": "Public portfolio",
    }


def fit_preview(image, size):
    return ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def draw_ai_visual(base, preview):
    width, height = base.size
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel_box = (975, 110, 1490, 760)
    draw.rounded_rectangle(panel_box, radius=52, fill=(11, 23, 39, 150), outline=(136, 223, 255, 70), width=2)

    if preview is not None:
        preview = fit_preview(preview, (panel_box[2] - panel_box[0] - 28, panel_box[3] - panel_box[1] - 28))
        mask = make_round_mask(preview.size, 40)
        image_layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
        image_layer.paste(preview.convert("RGBA"), (panel_box[0] + 14, panel_box[1] + 14), mask)
        image_layer = image_layer.filter(ImageFilter.GaussianBlur(0.2))
        base.alpha_composite(image_layer)
    else:
        draw.rounded_rectangle(
            (panel_box[0] + 24, panel_box[1] + 24, panel_box[2] - 24, panel_box[3] - 24),
            radius=38,
            fill=(27, 54, 85, 210),
        )
        for idx in range(6):
            alpha = 70 - idx * 8
            draw.arc(
                (
                    panel_box[0] + 70 - idx * 6,
                    panel_box[1] + 110 - idx * 6,
                    panel_box[2] - 70 + idx * 6,
                    panel_box[3] - 110 + idx * 6,
                ),
                start=200,
                end=340,
                fill=(122, 231, 255, max(alpha, 12)),
                width=3,
            )

    for idx, offset in enumerate((0, 56, 112)):
        draw.line(
            (1020, 805 + idx * 8, 1350 - offset, 805 + idx * 8),
            fill=(145, 226, 255, 150 - idx * 25),
            width=6,
        )

    base.alpha_composite(overlay)


def draw_hrbp_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    cards = [
        (980, 130, 1450, 345),
        (1030, 280, 1500, 495),
        (980, 430, 1450, 645),
    ]
    fills = [
        (247, 193, 106, 210),
        (153, 204, 255, 200),
        (255, 237, 210, 210),
    ]
    for box, fill in zip(cards, fills):
        draw.rounded_rectangle(box, radius=42, fill=fill)
        draw.rounded_rectangle(box, radius=42, outline=(255, 255, 255, 120), width=2)
        for line_idx in range(4):
            y = box[1] + 44 + line_idx * 34
            draw.line((box[0] + 36, y, box[2] - 36 - line_idx * 28, y), fill=(42, 59, 76, 120), width=8)

    for point in [(1050, 700), (1190, 760), (1330, 700), (1470, 760)]:
        draw.ellipse((point[0] - 13, point[1] - 13, point[0] + 13, point[1] + 13), fill=(255, 183, 77, 220))
    draw.line((1050, 700, 1190, 760, 1330, 700, 1470, 760), fill=(51, 84, 114, 180), width=5)

    base.alpha_composite(overlay)


def compose_cover(deck_path, output_path, preset):
    texts = extract_slide_texts(deck_path)

    if preset == "ai-lessons":
        payload = safe_ai_payload(deck_path, texts)
        preview = extract_first_slide_image(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (6, 16, 31), (10, 35, 62))
        base = background.convert("RGBA")
        add_blur_blob(base, (1240, 210), 220, (42, 164, 255, 85), blur=80)
        add_blur_blob(base, (350, 700), 240, (52, 219, 181, 55), blur=95)
        add_grid_overlay(base, (132, 215, 255, 28), spacing=38, inset=42)
        draw_ai_visual(base, preview)
        title_fill = (238, 248, 255, 255)
        subtitle_fill = (171, 224, 255, 255)
        body_fill = (199, 223, 242, 255)
        chip_fill = (123, 228, 255, 240)
        chip_text = (5, 31, 48, 255)
    elif preset == "hrbp":
        payload = safe_hrbp_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (246, 240, 228), (227, 233, 240))
        base = background.convert("RGBA")
        add_blur_blob(base, (1280, 210), 220, (255, 179, 71, 72), blur=85)
        add_blur_blob(base, (260, 750), 200, (86, 134, 188, 64), blur=90)
        add_grid_overlay(base, (88, 116, 142, 18), spacing=40, inset=44)
        draw_hrbp_visual(base)
        title_fill = (28, 42, 56, 255)
        subtitle_fill = (55, 86, 112, 255)
        body_fill = (84, 101, 119, 255)
        chip_fill = (44, 88, 122, 235)
        chip_text = (245, 248, 251, 255)
    else:
        payload = general_payload(deck_path, texts)
        background = build_gradient((WIDTH, HEIGHT), (22, 24, 36), (34, 52, 74))
        base = background.convert("RGBA")
        add_blur_blob(base, (1160, 250), 230, (122, 152, 255, 84), blur=90)
        add_grid_overlay(base, (255, 255, 255, 16), spacing=42, inset=44)
        title_fill = (241, 245, 255, 255)
        subtitle_fill = (190, 210, 255, 255)
        body_fill = (203, 214, 235, 255)
        chip_fill = (160, 182, 255, 230)
        chip_text = (28, 36, 58, 255)

    draw = ImageDraw.Draw(base)
    draw_chip(base, (90, 72, 330, 134), payload["badge"], chip_fill, chip_text)

    eyebrow_y = 180
    draw.text((98, eyebrow_y), payload["eyebrow"].upper(), font=FONT_META, fill=subtitle_fill)

    title_y = eyebrow_y + 72
    for idx, title in enumerate(payload["title_lines"][:2]):
        font = FONT_TITLE if idx == 0 else FONT_SUBTITLE
        max_width = 760
        lines = wrap_text(draw, title, font, max_width, 2 if idx == 0 else 3)
        title_y = draw_lines(draw, 98, title_y, lines, font, title_fill if idx == 0 else subtitle_fill, 14 if idx == 0 else 12) + 10

    summary_lines = wrap_text(draw, payload["summary"], FONT_BODY, 760, 4)
    summary_y = title_y + 18
    draw_lines(draw, 98, summary_y, summary_lines, FONT_BODY, body_fill, 12)

    footer_y = 812
    draw.text((98, footer_y), payload["footer_left"], font=FONT_SMALL, fill=body_fill)
    right_bbox = draw.textbbox((0, 0), payload["footer_right"], font=FONT_SMALL)
    right_width = right_bbox[2] - right_bbox[0]
    draw.text((WIDTH - 104 - right_width, footer_y), payload["footer_right"], font=FONT_SMALL, fill=body_fill)

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(output_path, quality=95)


def main():
    args = parse_args()
    compose_cover(args.input_file, args.output_file, args.preset)


if __name__ == "__main__":
    main()
