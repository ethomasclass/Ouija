// Chapter 1 · cold open: the 1920 Rockwell cover → the 1973 basement → the same board → the driving question →
// "not a light switch" (love, fun, grief, fear at once) → knock. Then the channel intro and the title card,
// spelled out on the 3D board.
import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';
import words from '../../public/audio/ch01_cold_open.words.json';
import {clamp} from '../lib/anim';
import {FPS} from '../lib/theme';
import {Finish, Highlight, JF, Loop, Note, PALETTES, PaletteCtx, StepCtx, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChannelIntro, INTRO_FRAMES} from '../kit/Intro';
import {makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Bands, Desk, DropCard, Layered, LOOK, SrcView} from '../kit/oj';
import {BoardShot, landings, spell} from '../kit/board3d';
import {DATES, SUBTITLE, TITLE} from '../project';
import '../masks';

const N = words as Narration;
const TITLE_FRAMES = 168;
const END = Math.ceil(N.duration * FPS) + 16;
export const CH01_FRAMES = END + INTRO_FRAMES + TITLE_FRAMES;

const RW = 'img/arch/rockwell_ouija_1920.jpg';
const RW_SIZE: [number, number] = [1838, 2472];
const RW_TAG = 'Norman Rockwell, "The Ouija Board," Saturday Evening Post cover, May 1, 1920';

/** The magazine lands on the desk; then the camera moves in on the couple. */
const Cover: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const at = t.at;
  const s0 = 860 / RW_SIZE[1];
  return (
    <Desk>
      <SrcView src={RW} size={RW_SIZE} card look="warm" keys={[
        [0, 919, 1236, s0], [at('Norman Rockwell') - 2, 919, 1236, s0], [at('Knees touching') - 4, 930, 1300, 0.95], [at('fingertips'), 930, 1360, 1.25], [at('sweet'), 900, 1120, 0.8],
      ]}>
        {(sw) => (
          <>
            <Loop cx={398} cy={668} rx={150} ry={56} at={at('1920') - 2} width={sw(6)} seed={2} tilt={-2} />
            <Loop cx={975} cy={1505} rx={215} ry={70} at={at('Knees touching') - 2} width={sw(6)} seed={3} tilt={-4} />
            <Loop cx={918} cy={1333} rx={190} ry={85} at={at('fingertips') - 2} width={sw(6)} seed={4} tilt={3} />
          </>
        )}
      </SrcView>
      {useGFrame() >= at('1920') && <Highlight text="MAY 1, 1920" x={1180} y={140} size={92} at={at('1920')} seed={5} rot={-2} />}
      <Note text="the Saturday Evening Post" x={1190} y={300} size={46} rot={-3} at={at('Saturday') - 2} color="#ffffff" out={at('Norman Rockwell')} />
      <Note text="knees touching" x={1240} y={760} size={58} rot={-3} at={at('Knees touching') - 2} />
      <Note text="one pointer, two hands" x={1180} y={620} size={52} rot={-3} at={at('fingertips') - 2} />
      <Note text="it's a date." x={1250} y={880} size={74} rot={-4} at={at('date') - 2} color={pal.subject} />
      <Tag text={RW_TAG} />
    </Desk>
  );
};

/** December 1973: the basement. */
const Basement: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const at = t.at;
  return (
    <Layered name="ch01_basement" a={at('Now jump') - 2} b={at('Same board')} label="a basement, 1973" look="night" tint traceAt={at('girl finds') - 2}
      cam={{z: [1.32, 1.06], x: [0.08, 0.02], y: [0.12, 0.04]}} depth={1.08}
      fx={[{kind: 'dust', x: 640, y: 40, w: 520, h: 700}, {kind: 'flicker', x: 870, y: 70, r: 700, color: 'rgba(255,236,190,1)', strength: 0.6}, {kind: 'film'}]}>
      {useGFrame() >= at('December') && <Highlight text="DEC. 1973" x={110} y={120} size={92} at={at('December')} seed={7} rot={-2} />}
      <Note text="in movie theaters" x={120} y={290} size={50} rot={-3} at={at('movie theaters') - 2} color="#ffffff" />
      <Note text="a 12-year-old girl" x={1180} y={760} size={56} rot={-3} at={at('girl finds') - 2} />
      <Note text="“Captain Howdy”" x={1160} y={300} size={80} rot={-4} at={at('Captain Howdy') - 2} color={pal.subject} />
      <Note text="two priests. her soul." x={1180} y={440} size={52} rot={-3} at={at('two priests') - 2} color="#ffffff" />
    </Layered>
  );
};

