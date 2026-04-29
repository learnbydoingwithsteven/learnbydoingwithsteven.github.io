import argparse
import re
from pathlib import Path

from docx import Document
from PIL import Image, ImageDraw, ImageFilter, ImageFont


WIDTH = 1600
HEIGHT = 900


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input_file", required=True)
    parser.add_argument("--output_file", required=True)
    parser.add_argument(
        "--preset",
        default="general-doc",
        choices=["general-doc", "bank-ict"],
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
FONT_META = load_font(30, bold=True)
FONT_TITLE = load_font(66, bold=True)
FONT_SUBTITLE = load_font(40, bold=True)
FONT_BODY = load_font(28)
FONT_BADGE = load_font(28, bold=True)


def normalize_text(text):
    cleaned = text.replace("\u2022", " ").replace("\u00a0", " ")
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def extract_doc_texts(doc_path):
    document = Document(doc_path)
    texts = []
    for paragraph in document.paragraphs:
        value = normalize_text(paragraph.text)
        if value:
            texts.append(value)
    return texts


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


def add_grid_overlay(image, color, spacing=38, inset=40):
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    width, height = image.size
    for x in range(inset, width - inset, spacing):
        draw.line((x, inset, x, height - inset), fill=color, width=1)
    for y in range(inset, height - inset, spacing):
        draw.line((inset, y, width - inset, y), fill=color, width=1)
    image.alpha_composite(overlay)


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
    if re.search(r"[\u4e00-\u9fff]", text):
        return list(text)
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


def bank_ict_payload(doc_path, texts):
    stem = Path(doc_path).stem.replace("_", " ")
    if "分析" in stem:
        badge = "BRIEF"
        subtitle = "系统架构分析简报"
    elif any(keyword in stem for keyword in ("调研报告", "调查报告", "研究报告")):
        badge = "REPORT"
        subtitle = "系统设计调研报告"
    else:
        badge = "DOCX"
        subtitle = "银行 ICT 专题材料"

    return {
        "badge": badge,
        "eyebrow": "Bank ICT Architecture Archive",
        "title_lines": ["大型银行 ICT 架构", subtitle],
        "summary": "聚焦核心系统、内部平台、流程设计、技术治理与 AI 赋能路径的行业研究型文档归档。",
        "footer_left": "Word document matrix",
        "footer_right": "Sanitized dossier",
    }


def general_doc_payload(doc_path, texts):
    stem = Path(doc_path).stem.replace("_", " ")
    title = texts[0] if texts else stem
    subtitle = texts[1] if len(texts) > 1 else "Document archive"
    summary_source = texts[2:6] if len(texts) > 2 else [stem]
    summary = " / ".join(summary_source)[:320]

    return {
        "badge": "DOCX",
        "eyebrow": "Document archive",
        "title_lines": [title, subtitle],
        "summary": summary or "Document-based delivery matrix generated from the source file.",
        "footer_left": "Rendered from Word source",
        "footer_right": "Public showcase",
    }


def draw_document_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    stacks = [
        ((1010, 132, 1458, 702), (244, 248, 255, 235)),
        ((1045, 165, 1493, 735), (232, 239, 248, 200)),
        ((1080, 198, 1528, 768), (220, 231, 244, 170)),
    ]
    for box, fill in reversed(stacks):
        draw.rounded_rectangle(box, radius=42, fill=fill, outline=(103, 131, 168, 85), width=2)

    front = (980, 98, 1428, 668)
    draw.rounded_rectangle(front, radius=42, fill=(255, 255, 255, 240), outline=(98, 124, 160, 115), width=2)
    draw.rounded_rectangle((1026, 156, 1368, 188), radius=16, fill=(29, 67, 112, 230))

    for idx in range(8):
        top = 228 + idx * 48
        draw.line((1035, top, 1365 - (idx % 3) * 30, top), fill=(86, 108, 136, 135), width=10)
        draw.line((1035, top + 22, 1280 + (idx % 2) * 45, top + 22), fill=(152, 168, 189, 108), width=8)

    draw.rounded_rectangle((1160, 560, 1380, 640), radius=18, fill=(229, 236, 245, 240))
    for idx, x in enumerate((1188, 1238, 1288, 1338)):
        bar_height = (idx + 2) * 9
        draw.rounded_rectangle((x, 625 - bar_height, x + 22, 625), radius=8, fill=(63, 116, 190, 205))

    base.alpha_composite(overlay)


def compose_cover(doc_path, output_path, preset):
    texts = extract_doc_texts(doc_path)
    payload = bank_ict_payload(doc_path, texts) if preset == "bank-ict" else general_doc_payload(doc_path, texts)

    background = build_gradient((WIDTH, HEIGHT), (245, 247, 250), (230, 236, 244))
    base = background.convert("RGBA")
    add_blur_blob(base, (1280, 180), 210, (82, 135, 220, 58), blur=80)
    add_blur_blob(base, (290, 760), 200, (89, 124, 173, 46), blur=95)
    add_grid_overlay(base, (75, 99, 130, 16), spacing=40, inset=44)
    draw_document_visual(base)

    draw = ImageDraw.Draw(base)
    draw_chip(base, (88, 72, 270, 132), payload["badge"], (37, 72, 118, 235), (245, 248, 251, 255))

    eyebrow_y = 178
    draw.text((96, eyebrow_y), payload["eyebrow"].upper(), font=FONT_META, fill=(63, 96, 132, 255))

    title_y = eyebrow_y + 70
    title_y = draw_lines(draw, 96, title_y, wrap_text(draw, payload["title_lines"][0], FONT_TITLE, 760, 3), FONT_TITLE, (23, 34, 47, 255), 12) + 10
    title_y = draw_lines(draw, 96, title_y, wrap_text(draw, payload["title_lines"][1], FONT_SUBTITLE, 760, 3), FONT_SUBTITLE, (55, 86, 118, 255), 10) + 16
    draw_lines(draw, 96, title_y, wrap_text(draw, payload["summary"], FONT_BODY, 760, 5), FONT_BODY, (83, 102, 124, 255), 12)

    footer_y = 812
    draw.text((96, footer_y), payload["footer_left"], font=FONT_SMALL, fill=(93, 112, 132, 255))
    right_bbox = draw.textbbox((0, 0), payload["footer_right"], font=FONT_SMALL)
    draw.text((WIDTH - 98 - (right_bbox[2] - right_bbox[0]), footer_y), payload["footer_right"], font=FONT_SMALL, fill=(93, 112, 132, 255))

    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    base.convert("RGB").save(output_path, quality=95)


def main():
    args = parse_args()
    compose_cover(args.input_file, args.output_file, args.preset)


if __name__ == "__main__":
    main()
