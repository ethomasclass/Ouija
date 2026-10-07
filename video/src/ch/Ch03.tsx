// Chapter 3 · Good Luck: Baltimore, 1890 → the name (the board spells O-U-I-J-A) → the locket → the patent-office
// legend → the patent itself ("Toy or Game") → the first ad → toy or spirit? → William Fuld → the subscribe plug.
import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import words from '../../public/audio/ch03_good_luck.words.json';
import {clamp} from '../lib/anim';
import {Arrow, Highlight, JF, Loop, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {Sfx, WRITE} from '../kit/common';
import {ChapterShell, chapterFrames, Definition, LEAD, makeTimeline, type Narration, type TL, useScene} from '../kit/shell';
import {Desk, DropCard, Layered, LOOK, SrcView, SyncQuote} from '../kit/oj';
import {BoardShot, landings, spell} from '../kit/board3d';
import {ChapterTitle} from '../kit/title';
import '../masks';

const N = words as Narration;
export const CH03_FRAMES = chapterFrames(N, LEAD);

const Workshop: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  return (
    <Layered name="ch03_novelty_workshop" a={t.at('Charles') - 4} b={t.at('They need')} label="a Baltimore workshop, 1890" look="warm" cam={{z: [1.06, 1.18], x: [0.04, -0.04]}}
      fx={[{kind: 'dust', x: 1100, y: 60, w: 700, h: 700}]}>
      <Note text="Charles Kennard" x={110} y={150} size={56} rot={-3} at={t.at('Charles') - 2} color="#ffffff" />
      <Note text="+ Elijah Bond, lawyer" x={130} y={250} size={56} rot={-3} at={t.at('Elijah') - 2} color="#ffffff" />
      {g >= t.at('Novelty Company') && <Highlight text="KENNARD NOVELTY CO." x={110} y={820} size={84} at={t.at('Novelty Company')} seed={4} rot={-2} />}
      <Definition term="novelty" def="a cheap little toy or gadget" at={t.at('As in') - 2} x={1080} y={150} w={760} />
    </Layered>
  );
};

/** The board names itself: O-U-I-J-A, then "good luck". */
const NAME_AT = (t: TL) => t.at('O-U-I-J-A');
const Name: React.FC<{t: TL}> = ({t}) => {
  const a = t.at('They need') - 1;
  const s0 = NAME_AT(t);
  const moves = spell('OUIJA', s0 - 2, 6);
  const g = useGFrame();
  const pal = usePal();
  return (
    <BoardShot a={a} b={t.at('Helen, it') } cam="close" light="candle" moves={moves} start={{x: 1024, y: 760}} rings={landings(moves).map((l) => ({at: l.f, key: l.key}))}>
      <Note text="“what should we call you?”" x={120} y={130} size={56} rot={-3} at={t.at('asked the') - 2} color="#ffffff" />
      <Note text="Helen Peters, “a strong medium”" x={120} y={900} size={48} rot={-2} at={t.at('Helen Peters') - 2} />
      {g >= s0 && <div style={{position: 'absolute', left: 1140, top: 120, padding: '6px 30px', background: 'rgba(8,6,4,0.75)', fontFamily: JF.display, fontSize: 120, color: '#FF9F1C', letterSpacing: 18}}>
        {'OUIJA'.slice(0, Math.max(0, Math.min(5, Math.floor((g - s0 + 6) / 6))))}</div>}
      {g >= t.at('good luck') && <Highlight text="“GOOD LUCK”" x={1140} y={820} size={96} at={t.at('good luck')} seed={8} rot={-3} />}
      <Tag text="3D reconstruction" />
    </BoardShot>
  );
};

