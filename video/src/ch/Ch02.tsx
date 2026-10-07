// Chapter 2 · Knock Once for Yes: the Fox sisters (a callback to Fix Everything) → YES / NO on the board →
// Spiritualism and the Civil War's grief → knocking is slow (the alphabet séance) → 1886: the talking board → Baltimore.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import words from '../../public/audio/ch02_knock_once.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, JF, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, Definition, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Desk, DropCard, Layered, LOOK} from '../kit/oj';
import {BoardShot} from '../kit/board3d';
import {ChapterTitle} from '../kit/title';
import {PlateScene} from '../kit/plate';
import '../masks';

const N = words as Narration;
export const CH02_FRAMES = chapterFrames(N, LEAD);

const Opener: React.FC<{t: TL}> = ({t}) => (
  <AbsoluteFill>
    <ChapterTitle word="KNOCK" title="KNOCK ONCE FOR YES" n={2} b={t.at('1848') + 4} />
    <Note text="(see: Fix Everything)" x={1240} y={150} size={44} rot={-3} at={t.at('Reform') - 2} color="#ffffff" />
  </AbsoluteFill>
);

/** Once for yes, silence for no. */
const YesNo: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('Once for') - 3;
  const yes = t.at('yes');
  const no = t.at('no', 1);
  return (
    <BoardShot a={a} b={t.at('That sparks')} cam="low" light="candle" whipIn={12} start={{x: 1024, y: 700}}
      moves={[{f: a + 4, to: 'YES', dur: yes - a - 4}, {f: t.at('Silence'), to: 'NO', dur: no - t.at('Silence')}]} rings={[{at: yes, key: 'YES'}, {at: no, key: 'NO'}]}>
      <Note text="once for yes" x={150} y={150} size={60} rot={-3} at={yes - 2} />
      <Note text="silence for no" x={1220} y={150} size={60} rot={-3} at={no - 2} color="#ffffff" />
    </BoardShot>
  );
};

const Spiritualism: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('That sparks') - 1;
  const pal = usePal();
  return (
    <Desk a={a}>
      <DropCard src="img/test/fox_sisters.jpg" x={140} y={120} w={430} rot={-3} at={a} />
      <Definition term="Spiritualism" def="the belief that the living can talk to the dead" at={t.at('Spiritualism')} x={640} y={180} w={1100} />
      <DropCard src="img/reuse/soldier1.jpg" x={760} y={420} w={260} rot={2} at={t.at('Civil War') - 1} />
      <DropCard src="img/reuse/soldier2.jpg" x={1060} y={450} w={260} rot={-2} at={t.at('Civil War') + 4} />
      <DropCard src="img/reuse/soldier3.jpg" x={1360} y={420} w={260} rot={3} at={t.at('Civil War') + 9} />
      <Note text="after the Civil War:" x={700} y={850} size={52} rot={-3} at={t.at('Civil War') - 2} color="#ffffff" />
      <Note text="millions of grieving families" x={760} y={940} size={58} rot={-3} at={t.at('millions') - 2} color={pal.subject} />
      <Tag text="The Fox sisters, Currier lithograph, 1852 · Civil War soldiers, Library of Congress" />
    </Desk>
  );
};

/** Knocking is slow: someone calls out the alphabet. Then the texting joke. */
const Slow: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const a = t.at('But knocking') - 1;
  const call = t.at('calls out');
  const letters = ['A…', 'B…', 'C…'];
  const tick = t.at('like texting');
  const az = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const li = Math.min(25, Math.max(0, Math.floor((g - tick) / 1.2)));
  return (
    <Layered name="ch02_alphabet_seance" a={a} b={t.at('Then, in')} label="a parlor séance, 1850s" tint traceAt={call} cam={{z: [1.14, 1.04], x: [0.06, 0.1]}}
      fx={[{kind: 'flicker', x: 830, y: 330, r: 640, strength: 0.7}]}>
      {g < tick && letters.map((l, i) => g >= t.at(['A', 'B', 'C'][i]) - 2 && (
        <div key={l} style={{position: 'absolute', left: 1180 + i * 170, top: 120 + i * 40, fontFamily: JF.display, fontSize: 110, color: '#FF9F1C', textShadow: '0 4px 18px rgba(0,0,0,0.8)'}}>{l}</div>
      ))}
      <Note text="…wait for a knock" x={1160} y={380} size={56} rot={-3} at={t.at('waits') - 2} out={tick} color="#ffffff" />
      {g >= tick && (
        <AbsoluteFill style={{background: 'rgba(5,4,3,0.72)'}}>
          <div style={{position: 'absolute', left: 560, top: 300, width: 800, height: 150, border: '4px solid #2FE0C4', borderRadius: 26, background: 'rgba(0,0,0,0.5)'}} />
          <div style={{position: 'absolute', left: 600, top: 318, fontFamily: JF.display, fontSize: 96, color: '#f4efe6'}}>
            H<span style={{color: pal.subject}}>{az[li]}</span><span style={{opacity: g % 12 < 6 ? 1 : 0}}>|</span>
          </div>
          <Note text="texting, one letter at a time" x={560} y={520} size={60} rot={-3} at={tick} />
          <Note text="(scroll… scroll… scroll…)" x={640} y={640} size={52} rot={-3} at={t.at('scroll') - 2} color="#ffffff" />
        </AbsoluteFill>
      )}
    </Layered>
  );
};

