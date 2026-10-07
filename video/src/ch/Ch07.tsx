// Chapter 7 · Next to Monopoly: 1966, Parker Brothers (in Salem!) → toy-store shelves; 1967 outsells Monopoly →
// sleepovers: kids playing to get scared → "the perfect setup" (played dry).
import React from 'react';
import {interpolate} from 'remotion';
import words from '../../public/audio/ch07_next_to_monopoly.words.json';
import {clamp} from '../lib/anim';
import {Highlight, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {CountUp, Desk, DropCard, Layered} from '../kit/oj';
import {ChapterTitle} from '../kit/title';
import '../masks';

const N = words as Narration;
export const CH07_FRAMES = chapterFrames(N, LEAD);

const Parker: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Desk a={t.at('In 1966') - 1}>
      {g >= t.at('1966') && <Highlight text="1966" x={140} y={130} size={110} at={t.at('1966')} seed={2} rot={-2} />}
      <Note text="the Fuld family sells to…" x={150} y={330} size={56} rot={-3} at={t.at('Fuld family') - 2} color="#ffffff" />
      {g >= t.at('Parker Brothers') && <Highlight text="PARKER BROTHERS" x={150} y={430} size={96} at={t.at('Parker Brothers')} seed={3} rot={-2} />}
      <Note text="(the Monopoly company)" x={170} y={600} size={56} rot={-3} at={t.at('The Monopoly') - 2} />
      <Note text="Salem, Massachusetts" x={170} y={720} size={60} rot={-3} at={t.at('Salem,') - 2} color="#ffffff" />
      <DropCard src="img/arch/salem_witch_1892.jpg" x={1150} y={140} w={600} rot={3} at={t.at('that Salem') - 4} />
      <Note text="yes, that Salem. (1692)" x={1140} y={900} size={64} rot={-4} at={t.at('that Salem') - 2} color={pal.subject} />
      <Tag text="“The Witch No. 1,” lithograph, Joseph E. Baker, 1892 · Library of Congress" />
    </Desk>
  );
};

const Shelves: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Layered name="ch07_toy_aisle" a={t.at('Now it') - 1} b={t.at('But look')} label="a toy aisle, 1967" look="color" tint traceAt={t.at('next to') - 2}
      cam={{z: [1.04, 1.15], x: [0.04, 0.08]}} fx={[{kind: 'film'}]}>
      <Note text="next to Monopoly and Clue" x={110} y={120} size={56} rot={-3} at={t.at('next to') - 2} color="#ffffff" />
      {g >= t.at('In 1967') && (
        <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, background: `rgba(8,6,4,${interpolate(g, [t.at('In 1967'), t.at('In 1967') + 8], [0, 0.72], clamp)})`}}>
          <CountUp x={160} y={380} to={2000000} at={t.at('outsold') - 4} dur={24} size={150} color={pal.subject} />
          <Note text="boards sold" x={180} y={560} size={66} rot={-3} at={t.at('outsold')} />
          {g >= t.at('outsold') + 4 && <Highlight text="MORE THAN MONOPOLY" x={160} y={720} size={96} at={t.at('outsold') + 4} seed={6} rot={-2} />}
          {g >= t.at('In 1967') && <Highlight text="1967" x={160} y={160} size={110} at={t.at('In 1967')} seed={5} rot={-2} />}
        </div>
      )}
    </Layered>
  );
};

const Sleepover: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Layered name="ch07_sleepover" a={t.at('But look') - 1} b={t.at("They're not")} label="a sleepover, 1967" look="warm" tint traceAt={t.at('Kids at') - 2}
      cam={{z: [1.05, 1.22], x: [0.0, -0.04], y: [0.0, 0.06]}} fx={[{kind: 'beam', x: 560, y: 760, angle: [-40, 10]}, {kind: 'film'}]}>
      <Note text="who's playing now?" x={110} y={120} size={60} rot={-3} at={t.at('But look') + 2} color="#ffffff" />
      <Note text="kids at sleepovers" x={1180} y={140} size={60} rot={-3} at={t.at('Kids at') - 2} />
      <Note text="“is anybody there?”" x={1150} y={860} size={72} rot={-4} at={t.at('Is anybody') - 2} color={pal.subject} />
    </Layered>
  );
};

const Kids: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Layered name="hands_1967_kids" a={t.at("They're not") - 1} b={t.at('Which made')} label="the same board: a sleepover, 1967" look="warm" tint traceAt={t.at('get scared') - 2}
      cam={{z: [1.15, 1.04]}} depth={1.05} fx={[{kind: 'beam', x: 1500, y: 1100, angle: [-60, -20]}, {kind: 'film'}]}>
      <Note text="not to reach Grandpa" x={1250} y={130} size={56} rot={-3} at={t.at('reach Grandpa') - 2} color="#ffffff" />
      <Note text="to get scared" x={1290} y={250} size={70} rot={-3} at={t.at('get scared') - 2} color={pal.subject} />
      <Note text="spooky = the point" x={110} y={880} size={60} rot={-3} at={t.at('side effect') - 2} />
      {g >= t.at("It's the point") && <Highlight text="THE POINT" x={1250} y={830} size={110} at={t.at("It's the point")} seed={8} rot={-3} />}
    </Layered>
  );
};

const Setup: React.FC<{t: TL}> = ({t}) => (
  <Desk a={t.at('Which made') - 1}>
    <Note text="…the perfect setup." x={480} y={460} size={100} rot={-3} at={t.at('perfect setup') - 2} color="#ffffff" />
  </Desk>
);

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <ChapterTitle word="TOY" title="NEXT TO MONOPOLY" n={7} b={at('Fuld family') - 4} light="day" />],
    [at('Fuld family') - 4, <Parker t={t} />],
    [at('Now it') - 1, <Shelves t={t} />],
    [at('But look') - 1, <Sleepover t={t} />],
    [at("They're not") - 1, <Kids t={t} />],
    [at('Which made') - 1, <Setup t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['Fuld family', 'The Monopoly', 'Salem,', 'that Salem', 'next to', 'Kids at', 'Is anybody', 'reach Grandpa', 'get scared', 'side effect', 'perfect setup'];

export const Ch07: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch07_next_to_monopoly.wav" lead={LEAD} music={[{src: 'music/r_schools.mp3', volume: 0.13, to: at('Which made') + 4, fadeOut: 10}]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {['Now it', 'But look', "They're not", 'Which made'].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.22} />)}
      {['1966', 'Parker Brothers', 'In 1967', "It's the point"].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.3} />)}
      <Sfx at={at('that Salem') - 4} src="sfx/page_turn.wav" volume={0.3} />
    </ChapterShell>
  );
};
