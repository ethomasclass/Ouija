// Short #1 · "In 1920, this was a date." The cold open of the long video, re-framed for 9:16: same narration
// (cut from ch01 by tools/cut_voice.py), same pictures, same desk. It ends on the question, not the answer,
// and hands off to the full video.
import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import words from '../../public/audio/short01_date.words.json';
import {clamp} from '../lib/anim';
import {FPS} from '../lib/theme';
import {Finish, Highlight, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag, TagPos, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Desk, DropCard, Layered, LOOK, SrcView} from '../kit/oj';
import {BoardShot, landings} from '../kit/board3d';
import {Captions, SAFE} from './captions';
import '../masks';

const N = words as Narration;
const VOICE_END = Math.ceil(N.duration * FPS);
const OUTRO = 96;
export const SHORT01_FRAMES = VOICE_END + 6 + OUTRO;

const RW = 'img/arch/rockwell_ouija_1920.jpg';
const RW_SIZE: [number, number] = [1838, 2472];

/** The cover fills the tall frame; the camera moves in on the knees, then the shared pointer. */
const Cover: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  return (
    <Desk>
      <SrcView src={RW} size={RW_SIZE} card look="warm" keys={[
        [0, 919, 1000, 0.6], [at('Norman Rockwell') - 2, 919, 1180, 0.52], [at('Knees touching') - 4, 960, 1420, 0.95], [at('fingertips'), 930, 1340, 1.25], [at('sweet'), 919, 1080, 0.58],
      ]}>
        {(sw) => (
          <>
            <Loop cx={975} cy={1505} rx={215} ry={70} at={at('Knees touching') - 2} width={sw(6)} seed={3} tilt={-4} />
            <Loop cx={918} cy={1333} rx={190} ry={85} at={at('fingertips') - 2} width={sw(6)} seed={4} tilt={3} />
          </>
        )}
      </SrcView>
      {useGFrame() >= at('1920') && <Highlight text="MAY 1, 1920" x={SAFE.x} y={SAFE.top - 40} size={96} at={at('1920')} seed={5} rot={-2} />}
      <Tag text='Norman Rockwell, "The Ouija Board," Saturday Evening Post, May 1, 1920' />
    </Desk>
  );
};

/** December 1973: the basement, cropped tall around the girl. */
const Basement: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const at = t.at;
  return (
    <Layered name="ch01_basement" a={at('Now jump') - 2} b={at('Same board')} label="a basement, 1973" look="night" tint traceAt={at('girl finds') - 2}
      cam={{z: [1.22, 1.04], x: [0.13, 0.09], y: [0.08, 0.03]}} depth={1.08}
      fx={[{kind: 'dust', x: 140, y: 300, w: 800, h: 900}, {kind: 'flicker', x: 640, y: 420, r: 900, color: 'rgba(255,236,190,1)', strength: 0.6}, {kind: 'film'}]}>
      {useGFrame() >= at('December') && <Highlight text="DEC. 1973" x={SAFE.x} y={SAFE.top} size={96} at={at('December')} seed={7} rot={-2} />}
      <Note text="“Captain Howdy”" x={SAFE.x + 20} y={SAFE.top + 170} size={96} rot={-4} at={at('Captain Howdy') - 2} color={pal.subject} />
    </Layered>
  );
};

/** Same board: the two pictures dropped on the desk, one above the other. */
const Same: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const pal = usePal();
  const a = at('Same board') - 1;
  return (
    <Desk a={a}>
      <DropCard src={RW} x={90} y={260} w={470} rot={-3} at={a} filter={LOOK.warm} />
      <DropCard src="img/gen/ch01_basement.jpg" x={230} y={700} w={760} rot={3} at={a + 5} filter={LOOK.night} />
      <Loop cx={324} cy={594} rx={120} ry={46} at={at('Same board') + 4} seed={11} tilt={-3} />
      <Loop cx={489} cy={1063} rx={84} ry={40} at={at('Same board') + 8} seed={12} tilt={2} />
      <Note text="same board" x={590} y={300} size={76} rot={-3} at={at('Same board') + 2} />
      <Note text="1920: a date" x={600} y={440} size={62} rot={-3} at={at('In 1920') - 2} color="#ffffff" />
      <Note text="today: not in my house" x={SAFE.x} y={1160} size={64} rot={-3} at={at('Today') - 2} color={pal.subject} />
      <Tag text="Rockwell, 1920 · and an illustration of a basement, 1973" />
    </Desk>
  );
};

