"""Strip editor metadata from the Wikimedia chakra SVGs (CC0 / public domain)
so they ship small. Usage: python3 -I clean-chakra-svgs.py <src_dir> <out_dir>"""
import pathlib, re, sys
src, out = map(pathlib.Path, sys.argv[1:3])
for f in sorted(src.glob('0*.svg')):
    s = f.read_text(encoding='utf-8')
    s = re.sub(r'<metadata.*?</metadata>', '', s, flags=re.S)
    s = re.sub(r'<sodipodi:namedview.*?(/>|</sodipodi:namedview>)', '', s, flags=re.S)
    s = re.sub(r'\s(inkscape|sodipodi):[\w-]+="[^"]*"', '', s)
    s = re.sub(r'\s+', ' ', s)
    s = re.sub(r'(\d+\.\d{3})\d+', r'\1', s)  # 3 decimals is plenty at icon size
    name = f.stem.split('_', 1)[0] + '.svg'
    (out / name).write_text(s, encoding='utf-8')
    print(name, f.stat().st_size, '->', (out / name).stat().st_size)
