// Chapter 9 · Who Moves It? (the answer; heavy pacing for the last part): back to the question → 1891 vs today:
// the board barely changed → toy or spirit, who's moving it? → Faraday's tables and the ideomotor effect → the
// 2012 blindfold study (50% vs 65%) → "We did": the hands montage, with the four feelings' music → what each era
// reached for → "good luck" → the empty board for the end screen.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import words from '../../public/audio/ch09_who_moves_it.words.json';
import {clamp} from '../lib/anim';
import {FPS} from '../lib/theme';
import {Highlight, JF, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, Definition, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Desk, DropCard, HBars, Layered, LOOK} from '../kit/oj';
import {BoardShot} from '../kit/board3d';
import '../masks';

const N = words as Narration;
/** The empty board holds for YouTube's end screen (subscribe + next video) after the last line. */
export const END_SCREEN = 15 * FPS;
export const CH09_FRAMES = chapterFrames(N, LEAD, END_SCREEN);
const NARR_END = Math.ceil(N.duration * FPS);

const Back: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Desk a={0}>
      <Note text="back to our question:" x={200} y={170} size={60} rot={-3} at={4} color="#ffffff" />
      <Note text="a game for sweethearts…" x={260} y={340} size={86} rot={-3} at={t.at('How did') - 2} />
      <Note text="…the object people are afraid to touch?" x={260} y={520} size={66} rot={-3} at={t.at('afraid') - 2} color={pal.subject} />
    </Desk>
  );
};

const Compare: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('Put a') - 1;
  return (
    <Desk a={a}>
      <DropCard src="img/arch/patent_446054.jpg" x={150} y={90} w={600} rot={-2} at={a} />
      <DropCard src="img/gen/hands_00_board.jpg" x={880} y={240} w={900} rot={2} at={t.at('one you') - 2} filter={LOOK.warm} />
      <Note text="1891" x={180} y={40} size={64} rot={-3} at={a + 2} color="#ffffff" />
      <Note text="today" x={1500} y={150} size={64} rot={-3} at={t.at('today') - 2} color="#ffffff" />
      <Note text="same alphabet" x={900} y={820} size={52} rot={-3} at={t.at('Same alphabet') - 2} />
      <Note text="same numbers" x={1360} y={820} size={52} rot={-3} at={t.at('Same numbers') - 2} />
      <Note text="YES / NO" x={900} y={930} size={52} rot={-3} at={t.at('YES and') - 2} />
      <Note text="GOOD BYE" x={1360} y={930} size={52} rot={-3} at={t.at('GOOD BYE') - 2} />
      {g >= t.at('barely changed') && <Highlight text="BARELY CHANGED" x={180} y={880} size={84} at={t.at('barely changed')} seed={3} rot={-3} />}
      <Tag text="E. J. Bond, patent drawing, 1891 · illustration of the board today" />
    </Desk>
  );
};

const Hands: React.FC<{t: TL}> = ({t}) => (
  <Layered name="hands_00_board" a={t.at('The story did') - 1} b={t.at('Remember')} label="the same board" look="warm" cam={{z: [1.15, 1.04]}}>
    <Note text="the story did." x={130} y={140} size={80} rot={-3} at={t.at('The story did') - 2} color="#ffffff" />
    <Note text="whose hands were on it?" x={1100} y={870} size={56} rot={-3} at={t.at('whose hands') - 2} />
  </Layered>
);

const Who: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Desk a={t.at('Remember') - 1}>
      <Note text="remember:" x={200} y={160} size={60} rot={-3} at={t.at('Remember')} color="#ffffff" />
      {g >= t.at('toy, or') && <Highlight text="TOY?" x={300} y={330} size={150} at={t.at('toy, or')} seed={41} rot={-3} />}
      {g >= t.at('spirit') && <Highlight text="SPIRIT?" x={900} y={380} size={150} at={t.at('spirit')} seed={42} rot={2} />}
      {g >= t.at("Who's actually") && <Highlight text="WHO'S MOVING IT?" x={300} y={700} size={120} at={t.at("Who's actually")} seed={43} rot={-2} />}
    </Desk>
  );
};

