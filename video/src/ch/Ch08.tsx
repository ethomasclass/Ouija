// Chapter 8 · Captain Howdy: 1949 (the case that inspired the book) → The Exorcist, 1973 → lines around the block →
// Murch: "No one was afraid of showers…" → the movie didn't invent the fear, it handed it to everyone → the twist:
// the toy company made a horror movie about its own toy.
import React from 'react';
import words from '../../public/audio/ch08_captain_howdy.words.json';
import {Highlight, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {CountUp, Desk, Layered, SyncQuote} from '../kit/oj';
import {ChapterTitle} from '../kit/title';
import '../masks';

const N = words as Narration;
export const CH08_FRAMES = chapterFrames(N, LEAD);

const House1949: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Layered name="ch08_1949_house" a={t.at('In 1949') - 6} b={t.at('In December')} label="a house outside Washington, 1949" look="night" tint traceAt={t.at('teenage boy') - 2}
      cam={{z: [1.03, 1.2], x: [0.0, 0.06], y: [0.0, -0.04]}} depth={1.03} fx={[{kind: 'snow'}, {kind: 'film'}]}>
      {g >= t.at('1949') && <Highlight text="1949" x={110} y={120} size={110} at={t.at('1949')} seed={2} rot={-2} />}
      <Note text="an exorcism. a teenage boy." x={110} y={300} size={54} rot={-3} at={t.at('priests performed') - 2} color="#ffffff" />
      <Note text="some accounts: his aunt's Ouija board" x={110} y={860} size={52} rot={-3} at={t.at('According') - 2} />
      <Note text="a Georgetown student read about it:" x={1000} y={120} size={48} rot={-3} at={t.at('Georgetown') - 2} color="#ffffff" />
      <Note text="William Peter Blatty" x={1080} y={220} size={64} rot={-3} at={t.at('William Peter') - 2} />
    </Layered>
  );
};

const Exorcist: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Layered name="hands_1973_alone" a={t.at('In December') - 1} b={t.at('People lined')} label="the same board: a basement, 1973" look="night" tint traceAt={t.at('plays with') - 2}
      cam={{z: [1.2, 1.04]}} depth={1.05} fx={[{kind: 'dust', x: 600, y: 0, w: 700, h: 600}, {kind: 'film'}]}>
      {g >= t.at('The Exorcist') && <Highlight text="THE EXORCIST · 1973" x={110} y={110} size={84} at={t.at('The Exorcist')} seed={4} rot={-2} />}
      <Note text="alone, in the basement" x={130} y={280} size={56} rot={-3} at={t.at('plays with') - 2} color="#ffffff" />
      <div style={{position: 'absolute', left: 0, top: 760, width: 1920, height: 320, background: 'linear-gradient(180deg, transparent, rgba(5,4,3,0.85) 45%)'}} />
      <SyncQuote t={t} phrase="I make the questions," x={140} y={880} w={800} size={60} />
      <SyncQuote t={t} phrase="and he does the answers." x={900} y={880} w={900} size={60} marks={{2: pal.subject, 4: pal.subject}} />
    </Layered>
  );
};

const Line: React.FC<{t: TL}> = ({t}) => (
  <Layered name="ch08_theater_line" a={t.at('People lined') - 1} b={t.at('The Ouija historian')} label="a movie line, winter 1973" look="night" traceAt={t.at('around the block') - 2}
    cam={{z: [1.04, 1.14], x: [-0.02, 0.04]}} depth={1.04} fx={[{kind: 'steam', x: 720, y: 760}, {kind: 'snow'}, {kind: 'film'}]}>
    <Note text="lines around the block" x={1100} y={120} size={60} rot={-3} at={t.at('around the block') - 2} />
    <Note text="one of the biggest movies ever made" x={1000} y={240} size={50} rot={-3} at={t.at('biggest') - 2} color="#ffffff" />
  </Layered>
);

/** Murch's Psycho line, with a shower curtain drawn in teal. */
const Murch: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const a = t.at('No one');
  const p = Math.max(0, Math.min(1, (g - a) / 14));
  return (
    <Desk a={t.at('The Ouija historian') - 1}>
      <Note text="Robert Murch, Ouija historian:" x={150} y={150} size={56} rot={-3} at={t.at('The Ouija historian')} color="#ffffff" />
      <SyncQuote t={t} phrase="No one was afraid of showers until that scene." x={150} y={320} w={1050} size={78} marks={{3: pal.subject, 4: pal.subject, 5: pal.subject}} />
      <svg style={{position: 'absolute', left: 0, top: 0}} width={1920} height={1080}>
        <line x1={1300} y1={200} x2={1300 + 420 * p} y2={200} stroke={pal.mark} strokeWidth={7} strokeLinecap="round" />
        {Array.from({length: 8}).map((_, i) => p > i / 8 && <circle key={i} cx={1320 + i * 54} cy={212} r={12} fill="none" stroke={pal.mark} strokeWidth={5} />)}
        {Array.from({length: 7}).map((_, i) => p > 0.3 + i / 12 && (
          <path key={`c${i}`} d={`M${1330 + i * 58},225 q-18,140 0,280 q18,140 0,280`} fill="none" stroke={pal.mark} strokeWidth={5} strokeLinecap="round" opacity={0.85} />
        ))}
      </svg>
      <Note text="(Psycho, 1960)" x={1360} y={850} size={50} rot={-3} at={t.at('Psycho') - 2} color="#ffffff" />
    </Desk>
  );
};

