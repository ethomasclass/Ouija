"""Cut a Short's narration out of a chapter's recorded narration, keeping the word timings.

  python3 tools/cut_voice.py ch01_cold_open short01_date 0.3-3.95 6.3-18.25 ...

Each range is in seconds of the source. The pieces are joined with a 15 ms crossfade, and
public/audio/<out>.wav + <out>.words.json are written with the words re-timed to the new file,
so a Short is scene-timed exactly like a chapter.
"""
import json, os, sys, wave

import numpy as np

AUDIO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "audio")
XF = 0.015


def main():
    src, out, ranges = sys.argv[1], sys.argv[2], [tuple(map(float, r.split("-"))) for r in sys.argv[3:]]
    w = wave.open(os.path.join(AUDIO, src + ".wav"))
    rate = w.getframerate()
    pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32)
    words = json.load(open(os.path.join(AUDIO, src + ".words.json")))["words"]
    x = int(XF * rate)
    ramp = np.linspace(0, 1, x, dtype=np.float32)
    outp = np.zeros(0, dtype=np.float32)
    new = []
    for a, b in ranges:
        seg = pcm[int(a * rate):int(b * rate)].copy()
        seg[:x] *= ramp
        seg[-x:] *= ramp[::-1]
        t0 = len(outp) / rate
        new += [{**wd, "s": round(wd["s"] - a + t0, 3), "e": round(wd["e"] - a + t0, 3)} for wd in words if wd["s"] >= a and wd["e"] <= b]
        outp = np.concatenate([outp, seg])
    with wave.open(os.path.join(AUDIO, out + ".wav"), "wb") as o:
        o.setnchannels(1), o.setsampwidth(2), o.setframerate(rate)
        o.writeframes(np.clip(outp, -32768, 32767).astype(np.int16).tobytes())
    dur = round(len(outp) / rate, 3)
    json.dump({"voice": f"cut from {src}", "duration": dur, "words": new}, open(os.path.join(AUDIO, out + ".words.json"), "w"), indent=0)
    print(f"wrote {out}.wav ({dur}s, {len(new)} words)")


main()