/** Faraday's tables: a teal diagram of hands pushing without knowing. */
const Faraday: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const a = t.at('Scientists') - 1;
  const push = interpolate(g, [t.at('were pushing') - 2, t.at('were pushing') + 10], [0, 1], clamp);
  return (
    <Desk a={a}>
      <DropCard src="img/arch/faraday_portrait.jpg" x={150} y={130} w={380} rot={-3} at={t.at('In 1853') - 2} />
      {g >= t.at('1853') && <Highlight text="1853 · MICHAEL FARADAY" x={620} y={120} size={80} at={t.at('1853')} seed={5} rot={-2} />}
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
        {/* the table: a tipping top on a pedestal, hands resting on it; arrows show the unnoticed push */}
        <g opacity={g >= t.at('tipping') - 2 ? 1 : 0} stroke={pal.mark} strokeWidth={6} fill="none" strokeLinecap="round" strokeLinejoin="round"
          transform={`rotate(${-6 * push} 1150 560)`}>
          <ellipse cx={1150} cy={480} rx={330} ry={60} />
          <line x1={1150} y1={540} x2={1150} y2={760} />
          <path d="M1060,800 L1150,760 L1240,800" />
          <path d="M930,440 q20,-40 60,-30 M1310,430 q30,-30 60,-10" />
        </g>
        {push > 0 && [[880, 380, 980, 430], [1420, 380, 1320, 430]].map(([x1, y1, x2, y2], i) => (
          <g key={i} stroke={pal.subject} strokeWidth={7} strokeLinecap="round" opacity={push}>
            <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * push} y2={y1 + (y2 - y1) * push} />
          </g>
        ))}
      </svg>
      <Note text="spirit tables" x={1000} y={260} size={56} rot={-3} at={t.at('tipping') - 2} color="#ffffff" />
      <Note text="they were pushing" x={1000} y={830} size={64} rot={-3} at={t.at('were pushing') - 2} color={pal.subject} />
      <Note text="without realizing it" x={1040} y={930} size={52} rot={-3} at={t.at('without realizing') - 2} color="#ffffff" />
      <Definition term="ideomotor effect" def="your muscles move with an idea, before you decide to move them" at={t.at('ideomotor') - 2} x={150} y={640} w={760} />
      <Tag text="Michael Faraday · public domain portrait" />
    </Desk>
  );
};

const Blindfold: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Layered name="ch09_blindfold_lab" a={t.at('And in 2012') - 1} b={t.at('When players')} label="a blindfold test, 2012" tint traceAt={t.at('blindfolded') - 2}
      cam={{z: [1.04, 1.16], x: [-0.04, -0.06]}} depth={1.05}>
      {g >= t.at('2012') && <Highlight text="2012" x={110} y={110} size={110} at={t.at('2012')} seed={6} rot={-2} />}
      <Note text="researchers in Canada" x={120} y={290} size={52} rot={-3} at={t.at('researchers') - 2} color="#ffffff" />
      <Note text="blindfolded" x={1300} y={130} size={60} rot={-3} at={t.at('blindfolded') - 2} />
      <Note text="partner quietly lets go" x={1170} y={860} size={54} rot={-3} at={t.at('let go') - 2} />
    </Layered>
  );
};

const Results: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Desk a={t.at('When players') - 1}>
      <Note text="questions they thought they were guessing at:" x={140} y={140} size={52} rot={-3} at={t.at('When players')} color="#ffffff" />
      <HBars x={150} y={300} w={1200} max={100} rows={[
        {label: 'answered out loud', value: 50, text: '50%', color: '#EDE7DC', at: t.at('spoken answers') - 2},
        {label: 'through the board', value: 65, text: '65%', color: pal.subject, at: t.at('Through the') - 2},
      ]} gap={200} />
      <Note text="pure chance" x={980} y={360} size={56} rot={-3} at={t.at('Pure chance') - 2} color="#ffffff" />
      <Note text="the board knew more than they thought they knew" x={150} y={760} size={54} rot={-3} at={t.at('The board knew') - 2} />
      <Note text="because the board was them." x={190} y={850} size={72} rot={-3} at={t.at('board was them') - 4} color={pal.subject} />
      <Tag text="Gauchou, Rensink & Fels, Consciousness and Cognition 21 (2012), University of British Columbia" />
    </Desk>
  );
};