const Locket: React.FC<{t: TL}> = ({t}) => {
  const pal = usePal();
  return (
    <Layered name="ch03_locket" a={t.at('Helen, it') - 1} b={t.at('Then came')} label="a Victorian locket" look="warm" tint traceAt={t.at('locket') - 2}
      cam={{z: [1.05, 1.3], x: [0, 0.04], y: [0, 0.02]}} fx={[{kind: 'flicker', x: 900, y: 300, r: 700, strength: 0.6}]}>
      <Note text="Ouija" x={1080} y={500} size={100} rot={-8} at={t.at('the name') - 2} color={pal.subject} />
      <Note text="Ouida? a popular novelist" x={1080} y={180} size={52} rot={-3} at={t.at('Ouida') - 2} color="#ffffff" />
      <Note text="…the spirits read her necklace." x={160} y={880} size={66} rot={-3} at={t.at('read her') - 2} />
    </Layered>
  );
};

const Legend: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  return (
    <Layered name="ch03_patent_office" a={t.at('Then came') - 1} b={t.at('Did that')} label="the patent-office legend" tint traceAt={t.at('spells his') - 2}
      cam={{z: [1.04, 1.2], x: [0.06, 0.08], y: [0.0, 0.08]}} fx={[{kind: 'dust', x: 200, y: 0, w: 700, h: 700}]}>
      <Note text="the company's favorite legend" x={110} y={120} size={56} rot={-3} at={t.at('favorite legend') - 2} color="#ffffff" />
      <Note text="“spell my name.”" x={1180} y={180} size={76} rot={-4} at={t.at('spell the') - 2} />
      {g >= t.at('February') && <Highlight text="FEB. 10, 1891" x={1100} y={840} size={92} at={t.at('February')} seed={12} rot={-2} />}
      <Note text="patent granted" x={1150} y={760} size={56} rot={-3} at={t.at('Patent granted') - 2} color={pal.subject} />
    </Layered>
  );
};

const PT = 'img/arch/patent_446054.jpg';
const PT_TEXT = 'img/arch/patent_446054_text.jpg';
const Patent: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const at = t.at;
  return (
    <Desk a={at('Did that') - 1}>
      <SrcView src={PT} size={[2042, 3000]} card keys={[[at('Did that'), 2700, 1500, 0.3], [at('what we know') - 2, 2500, 1200, 0.32], [at("It's filed") - 2, 1800, 560, 0.5]]}>
        {(sw) => (
          <>
            <Loop cx={860} cy={352} rx={175} ry={48} at={at("It's filed")} width={sw(7)} seed={21} />
            <Loop cx={1150} cy={420} rx={235} ry={42} at={at('what we know')} width={sw(6)} seed={22} />
          </>
        )}
      </SrcView>
      <Note text="only the inventors' word" x={1120} y={140} size={48} rot={-3} at={at('inventors') - 2} color="#ffffff" />
      <Note text="the patent itself:" x={1180} y={300} size={58} rot={-3} at={at('what we know') - 2} />
      <Note text="not one word about spirits" x={1110} y={420} size={46} rot={-3} at={at("doesn't say") - 2} color="#ffffff" />
      {g >= at("It's filed") + 4 && <Highlight text="“TOY OR GAME”" x={1100} y={820} size={100} at={at("It's filed") + 4} seed={23} rot={-3} />}
      <Tag text="E. J. Bond, U.S. Patent 446,054, “Toy or Game,” Feb. 10, 1891 · USPTO" />
    </Desk>
  );
};

