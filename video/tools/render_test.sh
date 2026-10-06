#!/bin/sh
# Render the production test scene: review/Production_Test_labeled.mp4 (technique names on screen) and
# review/Production_Test.mp4 (clean). 3D needs WebGL; --gl=swangle works in headless cloud machines.
cd "$(dirname "$0")/.."
export REMOTION_CHROME=${REMOTION_CHROME:-$(ls -d /opt/pw-browsers/chromium_headless_shell-*/chrome-linux/headless_shell 2>/dev/null | head -1)}
BROWSER=${REMOTION_CHROME:+--browser-executable=$REMOTION_CHROME}
mkdir -p ../review
npx remotion still src/index.ts BoardTexture public/img/test/board_tex.png $BROWSER --log=error || exit 1
npx remotion render src/index.ts Test ../review/Production_Test_labeled.mp4 --crf=18 --gl=swangle $BROWSER --log=error --props='{"labels":true}' || exit 1
npx remotion render src/index.ts Test ../review/Production_Test.mp4 --crf=18 --gl=swangle $BROWSER --log=error --props='{"labels":false}' || exit 1
rm -rf /tmp/remotion-webpack-bundle-*