const WeDid: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Desk a={t.at('So who turned') - 1}>
      <Note text="who turned it scary?" x={200} y={180} size={70} rot={-3} at={t.at('So who turned')} color="#ffffff" />
      <Note text="not one person" x={240} y={360} size={60} rot={-3} at={t.at('Not one') - 2} />
      <Note text="not even one movie" x={260} y={470} size={60} rot={-3} at={t.at('Not even') - 2} />
      {g >= t.at('We did') && <Highlight text="WE DID." x={300} y={640} size={170} at={t.at('We did')} seed={11} rot={-3} />}
    </Desk>
  );
};

/** The montage: the same board, four pairs of hands, four feelings. */
const Montage: React.FC<{t: TL; name: string; label: string; word: string; color: string; a: number; b: number; look?: 'warm' | 'bw' | 'night'}> = ({t, name, label, word, color, a, b, look = 'warm'}) => {
  const g = useGFrame();
  return (
    <Layered name={name} a={a} b={b} label={label} look={look} tint={name !== 'hands_1918_mother'} cam={{z: [1.12, 1.05]}} depth={1.05}>
      <div style={{position: 'absolute', left: 120, top: 120, fontFamily: JF.display, fontSize: 130, color, textShadow: '0 6px 22px rgba(0,0,0,0.85)',
        transform: `scale(${interpolate(g, [a, a + 4], [1.25, 1], clamp)})`}}>{word}</div>
    </Layered>
  );
};

const Hands3D: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('And it went') - 1;
  return (
    <BoardShot a={a} b={t.at("That's what")} cam="low" light="candle" start={{x: 900, y: 700}}
      moves={[{f: a + 4, to: {x: 1250, y: 640}, dur: 30}, {f: a + 40, to: {x: 820, y: 760}, dur: 34}]}>
      <Note text="right where our hands took it." x={150} y={880} size={66} rot={-3} at={t.at('our hands') - 2} color="#ffffff" />
    </BoardShot>
  );
};

const Eras: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Desk a={t.at("That's what") - 1}>
      <Note text="something moves on its own…" x={150} y={130} size={58} rot={-3} at={t.at('move on') - 2} color="#ffffff" />
      <Note text="we reach for the story our time hands us" x={170} y={240} size={56} rot={-3} at={t.at('We reach') - 2} />
      <Note text="1920: romance" x={220} y={440} size={76} rot={-3} at={t.at('In 1920') - 2} color="#FF9F1C" />
      <Note text="1918: a son, still out there" x={220} y={580} size={76} rot={-3} at={t.at('In 1918') - 2} color="#EDE7DC" />
      <Note text="after 1973: a demon" x={220} y={720} size={76} rot={-3} at={t.at('After 1973') - 2} color={pal.subject} />
    </Desk>
  );
};

