// Chapter 5 · Patience Worth: St. Louis, July 8, 1913 → "Many moons ago I lived…" word by word → a woman from the
// 1600s (as readers imagined her) → four million words → most researchers: Pearl's own mind → one board, two stories.
import React from 'react';
import words from '../../public/audio/ch05_patience_worth.words.json';
import {Highlight, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {CountUp, Desk, DropCard, Layered, LOOK, SyncQuote} from '../kit/oj';
import {ChapterTitle} from '../kit/title';
import '../masks';

const N = words as Narration;
export const CH05_FRAMES = chapterFrames(N, LEAD);

const Serious: React.FC<{t: TL}> = ({t}) => (
  <Desk a={0}>
    <Note text="at the same time…" x={200} y={360} size={70} rot={-3} at={t.at('But at') + 2} color="#ffffff" />
    <Note text="dead seriously." x={420} y={520} size={96} rot={-3} at={t.at('dead seriously') - 2} />
  </Desk>
);

const Pearl: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Layered name="hands_1913_pearl" a={t.at('July') - 1} b={t.at('Many moons')} label="the same board: St. Louis, 1913 · Pearl Curran, Washington Times, 1920" look="warm" tint traceAt={t.at('pointer spells') - 2}
      cam={{z: [1.06, 1.2], x: [0.02, -0.02]}} depth={1.05} fx={[{kind: 'flicker', x: 200, y: 300, r: 800, strength: 0.75}]}>
      {g >= t.at('July') && <Highlight text="JULY 8, 1913" x={1240} y={110} size={88} at={t.at('July')} seed={3} rot={-2} />}
      <Note text="St. Louis" x={1280} y={260} size={60} rot={-3} at={t.at('St.') - 2} color="#ffffff" />
      <DropCard src="img/arch/pearl_curran_1920.jpg" x={1520} y={330} w={290} rot={3} at={t.at('Pearl Curran') - 2} />
      <Note text="Pearl Curran" x={1160} y={930} size={56} rot={-3} at={t.at('Pearl Curran')} />
    </Layered>
  );
};

const Moons: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Desk a={t.at('Many moons') - 1}>
      <SyncQuote t={t} phrase="Many moons ago I lived. Again I come. Patience Worth my name." x={220} y={300} w={1480} size={92} marks={{9: pal.subject, 10: pal.subject}} />
      <Note text="the pointer spelled it out" x={240} y={180} size={50} rot={-3} at={t.at('Many moons') - 4} color="#ffffff" />
    </Desk>
  );
};

const Imagined: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Layered name="ch05_patience_imagined" a={t.at('Patience said') - 1} b={t.at('Over the next')} label="how readers imagined “Patience Worth”" look="warm"
      cam={{z: [1.03, 1.14], x: [0.05, 0.1]}} fx={[{kind: 'flicker', x: 1550, y: 650, r: 500, strength: 0.6}]}>
      {g >= t.at('1600s') && <Highlight text="AN ENGLISHWOMAN, 1600s" x={110} y={120} size={80} at={t.at('1600s')} seed={6} rot={-2} />}
      <Note text="(how readers imagined her)" x={130} y={900} size={50} rot={-3} at={t.at('Patience said') + 6} color="#ffffff" />
    </Layered>
  );
};

const Output: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  const a = t.at('Over the next') - 1;
  return (
    <Desk a={a}>
      <DropCard src="img/arch/patience_worth_book.jpg" x={1260} y={140} w={480} rot={3} at={a + 2} />
      <Note text="24 years" x={150} y={150} size={64} rot={-3} at={t.at('twenty-four') - 2} color="#ffffff" />
      <CountUp x={140} y={300} to={4000000} at={t.at('four million') - 2} dur={36} size={160} color={pal.subject} />
      <Note text="words" x={170} y={480} size={70} rot={-3} at={t.at('words') - 2} />
      <Note text="novels · plays · thousands of poems" x={150} y={620} size={56} rot={-3} at={t.at('Novels') - 2} color="#ffffff" />
      <Note text="most researchers: Pearl's own mind" x={150} y={780} size={56} rot={-3} at={t.at('Most researchers') - 2} />
      <Note text="her readers: proof." x={170} y={900} size={70} rot={-3} at={t.at('proof') - 4} color={pal.subject} />
      <Tag text="Casper Yost, Patience Worth: A Psychic Mystery (1916) · Internet Archive" />
    </Desk>
  );
};

const TwoStories: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('So the same') - 1;
  const pal = usePal();
  return (
    <Desk a={a}>
      <DropCard src="img/gen/hands_1920_couple.jpg" x={120} y={220} w={800} rot={-2} at={a} filter={LOOK.warm} />
      <DropCard src="img/gen/hands_1913_pearl.jpg" x={1000} y={260} w={800} rot={2} at={t.at('in St.') - 2} filter={LOOK.warm} />
      <Note text="a flirting game" x={220} y={130} size={64} rot={-3} at={t.at('flirting') - 2} />
      <Note text="a doorway" x={1120} y={150} size={64} rot={-3} at={t.at('doorway') - 2} color={pal.subject} />
      <Note text="to a voice from 300 years ago" x={1060} y={830} size={50} rot={-3} at={t.at('voice from') - 2} color="#ffffff" />
      <Tag text="Illustrations · the same board, two parlors" />
    </Desk>
  );
};

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <ChapterTitle word="WORTH" title="PATIENCE WORTH" n={5} b={at('dead seriously') - 6} light="candle" />],
    [at('dead seriously') - 6, <Serious t={t} />],
    [at('July') - 1, <Pearl t={t} />],
    [at('Many moons') - 1, <Moons t={t} />],
    [at('Patience said') - 1, <Imagined t={t} />],
    [at('Over the next') - 1, <Output t={t} />],
    [at('So the same') - 1, <TwoStories t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['St.', 'Pearl Curran', 'twenty-four', 'words', 'Novels', 'Most researchers', 'proof', 'flirting', 'doorway', 'voice from'];

export const Ch05: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch05_patience_worth.wav" lead={LEAD} music={[{src: 'music/j_cold_open.mp3', volume: 0.27}]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {['July', 'Many moons', 'Patience said', 'Over the next', 'So the same'].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.2} />)}
      {['July', '1600s'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.28} />)}
      {['Pearl Curran', 'So the same'].map((c) => <Sfx key={c} at={at(c) - 1} src="sfx/page_turn.wav" volume={0.3} />)}
    </ChapterShell>
  );
};