/** The question, written out large: the captions step aside for it. */
const Question: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const at = t.at;
  return (
    <Desk a={at("So here's")}>
      <Note text="the question:" x={SAFE.x} y={SAFE.top + 40} size={64} rot={-3} at={at("So here's")} color="#ffffff" />
      <Note text="how did a game" x={SAFE.x} y={SAFE.top + 200} size={90} rot={-3} at={at('How did') - 2} />
      <Note text="for sweethearts" x={SAFE.x + 40} y={SAFE.top + 340} size={90} rot={-3} at={at('sweethearts') - 2} />
      <Note text="become the object" x={SAFE.x} y={SAFE.top + 500} size={90} rot={-3} at={at('become') - 2} />
      <Note text="people are afraid" x={SAFE.x + 20} y={SAFE.top + 640} size={92} rot={-3} at={at('people are') - 2} color={pal.subject} />
      <Note text="to touch?" x={SAFE.x + 60} y={SAFE.top + 780} size={124} rot={-4} at={at('touch') - 2} color={pal.subject} />
    </Desk>
  );
};

/** Hand-off: the planchette glides to GOOD BYE, and the answer is in the full video. */
const OUT_MOVES = [{f: 10, to: 'GOOD BYE', dur: 16}];
const Outro: React.FC = () => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <BoardShot a={0} b={OUTRO} moves={OUT_MOVES} cam="top" light="candle" dolly={0.35} start={{x: 1024, y: 640}}
      rings={landings(OUT_MOVES).map((l) => ({at: l.f, key: l.key}))}>
      <AbsoluteFill style={{background: 'rgba(5,4,3,0.5)', opacity: interpolate(g, [30, 38], [0, 1], clamp)}} />
      <Note text="the answer is in" x={SAFE.x + 40} y={SAFE.top + 120} size={88} rot={-3} at={34} color="#ffffff" />
      {g >= 40 && <Highlight text="THE FULL VIDEO" x={SAFE.x} y={SAFE.top + 260} size={104} at={40} seed={61} rot={-2} />}
      <Note text="(link below)" x={SAFE.x + 300} y={SAFE.top + 450} size={64} rot={-3} at={50} color={pal.subject} />
    </BoardShot>
  );
};

const Body: React.FC = () => {
  const frame = useCurrentFrame();
  const t = makeTimeline(N, FPS);
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Cover t={t} />],
    [at('Now jump') - 2, <Basement t={t} />],
    [at('Same board') - 1, <Same t={t} />],
    [at("So here's") - 1, <Question t={t} />],
  ];
  const outAt = VOICE_END + 6;
  const story = useScene(cuts);
  const scene = frame >= outAt ? <Sequence from={outAt} layout="none"><Outro /></Sequence> : story;
  const jump = at('Now jump') - 2;
  const notes = ['Captain Howdy', 'Same board', 'In 1920', 'Today', "So here's", 'How did', 'sweethearts', 'become', 'people are', 'touch'];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {scene}
      <Finish vignette={0.3} />
      {frame < at("So here's") - 1 && <Captions t={t} />}
      <Audio src={staticFile('audio/short01_date.wav')} />
      {/* love, then a hard cut to fear on the picture cut: the same music moves as the long video */}
      <Sequence from={0} durationInFrames={jump} layout="none">
        <Audio src={staticFile('music/j_good_feelings.mp3')} volume={(f) => interpolate(f, [0, 4, jump - 3, jump], [0.22, 0.3, 0.3, 0], clamp)} />
      </Sequence>
      <Sequence from={jump} durationInFrames={SHORT01_FRAMES - jump} layout="none">
        <Audio src={staticFile('music/r_spirits_dark.mp3')} volume={(f) => interpolate(f, [0, 2, SHORT01_FRAMES - jump - 30, SHORT01_FRAMES - jump], [0, 0.15, 0.15, 0], clamp)} />
      </Sequence>
      <Sfx at={jump - 4} src="sfx/whoosh.wav" volume={0.45} />
      {cuts.slice(2).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.25} />)}
      <Sfx at={outAt} src="sfx/whoosh.wav" volume={0.3} />
      {['1920', 'December'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      <Sfx at={at('Same board') + 1} src="sfx/page_turn.wav" volume={0.3} />
      {landings(OUT_MOVES).map((l, i) => <Sfx key={`o${i}`} at={outAt + l.f - 1} src="sfx/marker_tick.wav" volume={0.25} />)}
      <Sfx at={outAt + 40} src="sfx/stamp.wav" volume={0.35} />
    </AbsoluteFill>
  );
};

export const Short01: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2}>
      <TagPos.Provider value={{x: SAFE.x, y: SAFE.tag, w: SAFE.w}}>
        <Body />
      </TagPos.Provider>
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
