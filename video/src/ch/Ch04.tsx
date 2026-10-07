// Chapter 4 · Knees Touching: dating rules around 1900 → how you play (knees, lights low, one pointer) → the
// built-in excuse to touch (the board says YES) → the 1920 craze and where Rockwell's cover came from.
import React from 'react';
import words from '../../public/audio/ch04_knees_touching.words.json';
import {Arrow, Highlight, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Desk, DropCard, Layered, LOOK} from '../kit/oj';
import {BoardShot} from '../kit/board3d';
import {ChapterTitle} from '../kit/title';
import '../masks';

const N = words as Narration;
export const CH04_FRAMES = chapterFrames(N, LEAD);

const Couples: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Desk a={t.at('A lot') - 1}>
      <DropCard src="img/arch/rockwell_ouija_1920.jpg" x={760} y={150} w={430} rot={-3} at={t.at('A lot') - 1} filter={LOOK.warm} />
      {g >= t.at('young couples') && <Highlight text="YOUNG COUPLES" x={1230} y={420} size={74} at={t.at('young couples')} seed={2} rot={-3} />}
      <Note text="who was buying it?" x={150} y={180} size={60} rot={-3} at={2} color="#ffffff" />
    </Desk>
  );
};

const Rules: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Layered name="ch04_parlor_chaperone" a={t.at('Dating') - 1} b={t.at('Now look')} label="a front parlor, around 1905" look="warm" tint traceAt={t.at('alone together') - 2}
      cam={{z: [1.04, 1.16], x: [0.0, 0.02], y: [0.04, 0.0]}} fx={[{kind: 'flicker', x: 1500, y: 300, r: 620, strength: 0.7}, {kind: 'halftone'}]}>
      {g >= t.at('1900') && <Highlight text="DATING, 1900" x={110} y={120} size={88} at={t.at('1900')} seed={3} rot={-2} />}
      <Note text="rules everywhere" x={130} y={280} size={56} rot={-3} at={t.at('rules') - 2} color="#ffffff" />
      <Note text="never alone together" x={130} y={870} size={58} rot={-3} at={t.at('alone together') - 2} />
      <Note text="parents watched" x={1100} y={140} size={60} rot={-3} at={t.at('Parents watched') - 2} color={pal.subject} />
      <Arrow x1={1120} y1={220} x2={1000} y2={330} bow={30} at={t.at('Parents watched') + 2} />
      <Note text="neighbors talked" x={1250} y={880} size={58} rot={-3} at={t.at('Neighbors') - 2} color="#ffffff" />
    </Layered>
  );
};

/** How you play: the overhead hands (the "same board, different hands" series begins). */
const HowToPlay: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Layered name="hands_1920_couple" a={t.at('Now look') - 1} b={t.at("It's a parlor")} label="the same board: a couple, 1920" look="warm" tint traceAt={t.at('Fingertips') - 2}
      cam={{z: [1.18, 1.05], y: [0.06, 0.02]}} depth={1.05} fx={[{kind: 'flicker', x: 260, y: 140, r: 760, strength: 0.85}, {kind: 'halftone'}]}>
      <Note text="two people, face to face" x={1250} y={120} size={50} rot={-3} at={t.at('Two people') - 2} color="#ffffff" />
      <Note text="knees touching" x={1300} y={230} size={58} rot={-3} at={t.at('Knees touching') - 2} />
      <Note text="lights low" x={1300} y={330} size={58} rot={-3} at={t.at('Lights low') - 2} />
      <Note text="one little pointer" x={1300} y={430} size={58} rot={-3} at={t.at('Fingertips') - 2} color={pal.subject} />
      <Note text="does he like me?" x={110} y={820} size={64} rot={-4} at={t.at('Does he') - 2} color="#ffffff" />
      <Note text="will we get married?" x={150} y={930} size={64} rot={-3} at={t.at('Will we') - 2} color="#ffffff" />
    </Layered>
  );
};

const Excuse: React.FC<{t: TL}> = ({t}) => {
  const a = t.at("It's a parlor") - 1;
  const yes = t.at('says yes');
  const g = useGFrame();
  const pal = usePal();
  return (
    <BoardShot a={a} b={t.at('By 1920')} cam="close" light="lamp" start={{x: 1100, y: 760}} moves={[{f: yes - 14, to: 'YES', dur: 14}]} rings={[{at: yes + 1, key: 'YES'}]}>
      {g >= t.at('excuse') && <Highlight text="A BUILT-IN EXCUSE TO TOUCH" x={110} y={830} size={84} at={t.at('excuse')} seed={5} rot={-2} />}
      <Note text="who's going to argue with the spirits?" x={150} y={130} size={56} rot={-3} at={t.at("who's going") - 2} color={pal.subject} />
    </BoardShot>
  );
};

const Craze: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Desk a={t.at('By 1920') - 1}>
      <DropCard src="img/arch/rockwell_ouija_1920.jpg" x={1120} y={110} w={600} rot={2} at={t.at('By 1920') - 1} filter={LOOK.warm} />
      {g >= t.at('craze') && <Highlight text="1920: A FULL OUIJA CRAZE" x={100} y={160} size={84} at={t.at('craze')} seed={8} rot={-2} />}
      <Note text="summer 1919: Potsdam, N.Y." x={140} y={400} size={56} rot={-3} at={t.at('Potsdam') - 2} />
      <Note text="a dance hall, couples knee to knee" x={140} y={510} size={50} rot={-3} at={t.at('knee to knee') - 2} color="#ffffff" />
      <Note text="→ the cover" x={160} y={660} size={66} rot={-3} at={t.at('cover came') - 2} color={pal.subject} />
      <Arrow x1={560} y1={700} x2={1100} y2={640} bow={-50} at={t.at('cover came') + 2} />
      <Loop cx={1420} cy={600} rx={150} ry={60} at={t.at('knee to knee')} seed={9} />
      <Tag text="Norman Rockwell, “The Ouija Board,” Saturday Evening Post, May 1, 1920" />
    </Desk>
  );
};

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <ChapterTitle word="LOVE" title="KNEES TOUCHING" n={4} b={at('A lot') - 1} light="lamp" />],
    [at('A lot') - 1, <Couples t={t} />],
    [at('Dating') - 1, <Rules t={t} />],
    [at('Now look') - 1, <HowToPlay t={t} />],
    [at("It's a parlor") - 1, <Excuse t={t} />],
    [at('By 1920') - 1, <Craze t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['rules', 'alone together', 'Parents watched', 'Neighbors', 'Two people', 'Knees touching', 'Lights low', 'Fingertips', 'Does he', 'Will we', "who's going", 'Potsdam', 'knee to knee', 'cover came'];

export const Ch04: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch04_knees_touching.wav" lead={LEAD} music={[{src: 'music/j_good_feelings.mp3', volume: 0.28, startFrom: 240}]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {['Dating', 'Now look', "It's a parlor", 'By 1920'].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.22} />)}
      {['young couples', '1900', 'excuse', 'craze'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.3} />)}
      <Sfx at={at('says yes') - 14} src="sfx/scrape.wav" volume={0.2} />
      <Sfx at={at('says yes')} src="sfx/knock.wav" volume={0.35} />
      {[at('A lot') - 1, at('By 1920') - 1].map((f, i) => <Sfx key={`p${i}`} at={f} src="sfx/page_turn.wav" volume={0.3} />)}
    </ChapterShell>
  );
};
