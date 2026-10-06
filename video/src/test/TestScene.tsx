// "Knock Once for Yes" production test: three shots that show the techniques in PRODUCTION.md.
// Voice is the Reform Era narrator's take of the same Fox sisters line, with its real word timings.
import React from 'react';
import {AbsoluteFill, Audio, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {clamp} from '../lib/anim';
import {Sfx} from '../kit/common';
import {Finish, PALETTES, PaletteCtx, StepCtx} from '../kit/Kit';
import {ARRIVALS, Board3D, GLIDES, PUSH, TITLE_AT} from './Board3D';
import {CARD1, CARD2, contact, Desk, TAG1, TAG2, UNDER1, UNDER2} from './Desk';
import {FoxPlate} from './FoxPlate';
import {CUT1, CUT2, END, w} from './timing';

const Sound: React.FC = () => {
  const silence = w('Silence');
  const music = (f: number) =>
    interpolate(f, [0, 24, silence - 4, silence + 4, w('no.') + 8, w('no.') + 20, CUT2, CUT2 + 12, END - 30, END], [0, 0.11, 0.11, 0.012, 0.012, 0.12, 0.12, 0.18, 0.18, 0], clamp);
  return (
    <>
      <Audio src={staticFile('audio/test_knock.wav')} />
      <Audio src={staticFile('music/spirits.mp3')} volume={music} />
      {/* plate */}
      <Sfx at={w('1848.')} src="sfx/marker_tick.wav" volume={0.22} />
      <Sfx at={w('Hydesville,')} src="sfx/marker_tick.wav" volume={0.2} />
      <Sfx at={w('knocking') - 1} src="sfx/knock.wav" volume={0.3} />
      <Sfx at={w('house.')} src="sfx/pencil_soft.wav" volume={0.3} />
      <Sfx at={CUT1 - 6} src="sfx/whoosh.wav" volume={0.55} />
      {/* board: two knocks on "knocks", one knock for yes, nothing at all for no */}
      <Sfx at={w('knocks') - 1} src="sfx/knock.wav" volume={0.35} />
      <Sfx at={w('knocks') + 6} src="sfx/knock.wav" volume={0.3} />
      {GLIDES().map((g, i) => <Sfx key={i} at={g} src="sfx/scrape.wav" volume={i === 1 ? 0.12 : 0.22} />)}
      <Sfx at={ARRIVALS()[0] - 1} src="sfx/knock.wav" volume={0.45} />
      <Sfx at={TITLE_AT - 1} src="sfx/stamp.wav" volume={0.45} />
      <Sfx at={TITLE_AT - 1} src="sfx/boom.wav" volume={0.18} />
      <Sfx at={PUSH + 4} src="sfx/whoosh.wav" volume={0.35} />
      {/* desk */}
      <Sfx at={contact(CARD1) - 1} src="sfx/page_turn.wav" volume={0.4} />
      <Sfx at={contact(CARD2) - 1} src="sfx/page_turn.wav" volume={0.32} />
      <Sfx at={CARD1 + 18} src="sfx/marker_tick.wav" volume={0.18} />
      <Sfx at={UNDER1} src="sfx/marker_tick.wav" volume={0.2} />
      <Sfx at={UNDER2} src="sfx/marker_tick.wav" volume={0.2} />
      <Sfx at={TAG1 - 1} src="sfx/stamp.wav" volume={0.3} />
      <Sfx at={TAG2 - 1} src="sfx/stamp.wav" volume={0.3} />
    </>
  );
};

export const TestScene: React.FC<{labels?: boolean}> = ({labels = true}) => {
  const f = useCurrentFrame();
  return (
    <PaletteCtx.Provider value={PALETTES.locked}>
      {/* 24 fps, marks step every 2 frames: an even 12 drawings a second ("on twos") */}
      <StepCtx.Provider value={2}>
        <AbsoluteFill style={{background: '#0b0a08'}}>
          {f < CUT1 && <FoxPlate labels={labels} />}
          {f >= CUT1 && f < CUT2 && <Board3D labels={labels} />}
          {f >= CUT2 && <Desk labels={labels} />}
          <Finish vignette={0.3} />
          <Sound />
        </AbsoluteFill>
      </StepCtx.Provider>
    </PaletteCtx.Provider>
  );
};