const AD = 'img/arch/ad_pittsburgh_1891.jpg';
const Ad: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const pal = usePal();
  const g = useGFrame();
  return (
    <Desk a={at('And the first') - 1}>
      <SrcView src={AD} size={[680, 2550]} card keys={[[at('And the first'), 2000, 1270, 0.42], [at('about the') - 4, 1355, 1420, 0.62], [at('Price') - 6, 1355, 1900, 0.62]]}>
        {(sw) => (
          <>
            <Loop cx={345} cy={1415} rx={340} ry={52} at={at('marvelous') - 2} width={sw(6)} seed={31} color={pal.subject} />
            <Loop cx={470} cy={1458} rx={235} ry={34} at={at('never-failing') - 2} width={sw(6)} seed={32} />
            <Loop cx={340} cy={2072} rx={215} ry={44} at={at('Price') - 2} width={sw(6)} seed={33} color={pal.subject} />
          </>
        )}
      </SrcView>
      <SyncQuote t={t} phrase="about the past, present and future with marvelous accuracy." x={660} y={170} w={1180} size={60} marks={{6: pal.subject, 7: pal.subject}} />
      <SyncQuote t={t} phrase="a never-failing amusement." x={660} y={500} w={1180} size={60} marks={{1: pal.mark, 2: pal.mark}} />
      {g >= at('Price') && <Highlight text="$1.49" x={700} y={760} size={130} at={at('Price')} seed={34} rot={-3} />}
      <Tag text="Danziger's advertisement, Pittsburg Dispatch, 1891 · Library of Congress, Chronicling America" />
    </Desk>
  );
};

const ToyOrSpirit: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const at = t.at;
  return (
    <Desk a={at('Hold that') - 1}>
      <Note text="hold that thought:" x={200} y={180} size={60} rot={-3} at={at('Hold that')} color="#ffffff" />
      {g >= at('Toy or spirit') && <Highlight text="TOY?" x={330} y={420} size={170} at={at('Toy or spirit')} seed={41} rot={-3} />}
      {g >= at('spirit?') && <Highlight text="SPIRIT?" x={960} y={480} size={170} at={at('spirit?')} seed={42} rot={2} />}
      <Note text="even the sellers wouldn't say" x={520} y={820} size={58} rot={-3} at={at('Even the') - 2} />
    </Desk>
  );
};

const FULD = 'img/arch/fuld_article_1920.jpg';
const Fuld: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const pal = usePal();
  return (
    <Desk a={at('Soon a') - 1}>
      <SrcView src={FULD} size={[1550, 1265]} card keys={[[at('Soon a'), 1600, 760, 0.55], [at('asked if') - 4, 1650, 900, 0.62]]}>
        {(sw) => (
          <>
            <Loop cx={700} cy={95} rx={720} ry={110} at={at('William Fuld') - 2} width={sw(6)} seed={52} />
            <Loop cx={1068} cy={1030} rx={330} ry={58} at={at('I should') - 2} width={sw(6)} seed={53} color={pal.subject} />
          </>
        )}
      </SrcView>
      <Note text="William Fuld, “Ouija Board King”" x={990} y={150} size={48} rot={-3} at={at('William Fuld') - 2} />
      <Note text="“do you believe in it?”" x={1000} y={270} size={52} rot={-3} at={at('asked if') - 2} color="#ffffff" />
      <SyncQuote t={t} phrase="I should say not. I'm no spiritualist. I'm a Presbyterian." x={1000} y={400} w={860} size={64} marks={{7: pal.subject, 8: pal.subject}} />
      <Tag text="“Ouija Board King Scorns Spooks—He's a Presbyterian,” Evening Star, July 4, 1920 · Library of Congress" />
    </Desk>
  );
};

