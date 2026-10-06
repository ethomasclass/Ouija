// The flat artwork of the talking board, rendered once to public/img/test/board_tex.png
// (npx remotion still src/index.ts BoardTexture public/img/test/board_tex.png) and mapped onto the 3D board.
// Generic 1890s-style layout: two letter arcs, a row of digits, YES / NO, GOOD BYE. No brand name.
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {JF} from '../kit/Kit';
import {GLYPHS, TH, TW, WORDS_ON_BOARD} from './board';

const INKC = '#201a14';

export const BoardTexture: React.FC = () => (
  <AbsoluteFill style={{background: '#cfc3ab'}}>
    {/* wood grain: noise stretched along the board */}
    <svg width={TW} height={TH} style={{position: 'absolute', inset: 0, opacity: 0.55, mixBlendMode: 'multiply'}}>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.0025 0.06" numOctaves="4" seed="11" /><feColorMatrix type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 1.1 -0.2" /></filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
    {/* age: darker toward the edges, a few hand-worn patches */}
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 48%, transparent 45%, rgba(60,40,20,0.45) 100%)'}} />
    <AbsoluteFill style={{background: 'radial-gradient(circle at 48% 62%, rgba(80,55,30,0.14) 0%, transparent 22%)'}} />
    {/* double rule border */}
    <div style={{position: 'absolute', inset: 46, border: `6px solid ${INKC}`, borderRadius: 26, opacity: 0.85}} />
    <div style={{position: 'absolute', inset: 66, border: `2px solid ${INKC}`, borderRadius: 18, opacity: 0.7}} />
    {/* small star ornament, top centre */}
    <div style={{position: 'absolute', left: TW / 2 - 60, top: 120, width: 120, textAlign: 'center', fontFamily: JF.display, fontSize: 110, color: INKC, lineHeight: 1}}>✶</div>
    {GLYPHS.map((g) => (
      <div key={g.ch} style={{position: 'absolute', left: g.x - 100, top: g.y - g.size * 0.62, width: 200, textAlign: 'center', fontFamily: JF.display, fontSize: g.size, color: INKC,
        lineHeight: 1.2, transform: `rotate(${g.rot}deg)`, transformOrigin: '50% 52%'}}>{g.ch}</div>
    ))}
    {Object.entries(WORDS_ON_BOARD).map(([w, p]) => (
      <div key={w} style={{position: 'absolute', left: p.x - 400, top: p.y - p.size * 0.62, width: 800, textAlign: 'center', fontFamily: JF.display, fontSize: p.size, color: INKC, lineHeight: 1.2, letterSpacing: 6}}>{w}</div>
    ))}
  </AbsoluteFill>
);
