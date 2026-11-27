"""Pull the fine light streaks out of the figure artwork as an alpha mask, so
a moving glint can be shown only where the painting already has light.
Usage: python3 -I glint-mask.py <source.png> <out.webp> <preview.png>"""
import sys
import numpy as np
from PIL import Image, ImageFilter

src, out, preview = sys.argv[1:4]
im = Image.open(src).convert('L')
W, H = im.size
L = np.asarray(im).astype(np.float32)
# High-pass: brightness above the local surroundings = thin bright streaks.
local = np.asarray(im.filter(ImageFilter.GaussianBlur(9))).astype(np.float32)
hp = np.clip((L - local - 1.5) / 8.0, 0, 1)
# Same soft frame as the figure itself (see blend-figure.py), so the mask
# can never show an edge.
def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)
yy, xx = np.mgrid[0:H, 0:W]
dx = np.abs(xx - W / 2)
a = 1 - smooth(0.15 * W, 0.37 * W, dx)
r = np.sqrt((dx / (0.42 * W)) ** 2 + ((yy - 0.49 * H) / (0.56 * H)) ** 2)
a *= 1 - smooth(0.85, 1.15, r)
a *= smooth(0.0, 0.12 * H, yy) * smooth(0.0, 0.10 * H, (H - 1) - yy)
m = hp * a
# Soften slightly so the glint reads as light, not pixels; half size is
# plenty once softened (it is stretched back to the figure's box).
core = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
# A wider soft halo around each streak, so the passing light reads as a glow
# rather than a hairline brightening.
halo = core.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(4))
mask = Image.fromarray(np.maximum(np.asarray(core, np.float32), np.asarray(halo, np.float32) * 0.7).clip(0, 255).astype(np.uint8))
mask = mask.resize((W // 2, H // 2), Image.LANCZOS)
rgba = Image.merge('RGBA', [Image.new('L', mask.size, 255)] * 3 + [mask])
rgba.save(out, 'WEBP', quality=80, method=6)
mask.save(preview)
print('coverage', round(float((m > 0.2).mean()) * 100, 2), '%')