/** Same board: the two pictures side by side. */
const Same: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const pal = usePal();
  const a = at('Same board') - 1;
  return (
    <Desk a={a}>
      <DropCard src={RW} x={170} y={110} w={560} rot={-3} at={a} filter={LOOK.warm} />
      <DropCard src="img/gen/ch01_basement.jpg" x={880} y={240} w={880} rot={2} at={a + 5} filter={LOOK.night} />
      <Loop cx={460} cy={570} rx={150} ry={50} at={at('Same board') + 4} seed={11} tilt={-3} />
      <Loop cx={1180} cy={660} rx={90} ry={44} at={at('Same board') + 8} seed={12} tilt={2} />
      <Note text="same board" x={760} y={120} size={64} rot={-3} at={at('Same board') + 2} />
      <Note text="same alphabet" x={780} y={850} size={54} rot={-2} at={at('Same alphabet') - 2} color="#ffffff" />
      <Note text="same YES and NO" x={1180} y={930} size={54} rot={-3} at={at('Same YES') - 2} color="#ffffff" />
      <Note text="1920: a date" x={200} y={900} size={58} rot={-3} at={at('In 1920') - 2} />
      <Note text="today: not in my house" x={1060} y={130} size={56} rot={-3} at={at('Today') - 2} color={pal.subject} />
      <Tag text="Rockwell, 1920 · and an illustration of a basement, 1973" />
    </Desk>
  );
};

const Question: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const at = t.at;
  return (
    <Desk a={at("So here's")}>
      <Note text="the question:" x={200} y={170} size={60} rot={-3} at={at("So here's")} color="#ffffff" />
      <Note text="how did a game for sweethearts" x={240} y={320} size={86} rot={-3} at={at('How did') - 2} />
      <Note text="become the object" x={280} y={480} size={86} rot={-3} at={at('become') - 2} />
      <Note text="people are afraid to touch?" x={320} y={640} size={92} rot={-3} at={at('afraid') - 2} color={pal.subject} />
    </Desk>
  );
};

/** Not a light switch: love, fun, grief and fear on one timeline, overlapping. */
const NotASwitch: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const g = useGFrame();
  const pal = usePal();
  const strike = interpolate(g, [at('light switch') + 6, at('light switch') + 12], [0, 1], clamp);
  return (
    <Desk a={at('One warning')}>
      <div style={{position: 'absolute', left: 150, top: 120, fontFamily: JF.display, fontSize: 84, color: '#f4efe6', opacity: g >= at('light switch') - 2 ? 1 : 0}}>
        a light switch
        <div style={{position: 'absolute', left: -10, top: 52, height: 8, width: `${strike * 104}%`, background: pal.subject, transform: 'rotate(-3deg)'}} />
      </div>
      <Bands x={240} y={330} w={1440} from={1886} to={1975} axisAt={at('For most') - 2} ticks={[1890, 1920, 1950, 1973]} bands={[
        {label: 'LOVE', color: '#FF9F1C', a: 1890, b: 1940, at: at('love') - 2},
        {label: 'FUN', color: '#2FE0C4', a: 1890, b: 1975, at: at('fun') - 2},
        {label: 'GRIEF', color: '#EDE7DC', a: 1890, b: 1950, at: at('grief') - 2},
        {label: 'FEAR', color: '#FF6F61', a: 1905, b: 1975, at: at('fear') - 2},
      ]} />
      <Note text="all at once" x={1300} y={150} size={64} rot={-4} at={at('all at the same') - 2} />
      <Note text="the story changed." x={240} y={900} size={60} rot={-3} at={at('But the story') - 2} color="#ffffff" />
      {g >= at('who changed') && <Highlight text="WHO?" x={1300} y={860} size={110} at={at('who changed')} seed={14} rot={-3} />}
    </Desk>
  );
};

/** It starts with some knocking. */
const Knock: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const k = t.at('knocking');
  return (
    <Desk a={t.at('It starts')}>
      {[0, 9].map((d, i) => g >= k + d && (
        <div key={i} style={{position: 'absolute', left: 620 + i * 380, top: 400 + i * 60, fontFamily: JF.display, fontSize: 150, color: '#FF9F1C', textShadow: '0 6px 22px rgba(0,0,0,0.7)',
          transform: `rotate(${-6 + i * 9}deg) scale(${interpolate(g, [k + d, k + d + 4], [1.3, 1], clamp)})`}}>KNOCK</div>
      ))}
    </Desk>
  );
};

