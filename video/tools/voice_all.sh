#!/bin/sh
# Voice every chapter at the locked pace (same settings as Ambrose and Fix Everything).
# The heavy chapters (6: Empty Chairs, 9: the ending) run slower.
#   tools/voice_all.sh            ElevenLabs (needs ELEVENLABS_API_KEY and VOICE_ID, in the environment or video/.env)
#   tools/voice_all.sh ch03       just the chapters whose file names start with these
cd "$(dirname "$0")/.."
export VOICE_ID=${VOICE_ID:-mI4rIAStSQeKeqsz4FwM}   # the narrator voice used in every previous video (from their words.json)
for f in script/ch*.txt; do
  n=$(basename "$f" .txt)
  if [ $# -gt 0 ]; then case " $* " in *" ${n%%_*} "*) ;; *) continue ;; esac; fi
  case "$n" in
    ch06_*|ch09_*) export VOICE_MAX_PAUSE=0.35 VOICE_SENT_GAP=0.05 VOICE_PARA_GAP=0.55 VOICE_STRETCH=1.08 ;;
    *)             export VOICE_MAX_PAUSE=0.25 VOICE_SENT_GAP=0    VOICE_PARA_GAP=0.35 VOICE_STRETCH=1.15 ;;
  esac
  echo "== $n (stretch $VOICE_STRETCH)"
  python3 tools/voice.py "$f" "$n" 2>&1 | tail -1 || exit 1
done
