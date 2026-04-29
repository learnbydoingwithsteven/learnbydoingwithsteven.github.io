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
        choices=["general", "ai-lessons", "hrbp", "robotics", "governance", "ai-marketing", "credit-risk", "due-diligence", "office-productivity"],
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


def stable_code(text, prefix, digits=2):
    value = sum((index + 1) * ord(char) for index, char in enumerate(text))
    modulus = 10 ** digits
    number = value % modulus
    if number == 0:
        number = modulus
    return f"{prefix} {number:0{digits}d}"


def parse_chinese_number(value):
    mapping = {
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
        "七": 7,
        "八": 8,
        "九": 9,
        "十": 10,
        "十一": 11,
        "十二": 12,
        "十三": 13,
        "十四": 14,
        "十五": 15,
    }
    return mapping.get(value)


def extract_training_day(stem):
    match = re.search(r"day\s*0?(\d{1,2})", stem, re.IGNORECASE)
    if match:
        return int(match.group(1))

    match = re.search(r"第([一二三四五六七八九十]{1,3})天", stem)
    if match:
        return parse_chinese_number(match.group(1))

    return None


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


def robotics_payload(deck_path):
    stem = Path(deck_path).stem
    return {
        "eyebrow": "Embodied intelligence research",
        "badge": stable_code(stem, "Case"),
        "title_lines": ["具身智能市场研究", "专题案例与产品分析"],
        "summary": "面向具身智能赛道的市场扫描、产品能力梳理、商业化路径判断与代表性案例对比。",
        "footer_left": "Public research showcase",
        "footer_right": "Sanitized portfolio",
    }


def governance_payload(deck_path):
    stem = Path(deck_path).stem
    module_match = re.search(r"(?:^|[_-])(\d{1,2})(?:[_-]|$)", stem)
    lower_stem = stem.lower()
    if "cheatsheet" in lower_stem:
        badge = "Cheatsheet"
        title_lines = ["AI 治理课程记录", "速查资料与执行清单"]
    elif "script" in lower_stem:
        badge = "Script"
        title_lines = ["AI 治理课程记录", "讲稿归档与课堂支撑"]
    else:
        badge = f"Module {int(module_match.group(1)):02d}" if module_match else stable_code(stem, "Module")
        title_lines = ["AI 治理课程记录", "治理框架、流程与落地实践"]

    return {
        "eyebrow": "AI governance delivery",
        "badge": badge,
        "title_lines": title_lines,
        "summary": "覆盖治理框架、职责分工、风险边界、制度设计、落地流程与课堂配套材料的完整课程记录。",
        "footer_left": "Training archive",
        "footer_right": "Public showcase",
    }


def ai_marketing_payload(deck_path):
    stem = Path(deck_path).stem
    day_match = re.search(r"Day\s*0?(\d+)", stem, re.IGNORECASE)
    day_number = int(day_match.group(1)) if day_match else None
    badge = f"Day {day_number:02d}" if day_number else stable_code(stem, "Day")
    subtitle = f"第 {day_number:02d} 讲 / 中国市场专题" if day_number else "中国市场专题训练营"
    return {
        "eyebrow": "AI marketing intensive",
        "badge": badge,
        "title_lines": ["AI 营销训练营", subtitle],
        "summary": "聚焦中国市场窗口期、内容生产、品牌增长、渠道协同与训练营式落地推进的系列课程交付。",
        "footer_left": "Course delivery archive",
        "footer_right": "Sanitized portfolio",
    }


def credit_risk_payload(deck_path):
    stem = Path(deck_path).stem
    lower_stem = stem.lower()
    day_number = extract_training_day(stem)

    if "cheatsheet" in lower_stem or "讲义" in stem:
        badge = "Cheatsheet"
        subtitle = "速查手册与课堂讲义"
    elif "script" in lower_stem or "speaker" in lower_stem or "讲稿" in stem:
        badge = "Script"
        subtitle = "逐页讲稿与讲师支撑"
    elif "15天培训课程" in stem:
        badge = "Master"
        subtitle = "15 天体系总览"
    elif day_number is not None:
        badge = f"Day {day_number:02d}"
        subtitle = f"第 {day_number:02d} 天 / 信贷流程专题"
    else:
        badge = stable_code(stem, "Deck")
        subtitle = "流程识别与风险评估"

    return {
        "eyebrow": "Bank credit risk training",
        "badge": badge,
        "title_lines": ["银行信贷风险课程", subtitle],
        "summary": "围绕客户准入、授信分析、贷中审查、贷后管理与合规风控展开的系统化课程交付。",
        "footer_left": "Training archive",
        "footer_right": "Public showcase",
    }