/** Title card: the planchette spells GOOD LUCK on the board, from above; then the title stamps on. */
const TITLE_MOVES = spell('GOODLUCK', 8, 9);
const Title: React.FC = () => {
  const g = useGFrame();
  const pal = usePal();
  const done = TITLE_MOVES[TITLE_MOVES.length - 1].f + 12;
  return (
    <BoardShot a={0} b={TITLE_FRAMES} moves={TITLE_MOVES} cam="top" light="candle" dolly={0.4} start={{x: 1024, y: 900}}
      rings={landings(TITLE_MOVES).map((l) => ({at: l.f, key: l.key}))}>
      <AbsoluteFill style={{background: 'rgba(5,4,3,0.55)', opacity: interpolate(g, [done, done + 8], [0, 1], clamp)}} />
      {g >= done && <Highlight text={TITLE} x={360} y={360} size={180} at={done} seed={61} rot={-2} />}
      {g >= done + 10 && <div style={{position: 'absolute', left: 400, top: 640, fontFamily: JF.display, fontSize: 60, color: pal.mark, textShadow: '0 3px 16px rgba(0,0,0,0.8)',
        opacity: interpolate(g, [done + 10, done + 16], [0, 1], clamp)}}>{SUBTITLE}</div>}
      <Note text={DATES} x={1350} y={770} size={52} rot={-5} at={done + 18} />
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
    [at('One warning') - 1, <NotASwitch t={t} />],
    [at('It starts') - 1, <Knock t={t} />],
  ];
  let scene = useScene(cuts);
  if (frame >= END + INTRO_FRAMES) scene = <Sequence from={END + INTRO_FRAMES} layout="none"><Title /></Sequence>;
  else if (frame >= END) scene = <Sequence from={END} layout="none"><ChannelIntro /></Sequence>;
  const jump = at('Now jump') - 2;
  const notes = ['Saturday', 'Knees touching', 'fingertips', 'date', 'movie theaters', 'girl finds', 'Captain Howdy', 'two priests', 'Same board', 'Same alphabet', 'Same YES',
    'In 1920', 'Today', "So here's", 'How did', 'become', 'afraid', 'all at the same', 'But the story'];
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {scene}
      {frame < END && <Finish vignette={0.3} />}
      <Audio src={staticFile('audio/ch01_cold_open.wav')} />
      {/* love, then a hard cut to fear on the picture cut */}
      <Sequence from={0} durationInFrames={jump} layout="none">
        <Audio src={staticFile('music/j_good_feelings.mp3')} volume={(f) => interpolate(f, [0, 12, jump - 3, jump], [0, 0.3, 0.3, 0], clamp)} />
      </Sequence>
      <Sequence from={jump} durationInFrames={END - jump} layout="none">
        <Audio src={staticFile('music/r_spirits_dark.mp3')} volume={(f) => interpolate(f, [0, 2, END - jump - 40, END - jump], [0, 0.15, 0.12, 0], clamp)} />
      </Sequence>
      <Sfx at={jump - 4} src="sfx/whoosh.wav" volume={0.45} />
      {cuts.slice(2).map(([f], i) => <Sfx key={i} at={f} src="sfx/whoosh.wav" volume={0.25} />)}
      {['1920', 'December', 'who changed'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      <Sfx at={at('Same board') + 1} src="sfx/page_turn.wav" volume={0.3} />
      <Sfx at={at('knocking') - 1} src="sfx/knock.wav" volume={0.5} />
      <Sfx at={at('knocking') + 8} src="sfx/knock.wav" volume={0.45} />
      {landings(TITLE_MOVES).map((l, i) => <Sfx key={`t${i}`} at={END + INTRO_FRAMES + l.f - 1} src="sfx/marker_tick.wav" volume={0.18} />)}
      <Sfx at={END + INTRO_FRAMES + TITLE_MOVES[TITLE_MOVES.length - 1].f + 11} src="sfx/stamp.wav" volume={0.4} />
    </AbsoluteFill>
  );
};

export const Ch01: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <StepCtx.Provider value={2}>
      <Body />
    </StepCtx.Provider>
  </PaletteCtx.Provider>
);
