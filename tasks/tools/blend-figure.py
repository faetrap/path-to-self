import sys
from PIL import Image
import numpy as np
src, out, preview = sys.argv[1], sys.argv[2], sys.argv[3]
SITE = np.array([243, 232, 218], np.float32)  # --bg
im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32)
H, W, _ = im.shape
border = np.concatenate([im[:, :250].reshape(-1, 3), im[:, -250:].reshape(-1, 3)])
paper = np.median(border, 0)
# 1) shift colours so the paper lands exactly on the site background;
#    shading and the figure's form are preserved (pure offset)
rgb = np.clip(im + (SITE - paper), 0, 255)
# 2) fade to transparent outside an ellipse around the aura + lotus, so no
#    rectangular edge can ever show against the page
def smooth(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)
yy, xx = np.mgrid[0:H, 0:W]
# Sides: the aura's colour tapers out between ~0.14W and ~0.33W from the
# centre, so the fade has to span that whole band. A short ramp (the first
# version faded over ~0.07W) clipped the aura into a visible vertical line.
dx = np.abs(xx - W / 2)
a = 1 - smooth(0.15 * W, 0.37 * W, dx)
# Round the corners with a wide ellipse so top/bottom fades meet the sides
# softly.
r = np.sqrt((dx / (0.42 * W)) ** 2 + ((yy - 0.49 * H) / (0.56 * H)) ** 2)
a *= 1 - smooth(0.85, 1.15, r)
# also fade the top and bottom rows: the aura and lotus reach close to the
# image edges, so without this the artwork stops in a hard horizontal line
a *= smooth(0.0, 0.12 * H, yy) * smooth(0.0, 0.10 * H, (H - 1) - yy)
rgba = np.dstack([rgb, a * 255]).astype(np.uint8)
img = Image.fromarray(rgba, 'RGBA')
img.save(out, 'WEBP', quality=84, method=6)
bg = Image.new('RGBA', img.size, tuple(int(v) for v in SITE) + (255,))
Image.alpha_composite(bg, img).convert('RGB').save(preview, quality=85)
print('paper', paper, '->', SITE)
