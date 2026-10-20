"""Generate consistent, transparent delivery assets; keep PNG masters untouched."""
from pathlib import Path
from PIL import Image

folder = Path(__file__).resolve().parents[1] / 'public/icons/gold-raster'
for source in sorted(folder.glob('*.png')):
    image = Image.open(source).convert('RGBA')
    # Ignore nearly invisible edge noise when measuring the optical footprint.
    bounds = image.getchannel('A').point(lambda a: 255 if a > 24 else 0).getbbox()
    if not bounds:
        raise ValueError(f'Empty artwork: {source}')
    image = image.crop(bounds)
    image.thumbnail((224, 224), Image.Resampling.LANCZOS)
    canvas = Image.new('RGBA', (256, 256))
    canvas.alpha_composite(image, ((256-image.width)//2, (256-image.height)//2))
    canvas.save(source.with_suffix('.webp'), 'WEBP', quality=88, method=6)
    assert Image.open(source.with_suffix('.webp')).getextrema()[3][0] == 0
print(f'{len(list(folder.glob("*.webp")))} transparent icons: {sum(p.stat().st_size for p in folder.glob("*.webp")):,} bytes')