/** The subscribe plug: the planchette spells SUBSCRIBE, lands on YES; then "that's my hand". */
const SUB = (t: TL) => spell('SUBSCRIBE', t.at('subscribe') - 4, 5);
const Subscribe: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const at = t.at;
  const m = SUB(t);
  const last = m[m.length - 1].f + m[m.length - 1].dur;
  const moves = [...m, {f: last + 4, to: 'YES', dur: 8}];
  const hand = at("That's my");
  return (
    <BoardShot a={at('Quick thing') - 1} b={chapterFrames(N, 0)} cam="top" light="lamp" moves={moves} start={{x: 1024, y: 900}} rings={[{at: last + 12, key: 'YES'}]}>
      {g >= last + 12 && (
        <div style={{position: 'absolute', left: 1180, top: 330, display: 'flex', alignItems: 'center', gap: 16, background: '#cc1f1f', padding: '18px 36px', borderRadius: 10,
          transform: `rotate(-3deg) scale(${interpolate(g, [last + 12, last + 15, last + 18], [1.35, 0.95, 1], clamp)})`, boxShadow: '0 10px 30px rgba(0,0,0,0.6)'}}>
          <div style={{fontFamily: JF.sans, fontWeight: 800, fontSize: 64, color: '#fff', letterSpacing: 2}}>SUBSCRIBE</div>
        </div>
      )}
      <Note text="see? it's spelling it out." x={1150} y={140} size={52} rot={-3} at={at('See?') - 2} color="#ffffff" />
      <Loop cx={690} cy={245} rx={120} ry={95} at={hand} seed={51} width={7} />
      <Note text="(ok, that was me)" x={560} y={400} size={66} rot={-4} at={hand + 4} />
      <Note text="it really helps the channel" x={1150} y={900} size={50} rot={-3} at={at('really does') - 2} color="#ffffff" />
    </BoardShot>
  );
};

const Body: React.FC<{t: TL}> = ({t}) => {
  const at = t.at;
  const cuts: [number, React.ReactNode][] = [
    [0, <ChapterTitle word="LUCK" title="GOOD LUCK" n={3} b={at('Charles') - 4} light="lamp" />],
    [at('Charles') - 4, <Workshop t={t} />],
    [at('They need') - 1, <Name t={t} />],
    [at('Helen, it') - 1, <Locket t={t} />],
    [at('Then came') - 1, <Legend t={t} />],
    [at('Did that') - 1, <Patent t={t} />],
    [at('And the first') - 1, <Ad t={t} />],
    [at('Hold that') - 1, <ToyOrSpirit t={t} />],
    [at('Soon a') - 1, <Fuld t={t} />],
    [at('Quick thing') - 1, <Subscribe t={t} />],
  ];
  return <>{useScene(cuts)}</>;
};

const notes = ['Charles', 'Elijah', 'asked the', 'Helen Peters', 'Ouida', 'read her', 'favorite legend', 'spell the', 'Patent granted', 'inventors', 'what we know', "doesn't say",
  'Hold that', 'Even the', 'William Fuld', 'asked if', 'See?', 'really does'];

export const Ch03: React.FC = () => {
  const t = makeTimeline(N, 24);
  const at = t.at;
  return (
    <ChapterShell n={N} audio="audio/ch03_good_luck.wav" lead={LEAD} music={[{src: 'music/a_price.mp3', volume: 0.2}]}>
      <Body t={t} />
      {notes.map((c) => <Sfx key={c} at={at(c) - 2} src={WRITE.src} volume={WRITE.volume} />)}
      {['They need', 'Helen, it', 'Then came', 'Did that', 'And the first', 'Hold that', 'Soon a', 'Quick thing'].map((c) => <Sfx key={c} at={at(c) - 2} src="sfx/whoosh.wav" volume={0.22} />)}
      {['Novelty Company', 'good luck', 'February', 'Toy or spirit', 'spirit?', 'Price'].map((c) => <Sfx key={c} at={at(c)} src="sfx/stamp.wav" volume={0.3} />)}
      <Sfx at={at("It's filed") + 4} src="sfx/stamp.wav" volume={0.35} />
      {landings(spell('OUIJA', NAME_AT(t) - 2, 6)).map((l, i) => <Sfx key={`o${i}`} at={l.f - 1} src="sfx/marker_tick.wav" volume={0.18} />)}
      {[at('Soon a'), at('Did that')].map((f, i) => <Sfx key={`p${i}`} at={f} src="sfx/page_turn.wav" volume={0.3} />)}
      {landings(SUB(t)).map((l, i) => <Sfx key={`s${i}`} at={l.f - 1} src="sfx/marker_tick.wav" volume={0.16} />)}
    </ChapterShell>
  );
};
