#!/bin/sh
# Contact sheet of a composition: tools/stills.sh Ch01 out.jpg 10 200 400 ...   (frames, half size)
cd "$(dirname "$0")/.."
export REMOTION_CHROME=${REMOTION_CHROME:-$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell 2>/dev/null | head -1)}
comp=$1; out=$2; shift 2
mkdir -p out/stills
npx remotion bundle src/index.ts --out-dir=out/bundle --log=error >/dev/null 2>&1 || npx remotion bundle src/index.ts --out-dir=out/bundle
for fr in "$@"; do
  npx remotion still out/bundle $comp out/stills/${comp}_$fr.png --frame=$fr --scale=0.5 --gl=swangle --browser-executable=$REMOTION_CHROME --log=error || echo "FAIL $fr"
done
python3 - "$out" "$comp" "$@" <<'PY'
import sys
from PIL import Image, ImageDraw
out, comp, frames = sys.argv[1], sys.argv[2], sys.argv[3:]
ims = [Image.open(f'out/stills/{comp}_{f}.png').convert('RGB') for f in frames]
w, h = ims[0].size; cols = 3; rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (w * cols, h * rows)); d = ImageDraw.Draw(sheet)
for i, (im, f) in enumerate(zip(ims, frames)):
    sheet.paste(im, ((i % cols) * w, (i // cols) * h)); d.text(((i % cols) * w + 6, (i // cols) * h + 6), f, fill=(255, 0, 255))
sheet.save(out, quality=85)
PY
