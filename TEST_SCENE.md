# Production test: "Knock Once for Yes"

A 26-second test of the techniques in `PRODUCTION.md`, built in Remotion like the other videos.

- `review/Production_Test.mp4`: clean.
- `review/Production_Test_labeled.mp4`: same, with a teal label in the corner naming the technique on screen.

The narration is the Reform Era narrator's existing take of the same Fox sisters line (Reform Era ch03), so the word-sync is real, not faked. The music is Reform Era's `spirits.mp3`.

## The three shots

| Time | Shot | What to look for |
|---|---|---|
| 0:00–0:09 | **The 1848 Fox family plate, in 2.5D** | The plate is cut into 7 layers (paper, five portraits, the house), each at its own depth, so the portraits slide over the paper as the camera travels. The camera moves on one smooth eased path with no stops, plus a 2 px handheld drift. The teal loop on the printed "1848," the handwritten note on "Hydesville," the KNOCK on "knocking," and the coral house with its teal outline on "house" each land 2 frames before the word. |
| 0:09 | **Whip pan** | The camera accelerates out of the plate and decelerates into the board. Directional motion blur scales with speed. The whoosh starts 6 frames early so its peak hits the cut. |
| 0:09–0:17 | **3D board** | Real geometry and lighting: a flickering candle key light, soft shadows, and a cool rim light. The planchette circles while "answer questions" is said (the ideomotor drift, planted early), then glides to YES on "yes" with a small overshoot and settle, and one knock. It glides to NO in **silence**: the music drops out and there's no knock. The camera follows the planchette 5 frames late, like an operator. A tilt-shift blur gives shallow focus, and the title stamps on in step. Then the camera pushes through the planchette's window and cuts on the motion. |
| 0:17–0:26 | **Desk** | The cards fall with weight: a spring with overshoot, a shadow that tightens as each card touches down, motion blur while falling (`@remotion/motion-blur`), and a 5-frame stagger between the two. Then a rack focus: the cards blur and darken as the 1891 ad quote rises in word by word, with the underlines and SPIRIT? / TOY? tags in step with the text. |

## Technical changes worth keeping for the full video

- **24 fps, marks on twos.** `FPS = 24` and `StepCtx = 2`, so hand-drawn marks change every 2 frames exactly. The old 30 fps / 2.5-frame step gave uneven 3-2-3-2 holds.
- **Cue lead.** `src/test/timing.ts` puts every visual cue 2 frames before its word (`LEAD`).
- **Plate layers.** `tools/plate_layers.py` cuts an engraving into soft-edged layers and paints the holes with paper. The same approach works on any archival image once it has masks, including the Gemini mask passes.
- **3D board.** `src/test/Board3D.tsx` with `@remotion/three`. The board art is its own composition (`BoardTexture`), so the letter positions are shared and the planchette can be sent to any letter with `spot('K')`. That covers the "chapter titles spelled out on the board" idea.
- **Planchette sound.** `public/sfx/scrape.wav` is synthesized (band-passed brown noise). A real recording of felt on wood would be better.

## Run it

```sh
cd video
npm install
tools/render_test.sh        # or: npx remotion studio  (select "Test")
```

The renders use `--gl=swangle` (software WebGL), which works on cloud machines. On a Mac, `--gl=angle` is faster.

## Known limits of the test

- The board is a generic 1890s-style layout with no brand name, and the planchette is plain geometry. Both could take a photo-scanned texture.
- The painted-over paper behind the portraits shows a soft smudge if the camera moves much farther than it does here. A Gemini fill of the background would fix that.
- No room tone yet. The real video should have a constant quiet bed under everything.