const Fear: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Desk a={t.at("The Exorcist didn't") - 1}>
      <Note text="it didn't invent the fear" x={150} y={150} size={66} rot={-3} at={t.at("didn't invent") - 2} color="#ffffff" />
      <Note text="religious warnings, for decades" x={170} y={290} size={56} rot={-3} at={t.at('Some religious') - 2} />
      <Note text="it handed that fear to everyone at once" x={170} y={430} size={60} rot={-3} at={t.at('hand that') - 2} color="#ffffff" />
      {g >= t.at('One story') && <Highlight text="ONE STORY." x={200} y={620} size={110} at={t.at('One story')} seed={7} rot={-2} />}
      {g >= t.at('a villain') && <div style={{position: 'absolute', left: 980, top: 640, fontFamily: '"Abril Fatface", serif', fontSize: 110, color: pal.subject, textShadow: '0 6px 22px rgba(0,0,0,0.8)'}}>AND A VILLAIN.</div>}
    </Desk>
  );
};

const Twist: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Desk a={t.at("But here's") - 1}>
      {g >= t.at('twist') && <Highlight text="THE TWIST" x={140} y={110} size={96} at={t.at('twist')} seed={9} rot={-2} />}
      <Note text="who kept selling the fear?" x={160} y={290} size={58} rot={-3} at={t.at('Who kept') - 2} color="#ffffff" />
      <Note text="2014: a horror movie called Ouija" x={160} y={410} size={58} rot={-3} at={t.at('In 2014') - 2} />
      <Note text="made by… Hasbro" x={160} y={530} size={66} rot={-3} at={t.at('Hasbro') - 2} color={pal.subject} />
      <Note text="(who owns Parker Brothers)" x={200} y={640} size={50} rot={-3} at={t.at('which owns') - 2} color="#ffffff" />
      <CountUp x={1060} y={380} to={100000000} prefix="$" suffix="+" at={t.at('hundred million') - 6} dur={24} size={110} color="#f4efe6" />
      <Note text="the toy company made a horror movie" x={160} y={820} size={60} rot={-3} at={t.at('The toy company') - 2} />
      <Note text="about its own toy." x={260} y={930} size={76} rot={-3} at={t.at('its own toy') - 2} color={pal.subject} />
      <Tag text="Ouija (2014), Universal / Platinum Dunes / Blumhouse / Hasbro Studios · box office: Box Office Mojo" />
    </Desk>
  );
};

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <ChapterTitle word="HOWDY" title="CAPTAIN HOWDY" n={8} b={at('priests performed') - 6} light="bulb" />],
    [at('priests performed') - 6, <House1949 t={t} />],
    [at('In December') - 1, <Exorcist t={t} />],
    [at('People lined') - 1, <Line t={t} />],
    [at('The Ouija historian') - 1, <Murch t={t} />],
    [at("The Exorcist didn't") - 1, <Fear t={t} />],
    [at("But here's") - 1, <Twist t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['priests performed', 'According', 'Georgetown', 'William Peter', 'plays with', 'around the block', 'biggest', 'The Ouija historian', 'Psycho', "didn't invent", 'Some religious',
  'hand that', 'Who kept', 'In 2014', 'Hasbro', 'which owns', 'The toy company', 'its own toy'];

export const Ch08: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch08_captain_howdy.wav" lead={LEAD} music={[
      {src: 'music/r_spirits_dark.mp3', volume: 0.13, to: at("But here's") + 6, fadeOut: 16},
      {src: 'music/j_gossip.mp3', volume: 0.3, from: at("But here's") - 4, startFrom: 240},
    ]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {['In December', 'People lined', 'The Ouija historian', "The Exorcist didn't", "But here's"].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.22} />)}
      {['1949', 'The Exorcist', 'One story', 'twist'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.3} />)}
      <Sfx at={at('a villain')} src="sfx/boom.wav" volume={0.25} />
    </ChapterShell>
  );
};
