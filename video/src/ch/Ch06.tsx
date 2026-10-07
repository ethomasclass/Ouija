// Chapter 6 · Empty Chairs (heavy chapter: quiet palette, teal lines only, slower voice): WWI and the 1918 flu →
// Spiritualism comes back (Conan Doyle) → Ouija sales → one house: the date downstairs, the grieving mother upstairs.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import words from '../../public/audio/ch06_empty_chairs.words.json';
import {clamp} from '../lib/anim';
import {JF, Loop, Note, Tag, useGFrame} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Arch, Desk, DropCard, HBars, Layered, LOOK} from '../kit/oj';
import '../masks';

const N = words as Narration;
export const CH06_FRAMES = chapterFrames(N, LEAD);

/** Plain title, no box: the heavy chapters drop the orange. */
const Opener: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Desk a={0}>
      <div style={{position: 'absolute', left: 160, top: 380, fontFamily: JF.display, fontSize: 150, color: '#EDE7DC', opacity: interpolate(g, [4, 14], [0, 1], clamp)}}>EMPTY CHAIRS</div>
      <div style={{position: 'absolute', left: 170, top: 330, fontFamily: JF.mono, fontSize: 30, letterSpacing: 4, color: 'rgba(255,255,255,0.7)', opacity: interpolate(g, [4, 14], [0, 1], clamp)}}>CHAPTER 6</div>
      <Note text="a reason to need that doorway" x={180} y={640} size={60} rot={-3} at={t.at('reason') - 2} />
    </Desk>
  );
};

const Toll: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('World War') - 1;
  return (
    <Desk a={a}>
      <DropCard src="img/arch/wwi_soldiers.jpg" x={1180} y={100} w={600} rot={2} at={a} />
      <DropCard src="img/arch/flu_ward_1918.jpg" x={1220} y={520} w={560} rot={-2} at={t.at('1918') - 2} />
      <HBars x={130} y={200} w={760} max={675000} rows={[
        {label: 'World War One · Americans killed', value: 116000, text: '116,000', color: '#2FE0C4', at: t.at('World War')},
        {label: 'the 1918 flu · Americans killed', value: 675000, text: '675,000', color: '#EDE7DC', at: t.at('1918')},
      ]} gap={190} />
      <Note text="most of them young" x={150} y={640} size={60} rot={-3} at={t.at('Most of') - 2} />
      <Note text="parents." x={160} y={760} size={58} rot={-3} at={t.at('parents') - 2} color="#ffffff" />
      <Note text="wives." x={420} y={790} size={58} rot={-3} at={t.at('Wives') - 2} color="#ffffff" />
      <Note text="sweethearts." x={620} y={830} size={58} rot={-3} at={t.at('Sweethearts') - 2} color="#ffffff" />
      <Tag text="U.S. troops, 1918 · emergency influenza hospital, 1918 · U.S. Army / National Archives" />
    </Desk>
  );
};

const Doyle: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('So, just') - 1;
  return (
    <Desk a={a}>
      <Note text="Spiritualism comes roaring back" x={140} y={140} size={60} rot={-3} at={t.at('roaring') - 2} />
      <DropCard src="img/arch/conan_doyle.jpg" x={180} y={300} w={440} rot={-3} at={t.at('Arthur Conan') - 2} />
      <Note text="Arthur Conan Doyle" x={700} y={360} size={64} rot={-3} at={t.at('Arthur Conan') - 2} color="#ffffff" />
      <Note text="invented Sherlock Holmes" x={720} y={480} size={56} rot={-3} at={t.at('Sherlock') - 2} />
      <Note text="(the most logical detective in fiction)" x={740} y={590} size={46} rot={-3} at={t.at('most logical') - 2} color="#ffffff" />
      <Note text="“the dead are still with us”" x={720} y={760} size={66} rot={-3} at={t.at('dead are still') - 2} />
      <Tag text="Arthur Conan Doyle · public domain photograph" />
    </Desk>
  );
};

const Mother: React.FC<{t: TL}> = ({t}) => (
  <Layered name="hands_1918_mother" a={t.at('And Ouija') - 1} b={t.at('So picture')} label="the same board: a mother, 1918" look="bw"
    cam={{z: [1.18, 1.04], y: [0.04, 0.0]}} fx={[{kind: 'dust', x: 300, y: 0, w: 1300, h: 500}]}>
    <Note text="sold like never before" x={110} y={120} size={58} rot={-3} at={t.at('sell like') - 2} color="#ffffff" />
    <Note text="to reach sons and husbands" x={110} y={860} size={58} rot={-3} at={t.at('to reach') - 2} />
    <Note text="who aren't coming home" x={150} y={960} size={52} rot={-3} at={t.at("aren't coming") - 2} color="#ffffff" />
  </Layered>
);

/** One house: the couple downstairs, the mother upstairs. Colour creeps in. */
const House: React.FC<{t: TL}> = ({t}) => (
  <Layered name="ch06_house_cutaway" a={t.at('So picture') - 1} b={t.at('Same object')} label="one house, around 1920" look="bw" reveal={[t.at('picture one'), t.at('Upstairs') + 30]}
    cam={{z: [1.02, 1.12], y: [0.04, -0.02]}} fx={[{kind: 'snow'}]}>
    <Loop cx={1250} cy={870} rx={180} ry={125} at={t.at('In the parlor') - 2} seed={3} />
    <Note text="downstairs: a date" x={120} y={840} size={56} rot={-3} at={t.at('In the parlor') - 2} />
    <Loop cx={1390} cy={320} rx={150} ry={115} at={t.at('Upstairs') - 2} seed={4} />
    <Note text="upstairs: her mother" x={140} y={130} size={56} rot={-3} at={t.at('Upstairs') - 2} color="#ffffff" />
    <Note text="the son she lost in France" x={160} y={240} size={46} rot={-3} at={t.at('lost in') - 2} />
  </Layered>
);

const Same: React.FC<{t: TL}> = ({t}) => (
  <Desk a={t.at('Same object') - 1}>
    <Note text="same object." x={420} y={360} size={110} rot={-3} at={t.at('Same object') - 2} color="#ffffff" />
    <Note text="two completely different stories." x={360} y={560} size={84} rot={-3} at={t.at('Two completely') - 2} />
  </Desk>
);

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <Opener t={t} />],
    [at('World War') - 1, <Toll t={t} />],
    [at('So, just') - 1, <Doyle t={t} />],
    [at('And Ouija') - 1, <Mother t={t} />],
    [at('So picture') - 1, <House t={t} />],
    [at('Same object') - 1, <Same t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['reason', 'Most of', 'parents', 'Wives', 'Sweethearts', 'roaring', 'Arthur Conan', 'Sherlock', 'most logical', 'dead are still', 'sell like', 'to reach', "aren't coming",
  'In the parlor', 'Upstairs', 'lost in', 'Same object', 'Two completely'];

export const Ch06: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch06_empty_chairs.wav" lead={LEAD} quiet music={[
      {src: 'music/w_aftermath.mp3', volume: 0.12, to: at('So picture') + 12, fadeOut: 24},
      {src: 'music/j_grief.mp3', volume: 0.15, from: at('So picture') - 6},
    ]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume * 0.8} />)}
      {[at('World War') - 1, at('1918') - 2, at('Arthur Conan') - 2].map((f, i) => <Sfx key={`p${i}`} at={f} src="sfx/page_turn.wav" volume={0.25} />)}
    </ChapterShell>
  );
};