/** Good luck: the planchette drifts to GOOD BYE; then the empty board holds for the end screen. */
const GoodLuck: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const a = t.at('Helen Peters') - 1;
  const gb = t.at('Turns out');
  const end = NARR_END + 30;
  const fade = interpolate(g, [end, end + 20], [1, 0], clamp);
  return (
    <BoardShot a={a} b={NARR_END + END_SCREEN} cam="top" light="candle" start={{x: 1024, y: 760}} dolly={0.25} moves={[{f: gb - 10, to: 'GOOD BYE', dur: 30}]}
      rings={[{at: gb + 22, key: 'GOOD BYE'}]}>
      <div style={{opacity: fade}}>
        <Note text="Helen Peters said it meant…" x={120} y={120} size={56} rot={-3} at={a + 4} color="#ffffff" />
        {g >= t.at('good luck') && <Highlight text="“GOOD LUCK.”" x={120} y={230} size={110} at={t.at('good luck')} seed={13} rot={-3} />}
        <Note text="that was up to whoever was holding it." x={120} y={900} size={64} rot={-3} at={t.at('up to') - 2} />
      </div>
      <AbsoluteFill style={{background: 'rgba(5,4,3,0.55)', opacity: interpolate(g, [end, end + 30], [0, 1], clamp)}} />
    </BoardShot>
  );
};

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const m = [at('Couples put'), at('Grieving mothers'), at('Kids put'), at('then fear'), at('And it went')];
  const cuts: [number, React.ReactNode][] = [
    [0, <Back t={t} />],
    [at('Put a') - 1, <Compare t={t} />],
    [at('The story did') - 1, <Hands t={t} />],
    [at('Remember') - 1, <Who t={t} />],
    [at('Scientists') - 1, <Faraday t={t} />],
    [at('And in 2012') - 1, <Blindfold t={t} />],
    [at('When players') - 1, <Results t={t} />],
    [at('So who turned') - 1, <WeDid t={t} />],
    [m[0] - 1, <Montage t={t} name="hands_1920_couple" label="the same board, 1920" word="LOVE" color="#FF9F1C" a={m[0] - 1} b={m[1]} />],
    [m[1] - 1, <Montage t={t} name="hands_1918_mother" label="the same board, 1918" word="GRIEF" color="#EDE7DC" a={m[1] - 1} b={m[2]} look="bw" />],
    [m[2] - 1, <Montage t={t} name="hands_1967_kids" label="the same board, 1967" word="FUN" color="#2FE0C4" a={m[2] - 1} b={m[3]} />],
    [m[3] - 1, <Montage t={t} name="hands_1973_alone" label="the same board, 1973" word="FEAR" color="#FF6F61" a={m[3] - 1} b={m[4]} look="night" />],
    [m[4] - 1, <Hands3D t={t} />],
    [at("That's what") - 1, <Eras t={t} />],
    [at('Helen Peters') - 1, <GoodLuck t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['How did', 'afraid', 'Same alphabet', 'Same numbers', 'YES and', 'GOOD BYE', 'The story did', 'whose hands', 'Remember', 'tipping', 'were pushing', 'without realizing',
  'researchers', 'blindfolded', 'let go', 'Pure chance', 'The board knew', 'board was them', 'So who turned', 'Not one', 'Not even', 'our hands', 'move on', 'We reach', 'In 1920', 'In 1918',
  'After 1973', 'up to'];

export const Ch09: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  const m = [at('Couples put'), at('Grieving mothers'), at('Kids put'), at('then fear'), at('And it went')];
  return (
    <ChapterShell n={N} audio="audio/ch09_who_moves_it.wav" lead={LEAD} extra={END_SCREEN} music={[
      {src: 'music/r_cold_open.mp3', volume: 0.13, to: m[0] + 4, fadeOut: 12},
      // the four feelings, a few seconds each
      {src: 'music/j_good_feelings.mp3', volume: 0.3, from: m[0] - 2, to: m[1] + 2, fadeIn: 4, fadeOut: 6, startFrom: 240},
      {src: 'music/j_grief.mp3', volume: 0.16, from: m[1] - 2, to: m[2] + 2, fadeIn: 4, fadeOut: 6},
      {src: 'music/r_schools.mp3', volume: 0.13, from: m[2] - 2, to: m[3] + 2, fadeIn: 4, fadeOut: 6, startFrom: 72},
      {src: 'music/r_spirits_dark.mp3', volume: 0.14, from: m[3] - 2, to: m[4] + 6, fadeIn: 4, fadeOut: 10, startFrom: 960},
      {src: 'music/r_ending.mp3', volume: 0.13, from: m[4], to: NARR_END + 24, fadeOut: 30},
      {src: 'music/j_good_feelings.mp3', volume: 0.3, from: NARR_END + 10, fadeIn: 30, fadeOut: 60},
    ]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {['Put a', 'Remember', 'Scientists', 'And in 2012', 'When players', 'So who turned', "That's what", 'Helen Peters'].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.2} />)}
      {['barely changed', "Who's actually", '1853', '2012', 'We did', 'good luck'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.3} />)}
      {m.slice(0, 4).map((f, i) => <Sfx key={`m${i}`} at={f - 1} src="sfx/whoosh.wav" volume={0.18} />)}
      <Sfx at={at('Turns out') - 10} src="sfx/scrape.wav" volume={0.2} />
    </ChapterShell>
  );
};