/** 1886: the papers report a talking board from Ohio. */
const Tribune: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('Then, in') - 1;
  const pal = usePal();
  const g = useGFrame();
  return (
    <Desk a={a}>
      <DropCard src="img/arch/tribune_1886_talking_board.jpg" x={150} y={90} w={620} rot={-2} at={a} />
      {g >= t.at('1886') && <Highlight text="1886" x={900} y={130} size={110} at={t.at('1886')} seed={3} rot={-2} />}
      <Note text="newspapers across the country" x={900} y={310} size={52} rot={-3} at={t.at('newspapers') - 2} color="#ffffff" />
      <Note text="a shortcut:" x={900} y={420} size={60} rot={-3} at={t.at('shortcut') - 2} />
      <DropCard src="img/arch/tribune_1886_talking_board_detail.jpg" x={960} y={520} w={520} rot={3} at={t.at('talking board') - 2} />
      <Loop cx={1220} cy={720} rx={300} ry={190} at={t.at('alphabet printed') - 2} seed={5} />
      <Note text="“talking board”" x={1180} y={940} size={66} rot={-3} at={t.at('talking board') - 2} color={pal.subject} />
      <Tag text="New York Tribune, 1886: Ohio Spiritualists' talking board · Library of Congress, Chronicling America" />
    </Desk>
  );
};

const Ohio: React.FC<{t: TL}> = ({t}) => (
  <Layered name="ch02_ohio_camp" a={t.at('Nobody has') - 1} b={t.at('And a few')} label="a Spiritualist camp, Ohio, 1886" tint traceAt={t.at('Nobody has') + 4}
    cam={{z: [1.05, 1.16], x: [0.02, 0.0], y: [0.0, 0.06]}} fx={[{kind: 'dust', x: 300, y: 80, w: 1300, h: 500}]}>
    <Note text="nobody calls out letters" x={110} y={120} size={56} rot={-3} at={t.at('Nobody has')} color="#ffffff" />
    <Note text="the spirits just point." x={1150} y={880} size={66} rot={-3} at={t.at('just point') - 2} />
  </Layered>
);

const Baltimore: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const a = t.at('And a few') - 1;
  return (
    <Desk a={a}>
      {g >= t.at('Baltimore') && <Highlight text="BALTIMORE" x={500} y={340} size={150} at={t.at('Baltimore')} seed={9} rot={-2} />}
      <Note text="a few businessmen" x={520} y={200} size={58} rot={-3} at={a + 2} color="#ffffff" />
      <Note text="“we could sell this.”" x={620} y={600} size={96} rot={-4} at={t.at('we could') - 2} color={pal.subject} />
      {g >= t.at('sell') && <div style={{position: 'absolute', left: 1450, top: 520, fontFamily: JF.display, fontSize: 200, color: '#FF9F1C', textShadow: '0 6px 22px rgba(0,0,0,0.8)',
        transform: `rotate(10deg) scale(${interpolate(g, [t.at('sell'), t.at('sell') + 4], [1.4, 1], clamp)})`}}>$</div>}
    </Desk>
  );
};

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Opener t={t} />],
    [at('1848'), <PlateScene a={at('1848')} b={at('Once for') - 3} year={at('1848') + 2} place={at('upstate') - 2} knock={at('knocks') - 2} house={at('house') - 2} />],
    [at('Once for') - 3, <YesNo t={t} />],
    [at('That sparks') - 1, <Spiritualism t={t} />],
    [at('But knocking') - 1, <Slow t={t} />],
    [at('Then, in') - 1, <Tribune t={t} />],
    [at('Nobody has') - 1, <Ohio t={t} />],
    [at('And a few') - 1, <Baltimore t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['Reform', 'upstate', 'Silence', 'Civil War', 'millions', 'waits', 'like texting', 'scroll', 'newspapers', 'shortcut', 'Nobody has', 'just point', 'we could'];

export const Ch02: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch02_knock_once.wav" lead={LEAD} music={[{src: 'music/r_spirits.mp3', volume: 0.15, startFrom: 192}]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {[at('knocks') - 3, at('yes') - 1].map((f, i) => <Sfx key={`k${i}`} at={f} src="sfx/knock.wav" volume={0.45} />)}
      <Sfx at={at('Once for') - 9} src="sfx/whoosh.wav" volume={0.45} />
      <Sfx at={at('Once for') + 1} src="sfx/scrape.wav" volume={0.22} />
      <Sfx at={at('Silence')} src="sfx/scrape.wav" volume={0.12} />
      {['That sparks', 'But knocking', 'Then, in', 'Nobody has', 'And a few'].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.22} />)}
      {['Civil War', 'talking board'].map((c) => <Sfx key={c} at={at(c)} src="sfx/page_turn.wav" volume={0.3} />)}
      {['1886', 'Baltimore'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.3} />)}
      {['A', 'B', 'C'].map((c) => <Sfx key={c} at={at(c) + 4} src="sfx/knock.wav" volume={0.2} />)}
    </ChapterShell>
  );
};
