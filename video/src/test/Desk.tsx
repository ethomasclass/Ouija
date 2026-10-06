// Shot 3: the desk. Cards land with weight (spring overshoot, contact shadow that tightens as the
// card touches down, real motion blur while falling), staggered a few frames apart. The camera keeps
// a slight handheld drift. Then a rack focus: the cards go soft and dark as the quote comes up,
// word by word, with marks drawn on twos.
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {CameraMotionBlur} from '@remotion/motion-blur';
import {clamp} from '../lib/anim';
import {FPS} from '../lib/theme';
import {DarkPaper} from '../kit/common';
import {Highlight, Note, Tag, useGFrame, usePal} from '../kit/Kit';
import {drift, Label} from './fx';
import {CUT2, END, sec} from './timing';

export const CARD1 = CUT2 + 2;
export const CARD2 = CARD1 + 5; // stagger
export const QUOTE = sec(19.6);
const LINE1 = ['answers', 'questions', 'about', 'the', 'past,', 'present', 'and', 'future', 'with', 'marvelous', 'accuracy.'];
const LINE2 = ['a', 'never-failing', 'amusement'];
const WPF = 7; // frames per word, about 3.4 words a second (reading pace)
export const LINE2_AT = QUOTE + LINE1.length * WPF + 14;
export const UNDER1 = QUOTE + LINE1.length * WPF + 2;
export const UNDER2 = LINE2_AT + LINE2.length * WPF + 2;
export const TAG1 = UNDER1 + 10;
export const TAG2 = UNDER2 + 10;

/** Frame at which a dropped card first touches the desk (springs overshoot, so contact is before 1). */
export const contact = (at: number) => at + 4;

const DropCard: React.FC<{src: string; x: number; y: number; w: number; rot: number; at: number}> = ({src, x, y, w, rot, at}) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const sp = spring({frame: f - at, fps: FPS, config: {stiffness: 260, damping: 15, mass: 0.9}});
  const air = 1 - Math.min(sp, 1); // height above the desk (0 = touching)
  const scale = 1 + air * 0.4 - Math.max(sp - 1, 0) * 0.6; // overshoot reads as a small squash on impact
  const r = rot + air * 7;
  const blur = 12 + air * 60, oy = 14 + air * 70, op = 0.7 - air * 0.35;
  return (
    <div style={{position: 'absolute', left: x, top: y - air * 60, width: w, transform: `scale(${scale}) rotate(${r}deg)`, opacity: Math.min(1, (f - at + 1) / 2)}}>
      <div style={{background: '#f4efe6', padding: w * 0.03, boxShadow: `0 ${oy}px ${blur}px rgba(0,0,0,${op}), 0 2px 3px rgba(0,0,0,${0.5 * (1 - air)})`}}>
        <Img src={staticFile(src)} style={{width: '100%', display: 'block', filter: 'grayscale(1) contrast(1.2)'}} />
      </div>
    </div>
  );
};

