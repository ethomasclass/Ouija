// YouTube thumbnail: the split board (warm 1920 parlor / cold 1970s basement), planchette on the seam,
// and the question in the channel's type. Render: npx remotion still src/index.ts Thumb out/thumb.png
import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Highlight, JF, PALETTES, PaletteCtx} from './kit/Kit';

export const Thumb: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <AbsoluteFill style={{background: '#0b0a08'}}>
      <Img src={staticFile('img/gen/thumb_split.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(1.15) contrast(1.12)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 55%, transparent 35%, rgba(0,0,0,0.65) 100%)'}} />
      <AbsoluteFill style={{background: 'radial-gradient(ellipse 60% 45% at 78% 88%, rgba(0,0,0,0.75) 0%, transparent 100%)'}} />
      <Highlight text="WHO MADE IT" x={60} y={40} size={150} at={-20} seed={3} rot={-3} />
      <div style={{position: 'absolute', right: 70, bottom: 30, fontFamily: JF.display, fontSize: 260, lineHeight: 1, color: '#FF6F61', transform: 'rotate(-3deg)',
        textShadow: '0 8px 0 #111, 0 0 40px rgba(0,0,0,0.9)', WebkitTextStroke: '6px #111'}}>SCARY?</div>
    </AbsoluteFill>
  </PaletteCtx.Provider>
);