def due_diligence_payload(deck_path):
    stem = Path(deck_path).stem
    lower_stem = stem.lower()
    day_number = extract_training_day(stem)

    if "cheatsheet" in lower_stem or "讲义" in stem:
        badge = "Cheatsheet"
        subtitle = "现场尽调速查资料"
    elif "script" in lower_stem or "speaker" in lower_stem or "讲稿" in stem:
        badge = "Script"
        subtitle = "讲稿归档与课堂支撑"
    elif "15天培训课程" in stem:
        badge = "Master"
        subtitle = "15 天课程总览"
    elif day_number is not None:
        badge = f"Day {day_number:02d}"
        subtitle = f"第 {day_number:02d} 天 / 现场识别专题"
    else:
        badge = stable_code(stem, "Deck")
        subtitle = "尽调与评估专题"

    return {
        "eyebrow": "Due diligence evaluation",
        "badge": badge,
        "title_lines": ["银行尽调评估课程", subtitle],
        "summary": "覆盖现场识别、经营核查、授信尽调、资产评估、授后跟踪与课堂支撑材料的完整记录。",
        "footer_left": "Course archive",
        "footer_right": "Public showcase",
    }


def office_productivity_payload(deck_path):
    stem = Path(deck_path).stem
    lower_stem = stem.lower()
    day_number = extract_training_day(stem)

    if "cheatsheet" in lower_stem:
        badge = "Cheatsheet"
        subtitle = "速查手册与课堂提要"
    elif "handout" in lower_stem:
        badge = "Handout"
        subtitle = "讲义材料与练习配套"
    elif "speaker" in lower_stem or "notes" in lower_stem:
        badge = "Notes"
        subtitle = "讲师备注与授课支撑"
    elif "15天培训课程" in stem:
        badge = "Master"
        subtitle = "15 天训练营总览"
    elif day_number is not None:
        badge = f"Day {day_number:02d}"
        subtitle = f"第 {day_number:02d} 天 / 办公提效专题"
    else:
        badge = stable_code(stem, "Deck")
        subtitle = "办公自动化与协同提效"

    return {
        "eyebrow": "AI workplace productivity",
        "badge": badge,
        "title_lines": ["AI 职场效率训练营", subtitle],
        "summary": "聚焦写作、汇报、表格、会议、知识整理与多工具协同的办公提效型课程交付。",
        "footer_left": "Training archive",
        "footer_right": "Sanitized portfolio",
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


def draw_robotics_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel = (980, 120, 1480, 748)
    draw.rounded_rectangle(panel, radius=48, fill=(15, 28, 46, 168), outline=(138, 206, 255, 76), width=2)

    draw.ellipse((1090, 148, 1360, 418), fill=(94, 144, 255, 76))
    draw.rounded_rectangle((1140, 242, 1310, 560), radius=68, fill=(221, 235, 255, 215))
    draw.rounded_rectangle((1178, 194, 1272, 298), radius=32, fill=(235, 243, 255, 232))
    draw.ellipse((1204, 224, 1234, 254), fill=(48, 76, 122, 190))
    draw.ellipse((1216, 224, 1246, 254), fill=(48, 76, 122, 190))
    draw.rounded_rectangle((1184, 326, 1268, 372), radius=18, fill=(84, 120, 182, 190))
    draw.line((1168, 572, 1132, 676), fill=(186, 214, 255, 228), width=18)
    draw.line((1282, 572, 1318, 676), fill=(186, 214, 255, 228), width=18)
    draw.line((1152, 364, 1060, 454), fill=(186, 214, 255, 212), width=16)
    draw.line((1298, 364, 1388, 454), fill=(186, 214, 255, 212), width=16)

    draw.rounded_rectangle((1036, 514, 1116, 676), radius=30, fill=(131, 184, 255, 170))
    draw.rounded_rectangle((1334, 514, 1414, 676), radius=30, fill=(131, 184, 255, 170))
    for point in ((1032, 206), (1440, 240), (1008, 640), (1454, 606)):
        draw.ellipse((point[0] - 16, point[1] - 16, point[0] + 16, point[1] + 16), fill=(114, 231, 255, 200))

    for idx, offset in enumerate((0, 62, 126)):
        draw.line((1024, 808 + idx * 8, 1364 - offset, 808 + idx * 8), fill=(137, 224, 255, 144 - idx * 24), width=6)

    base.alpha_composite(overlay)


def draw_governance_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel = (980, 120, 1480, 748)
    draw.rounded_rectangle(panel, radius=48, fill=(17, 30, 48, 160), outline=(122, 210, 255, 72), width=2)
    shield = [(1230, 172), (1378, 232), (1352, 498), (1230, 618), (1108, 498), (1082, 232)]
    draw.polygon(shield, fill=(92, 188, 255, 170))
    draw.polygon(shield, outline=(227, 247, 255, 210), width=4)
    draw.line((1230, 260, 1230, 508), fill=(239, 248, 255, 220), width=16)
    draw.line((1144, 352, 1316, 352), fill=(239, 248, 255, 220), width=16)

    nodes = ((1058, 222), (1422, 252), (1026, 594), (1418, 610), (1230, 716))
    for x, y in nodes:
        draw.ellipse((x - 18, y - 18, x + 18, y + 18), fill=(122, 228, 255, 220))
        draw.line((1230, 390, x, y), fill=(122, 228, 255, 132), width=5)

    for idx, width in enumerate((302, 256, 214)):
        y = 792 + idx * 10
        draw.line((1036, y, 1036 + width, y), fill=(136, 222, 255, 140 - idx * 20), width=6)

    base.alpha_composite(overlay)


def draw_marketing_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel = (980, 120, 1480, 748)
    draw.rounded_rectangle(panel, radius=48, fill=(18, 33, 53, 156), outline=(135, 219, 255, 72), width=2)
    draw.rounded_rectangle((1036, 182, 1428, 452), radius=34, fill=(235, 244, 255, 214))
    bars = [
        (1080, 392, 1120, 418),
        (1152, 346, 1192, 418),
        (1224, 298, 1264, 418),
        (1296, 248, 1336, 418),
    ]
    for box in bars:
        draw.rounded_rectangle(box, radius=12, fill=(86, 154, 255, 215))
    draw.line((1076, 270, 1168, 338, 1240, 286, 1312, 236, 1382, 210), fill=(255, 186, 89, 220), width=10, joint="curve")
    draw.ellipse((1362, 190, 1400, 228), fill=(255, 186, 89, 232))

    draw.polygon([(1120, 512), (1368, 512), (1296, 586), (1192, 586)], fill=(97, 194, 255, 178))
    draw.polygon([(1164, 610), (1324, 610), (1278, 670), (1210, 670)], fill=(255, 197, 102, 186))
    draw.line((1036, 800, 1362, 800), fill=(129, 220, 255, 146), width=6)
    draw.line((1036, 816, 1304, 816), fill=(129, 220, 255, 124), width=6)
    draw.line((1036, 832, 1228, 832), fill=(129, 220, 255, 102), width=6)

    base.alpha_composite(overlay)


def draw_credit_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel = (980, 120, 1480, 748)
    draw.rounded_rectangle(panel, radius=48, fill=(17, 30, 48, 160), outline=(120, 201, 255, 72), width=2)
    draw.rounded_rectangle((1054, 178, 1406, 448), radius=34, fill=(229, 238, 250, 218))
    for idx, x in enumerate((1108, 1188, 1268, 1348)):
        bar_height = (idx + 2) * 46
        draw.rounded_rectangle((x, 404 - bar_height, x + 42, 404), radius=12, fill=(83, 140, 227, 214))
    draw.line((1094, 308, 1180, 282, 1260, 246, 1340, 202, 1398, 182), fill=(255, 184, 88, 220), width=10, joint="curve")
    draw.ellipse((1380, 164, 1420, 204), fill=(255, 184, 88, 232))

    draw.rounded_rectangle((1088, 522, 1372, 650), radius=28, fill=(88, 154, 219, 180))
    for idx in range(3):
        y = 554 + idx * 30
        draw.line((1136, y, 1326 - idx * 26, y), fill=(237, 245, 255, 210), width=10)
    draw.ellipse((1112, 548, 1140, 576), fill=(255, 217, 126, 220))
    draw.ellipse((1112, 578, 1140, 606), fill=(255, 217, 126, 220))
    draw.ellipse((1112, 608, 1140, 636), fill=(255, 217, 126, 220))

    for idx, width in enumerate((312, 268, 220)):
        y = 804 + idx * 8
        draw.line((1032, y, 1032 + width, y), fill=(133, 218, 255, 144 - idx * 22), width=6)

    base.alpha_composite(overlay)


def draw_due_diligence_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel = (980, 120, 1480, 748)
    draw.rounded_rectangle(panel, radius=48, fill=(16, 30, 46, 158), outline=(124, 208, 255, 72), width=2)
    draw.rounded_rectangle((1090, 176, 1358, 622), radius=34, fill=(236, 243, 252, 222))
    draw.rectangle((1128, 218, 1320, 514), fill=(248, 251, 255, 245))
    draw.rounded_rectangle((1172, 184, 1276, 222), radius=16, fill=(94, 146, 219, 224))
    for idx in range(5):
        y = 274 + idx * 48
        draw.rectangle((1156, y, 1184, y + 28), outline=(77, 127, 193, 210), width=4)
        draw.line((1198, y + 14, 1298 - idx * 16, y + 14), fill=(121, 145, 177, 190), width=8)
    draw.line((1160, 288, 1168, 300, 1180, 278), fill=(62, 192, 140, 228), width=6)
    draw.line((1160, 336, 1168, 348, 1180, 326), fill=(62, 192, 140, 228), width=6)

    draw.ellipse((1286, 422, 1418, 554), outline=(255, 191, 94, 228), width=16)
    draw.line((1388, 522, 1452, 590), fill=(255, 191, 94, 228), width=16)

    for idx, width in enumerate((302, 256, 214)):
        y = 804 + idx * 8
        draw.line((1034, y, 1034 + width, y), fill=(137, 220, 255, 144 - idx * 22), width=6)

    base.alpha_composite(overlay)


def draw_office_visual(base):
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    panel = (980, 120, 1480, 748)
    draw.rounded_rectangle(panel, radius=48, fill=(17, 30, 48, 160), outline=(126, 208, 255, 72), width=2)
    draw.rounded_rectangle((1048, 184, 1420, 448), radius=34, fill=(231, 240, 252, 220))
    draw.rounded_rectangle((1078, 220, 1390, 398), radius=22, fill=(247, 250, 255, 238))
    draw.rectangle((1098, 244, 1370, 266), fill=(93, 146, 222, 214))
    for idx in range(4):
        y = 300 + idx * 30
        draw.line((1112, y, 1328 - idx * 26, y), fill=(123, 145, 174, 198), width=8)
    draw.rounded_rectangle((1158, 504, 1302, 624), radius=28, fill=(87, 153, 220, 188))
    draw.rounded_rectangle((1328, 504, 1422, 650), radius=24, fill=(255, 188, 92, 178))
    draw.line((1082, 562, 1132, 562, 1182, 534, 1234, 550), fill=(70, 201, 173, 224), width=10, joint="curve")
    draw.ellipse((1220, 536, 1250, 566), fill=(70, 201, 173, 232))

    for idx, width in enumerate((312, 268, 220)):
        y = 804 + idx * 8
        draw.line((1032, y, 1032 + width, y), fill=(136, 219, 255, 144 - idx * 22), width=6)

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
    elif preset == "robotics":
        payload = robotics_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (13, 19, 32), (30, 47, 72))
        base = background.convert("RGBA")
        add_blur_blob(base, (1240, 212), 220, (91, 143, 255, 82), blur=82)
        add_blur_blob(base, (272, 736), 214, (88, 202, 255, 44), blur=94)
        add_grid_overlay(base, (255, 255, 255, 18), spacing=42, inset=44)
        draw_robotics_visual(base)
        title_fill = (241, 246, 255, 255)
        subtitle_fill = (176, 205, 255, 255)
        body_fill = (202, 216, 236, 255)
        chip_fill = (150, 177, 255, 230)
        chip_text = (25, 34, 54, 255)
    elif preset == "governance":
        payload = governance_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (8, 22, 34), (14, 46, 60))
        base = background.convert("RGBA")
        add_blur_blob(base, (1230, 190), 220, (64, 198, 255, 74), blur=86)
        add_blur_blob(base, (290, 748), 216, (70, 225, 197, 42), blur=96)
        add_grid_overlay(base, (154, 224, 255, 20), spacing=40, inset=44)
        draw_governance_visual(base)
        title_fill = (237, 248, 255, 255)
        subtitle_fill = (174, 229, 255, 255)
        body_fill = (196, 224, 239, 255)
        chip_fill = (115, 225, 255, 230)
        chip_text = (7, 38, 49, 255)
    elif preset == "ai-marketing":
        payload = ai_marketing_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (17, 23, 39), (46, 63, 92))
        base = background.convert("RGBA")
        add_blur_blob(base, (1240, 194), 220, (255, 182, 76, 78), blur=84)
        add_blur_blob(base, (254, 752), 212, (108, 194, 255, 46), blur=96)
        add_grid_overlay(base, (255, 255, 255, 16), spacing=42, inset=44)
        draw_marketing_visual(base)
        title_fill = (245, 248, 255, 255)
        subtitle_fill = (194, 214, 255, 255)
        body_fill = (210, 220, 238, 255)
        chip_fill = (255, 189, 95, 235)
        chip_text = (44, 31, 17, 255)
    elif preset == "credit-risk":
        payload = credit_risk_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (13, 20, 34), (31, 50, 76))
        base = background.convert("RGBA")
        add_blur_blob(base, (1236, 202), 220, (78, 152, 255, 78), blur=84)
        add_blur_blob(base, (286, 752), 220, (255, 192, 91, 38), blur=96)
        add_grid_overlay(base, (255, 255, 255, 16), spacing=42, inset=44)
        draw_credit_visual(base)
        title_fill = (244, 248, 255, 255)
        subtitle_fill = (194, 214, 255, 255)
        body_fill = (208, 220, 238, 255)
        chip_fill = (158, 183, 255, 230)
        chip_text = (28, 37, 59, 255)
    elif preset == "due-diligence":
        payload = due_diligence_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (11, 21, 34), (28, 46, 70))
        base = background.convert("RGBA")
        add_blur_blob(base, (1240, 208), 220, (88, 154, 255, 74), blur=86)
        add_blur_blob(base, (282, 750), 214, (255, 193, 92, 38), blur=96)
        add_grid_overlay(base, (255, 255, 255, 16), spacing=42, inset=44)
        draw_due_diligence_visual(base)
        title_fill = (244, 248, 255, 255)
        subtitle_fill = (194, 214, 255, 255)
        body_fill = (208, 220, 238, 255)
        chip_fill = (154, 183, 255, 230)
        chip_text = (28, 37, 59, 255)
    elif preset == "office-productivity":
        payload = office_productivity_payload(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (14, 22, 36), (34, 54, 80))
        base = background.convert("RGBA")
        add_blur_blob(base, (1238, 208), 220, (90, 152, 255, 76), blur=84)
        add_blur_blob(base, (280, 746), 218, (72, 210, 186, 34), blur=96)
        add_grid_overlay(base, (255, 255, 255, 16), spacing=42, inset=44)
        draw_office_visual(base)
        title_fill = (244, 248, 255, 255)
        subtitle_fill = (194, 214, 255, 255)
        body_fill = (208, 220, 238, 255)
        chip_fill = (159, 184, 255, 230)
        chip_text = (28, 37, 59, 255)
    else:
        payload = general_payload(deck_path, texts)
        preview = extract_first_slide_image(deck_path)
        background = build_gradient((WIDTH, HEIGHT), (22, 24, 36), (34, 52, 74))
        base = background.convert("RGBA")
        add_blur_blob(base, (1160, 250), 230, (122, 152, 255, 84), blur=90)
        add_blur_blob(base, (300, 700), 220, (92, 138, 255, 48), blur=95)
        add_grid_overlay(base, (255, 255, 255, 16), spacing=42, inset=44)
        draw_ai_visual(base, preview)
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
