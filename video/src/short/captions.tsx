// Burned-in captions for Shorts (most are watched muted): two to four words at a time, in the channel's
// display face, the word being spoken set in the orange highlight box. Timed off the narration's words.json.
import React from 'react';
import {interpolate, random} from 'remotion';
import {clamp} from '../lib/anim';
import {boxOf, JF, useGFrame, usePal} from '../kit/Kit';
import type {TL} from '../kit/shell';

/** The 9:16 safe area: clear of YouTube's top bar, the right-hand buttons and the title/description at the bottom. */
export const SAFE = {x: 70, w: 860, top: 250, cap: 1290, tag: 1480};

type Group = {words: {w: string; a: number; b: number}[]; a: number; b: number};

const groups = (t: TL): Group[] => {
  const out: Group[] = [];
  let cur: Group['words'] = [];
  const f = (s: number) => Math.round(s * t.fps);
  t.words.forEach((wd, i) => {
    const text = wd.w.replace(/[.,:;!"“”]+$/g, '').replace(/^["“]/, '');
    cur.push({w: text, a: f(wd.s), b: f(wd.e)});
    const len = cur.reduce((n, c) => n + c.w.length + 1, 0);
    const next = t.words[i + 1];
    const brk = /[.,:;?!]["”]?$/.test(wd.w) || cur.length >= 4 || len >= 16 || !next || next.s - wd.e > 0.35;
    if (brk) {
      out.push({words: cur, a: cur[0].a, b: 0});
      cur = [];
    }
  });
  out.forEach((g, i) => (g.b = i + 1 < out.length ? Math.min(out[i + 1].a, g.words[g.words.length - 1].b + 10) : g.words[g.words.length - 1].b + 10));
  return out;
};

export const Captions: React.FC<{t: TL}> = ({t}) => {
  const g = useGFrame();
  const pal = usePal();
  const gs = React.useMemo(() => groups(t), [t]);
  const cur = gs.find((x) => g >= x.a - 1 && g < x.b);
  if (!cur) return null;
  const pop = interpolate(g, [cur.a - 1, cur.a + 3], [1.12, 1], clamp);
  return (
    <div style={{position: 'absolute', left: 40, width: 940, top: SAFE.cap, display: 'flex', justifyContent: 'center'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0 22px', maxWidth: 820, transform: `scale(${pop})`}}>
        {cur.words.map((w, i) => {
          const on = g >= w.a - 1 && (i === cur.words.length - 1 || g < cur.words[i + 1].a - 1);
          const pts: string[] = [];
          for (let k = 0; k <= 12; k++) pts.push(`${(k / 12) * 100}% ${random(`ct${i}${k}`) * 10}%`);
          for (let k = 12; k >= 0; k--) pts.push(`${(k / 12) * 100}% ${100 - random(`cb${i}${k}`) * 10}%`);
          return (
            <div key={i} style={{position: 'relative', padding: '6px 14px 2px'}}>
              {on && <div style={{position: 'absolute', inset: 0, background: boxOf(pal), clipPath: `polygon(${pts.join(',')})`}} />}
              <div style={{position: 'relative', fontFamily: JF.display, fontSize: 96, lineHeight: 1.08, color: on ? pal.ink : '#f4efe6',
                textShadow: on ? 'none' : '0 4px 0 rgba(0,0,0,0.85), 0 0 22px rgba(0,0,0,0.9)'}}>{w.w}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
