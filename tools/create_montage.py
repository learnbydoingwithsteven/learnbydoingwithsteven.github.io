import argparse
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


def parse_args():
    parser = argparse.ArgumentParser(description="Create an image montage from slide or document covers.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--input_files", nargs="+", help="Ordered list of image files to place in the montage.")
    group.add_argument("--input_dir", help="Directory containing image files.")
    parser.add_argument("--output_file", required=True, help="Output montage path.")
    parser.add_argument("--num_col", type=int, default=5, help="Number of columns in the grid.")
    parser.add_argument("--cell_width", type=int, default=256, help="Cell width in pixels.")
    parser.add_argument("--cell_height", type=int, default=144, help="Cell height in pixels.")
    parser.add_argument("--gap", type=int, default=18, help="Gap and outer padding in pixels.")
    parser.add_argument(
        "--label_mode",
        choices=["number", "filename", "none"],
        default="number",
        help="Optional label rendering mode.",
    )
    return parser.parse_args()


def load_font(size):
    candidates = [
        r"C:\Windows\Fonts\segoeui.ttf",
        r"C:\Windows\Fonts\arial.ttf",
    ]
    for candidate in candidates:
        try:
            return ImageFont.truetype(candidate, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


def natural_sort_key(path_text):
    parts = []
    current = ""
    is_digit = None
    for char in path_text:
        char_is_digit = char.isdigit()
        if is_digit is None or char_is_digit == is_digit:
            current += char
        else:
            parts.append(int(current) if is_digit else current.lower())
            current = char
        is_digit = char_is_digit
    if current:
        parts.append(int(current) if is_digit else current.lower())
    return parts


def list_input_files(input_dir):
    supported = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".tif", ".tiff"}
    return [
        str(path)
        for path in sorted(Path(input_dir).iterdir(), key=lambda item: natural_sort_key(item.name))
        if path.is_file() and path.suffix.lower() in supported
    ]


def load_images(input_files):
    images = []
    labels = []
    for input_file in input_files:
        labels.append(Path(input_file).name)
        try:
            images.append(Image.open(input_file).convert("RGBA"))
        except Exception:
            images.append(None)
    return labels, images


def placeholder_tile(width, height):
    image = Image.new("RGBA", (width, height), (230, 230, 230, 255))
    draw = ImageDraw.Draw(image)
    draw.line((0, 0, width - 1, height - 1), fill=(180, 30, 30, 255), width=4)
    draw.line((width - 1, 0, 0, height - 1), fill=(180, 30, 30, 255), width=4)
    return image


def montage(input_files, output_file, num_col, cell_width, cell_height, gap, label_mode):
    if not input_files:
        raise ValueError("No input files were provided.")
    if num_col < 1:
        raise ValueError("num_col must be at least 1.")

    labels, images = load_images(input_files)
    rows = math.ceil(len(images) / num_col)
    font = load_font(max(12, min(22, cell_height // 7)))
    draw_labels = label_mode != "none"
    sample_text = "Ag" if label_mode == "filename" else "1"

    scratch = Image.new("RGB", (16, 16), (255, 255, 255))
    scratch_draw = ImageDraw.Draw(scratch)
    text_bbox = scratch_draw.textbbox((0, 0), sample_text, font=font)
    label_height = (text_bbox[3] - text_bbox[1] + 8) if draw_labels else 0
    row_height = cell_height + label_height

    canvas_width = num_col * cell_width + (num_col + 1) * gap
    canvas_height = rows * row_height + (rows + 1) * gap
    canvas = Image.new("RGB", (canvas_width, canvas_height), (242, 242, 242))
    draw = ImageDraw.Draw(canvas)
    placeholder = placeholder_tile(int(cell_width * 0.6), int(cell_height * 0.6))

    for index, image in enumerate(images):
        row = index // num_col
        col = index % num_col
        x0 = gap + col * (cell_width + gap)
        y0 = gap + row * (row_height + gap)

        if image is None:
            fitted = placeholder
        else:
            fitted = ImageOps.contain(image, (cell_width, cell_height), method=Image.Resampling.LANCZOS)

        paste_x = x0 + (cell_width - fitted.width) // 2
        paste_y = y0 + (cell_height - fitted.height) // 2
        canvas.paste(fitted, (paste_x, paste_y), fitted if fitted.mode == "RGBA" else None)
        draw.rectangle(
            (paste_x - 1, paste_y - 1, paste_x + fitted.width, paste_y + fitted.height),
            outline=(160, 160, 160),
            width=1,
        )

        if draw_labels:
            label = str(index + 1) if label_mode == "number" else labels[index]
            label_box = draw.textbbox((0, 0), label, font=font)
            label_width = label_box[2] - label_box[0]
            label_x = x0 + (cell_width - label_width) // 2
            label_y = y0 + cell_height + 4
            draw.text((label_x, label_y), label, font=font, fill=(0, 0, 0))

    output_path = Path(output_file)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output_path)
    print(f"Montage saved to {output_path}")


def main():
    args = parse_args()
    input_files = args.input_files or list_input_files(args.input_dir)
    montage(
        input_files=input_files,
        output_file=args.output_file,
        num_col=args.num_col,
        cell_width=args.cell_width,
        cell_height=args.cell_height,
        gap=args.gap,
        label_mode=args.label_mode,
    )


if __name__ == "__main__":
    main()