/** One word of the quote: rises in on its cue; `under` draws a marker underline beneath it (stepped). */
const Word: React.FC<{text: string; at: number; under?: {at: number; color: string; last?: boolean}}> = ({text, at, under}) => {
  const f = useCurrentFrame();
  const g = useGFrame();
  const k = interpolate(f, [at, at + 6], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const p = under ? interpolate(g, [under.at, under.at + 4], [0, 1], clamp) : 0;
  return (
    <span style={{position: 'relative', display: 'inline-block', paddingRight: '0.28em', color: '#f4efe6', opacity: k, transform: `translateY(${(1 - k) * 14}px)`}}>
      {text}
      {under && p > 0 && (
        <span style={{position: 'absolute', left: -3, bottom: -2, height: 7, borderRadius: 4, background: under.color, transformOrigin: 'left', transform: `rotate(${under.last ? -0.6 : 0.4}deg)`,
          width: under.last ? `calc(${p} * (100% - 0.28em + 6px))` : `calc(${p} * (100% + 6px))`}} />
      )}
    </span>
  );
};

/** A highlighter tag that sits in the text flow, right after the last word of a line. */
const InlineTag: React.FC<{text: string; at: number; rot: number; seed: number}> = ({text, at, rot, seed}) => (
  <span style={{position: 'relative', display: 'inline-block', width: 0, height: '1em', verticalAlign: 'top'}}>
    <Highlight text={text} x={18} y={-4} size={70} at={at} rot={rot} seed={seed} />
  </span>
);

export const Desk: React.FC<{labels: boolean}> = ({labels}) => {
  const f = useCurrentFrame();
  const pal = usePal();
  // settle out of the push-through (matched motion across the cut), then a slow push of our own
  const settle = interpolate(f, [CUT2, CUT2 + 16], [1.14, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const push = interpolate(f, [CUT2 + 16, END], [1, 1.05], clamp);
  const d = drift(f, 'desk', 3);
  // rack focus to the quote
  const focus = interpolate(f, [QUOTE - 8, QUOTE + 6], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const fade = interpolate(f, [END - 14, END], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#0d0c09', opacity: fade}}>
      <AbsoluteFill style={{transform: `translate(${d.x}px, ${d.y}px) rotate(${d.r}deg) scale(${settle * push})`}}>
        <DarkPaper />
        <AbsoluteFill style={{filter: `blur(${focus * 7}px) brightness(${1 - focus * 0.55})`}}>
          <CameraMotionBlur shutterAngle={200} samples={8}>
            <DropCard src="img/test/knockings.jpg" x={190} y={110} w={430} rot={-3.5} at={CARD1} />
          </CameraMotionBlur>
          <CameraMotionBlur shutterAngle={200} samples={8}>
            <DropCard src="img/test/fox_sisters.jpg" x={1290} y={150} w={430} rot={3} at={CARD2} />
          </CameraMotionBlur>
          <Note text="'discovery and explanation', 1851" x={180} y={890} size={46} rot={-3} at={CARD1 + 18} dur={12} />
          <Note text="the fox sisters, 1852" x={1300} y={905} size={46} rot={2} at={CARD2 + 22} dur={10} />
        </AbsoluteFill>
      </AbsoluteFill>

      {/* the quote is crisp and doesn't drift: it's the thing in focus */}
      {f >= QUOTE - 2 && (
        <AbsoluteFill>
          <div style={{position: 'absolute', left: 170, top: 330, width: 1580, fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 66, lineHeight: 1.3, textShadow: '0 3px 14px #000'}}>
            <span style={{color: '#f4efe6', opacity: interpolate(f, [QUOTE - 2, QUOTE + 4], [0, 1], clamp)}}>“</span>
            {LINE1.map((t, i) => <Word key={i} text={t} at={QUOTE + i * WPF} under={i >= LINE1.length - 2 ? {at: UNDER1 + (i - LINE1.length + 2) * 4, color: pal.subject, last: i === LINE1.length - 1} : undefined} />)}
            <InlineTag text="SPIRIT?" at={TAG1} rot={3} seed={5} />
          </div>
          <div style={{position: 'absolute', left: 170, top: 590, fontFamily: '"Playfair Display", serif', fontWeight: 900, fontSize: 66, lineHeight: 1.3, textShadow: '0 3px 14px #000'}}>
            {LINE2.map((t, i) => <Word key={i} text={i === LINE2.length - 1 ? t + '.”' : t} at={LINE2_AT + i * WPF} under={i >= 1 ? {at: UNDER2 + (i - 1) * 4, color: pal.mark, last: i === LINE2.length - 1} : undefined} />)}
            <InlineTag text="TOY?" at={TAG2} rot={-3} seed={8} />
          </div>
          <Tag text="Ouija advertisement, Pittsburgh, 1891 (as quoted by Smithsonian)" />
        </AbsoluteFill>
      )}
      <Label show={labels} text={f < QUOTE - 8 ? 'spring landings · contact shadows · motion blur · 5-frame stagger · handheld drift' : 'rack focus · word-by-word quote · underlines on twos'} />
    </AbsoluteFill>
  );
};
