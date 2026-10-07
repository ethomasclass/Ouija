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

const SPLIT = 'polygon(0 0, 58% 0, 42% 100%, 0 100%)';
const SPLIT_R = 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)';

/** B: the 1920 Rockwell couple (warm, colour) against the 1973 basement (cold, coral girl). */
export const ThumbB: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <AbsoluteFill style={{background: '#0b0a08'}}>
      <AbsoluteFill style={{clipPath: SPLIT_R}}>
        <Img src={staticFile('img/gen/ch01_basement.jpg')} style={{position: 'absolute', left: 260, top: -40, width: 1840, height: 1028, objectFit: 'cover', filter: 'grayscale(1) contrast(1.3) brightness(0.75)'}} />
        <div style={{position: 'absolute', left: 260, top: -40, width: 1840, height: 1028, background: '#FF6F61', mixBlendMode: 'color',
          WebkitMaskImage: `url(${staticFile('img/masks/ch01_basement_magenta_a.png')})`, WebkitMaskSize: '100% 100%'}} />
        <AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(10,20,40,0.35), rgba(0,0,0,0.25))'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{clipPath: SPLIT}}>
        <Img src={staticFile('img/arch/rockwell_ouija_1920_color.jpg')} style={{position: 'absolute', left: -60, top: -90, width: 1110, height: 1278, objectFit: 'cover', filter: 'saturate(1.2) contrast(1.08)'}} />
      </AbsoluteFill>
      <svg style={{position: 'absolute', inset: 0}} width={1920} height={1080}><line x1={1114} y1={-10} x2={806} y2={1090} stroke="#2FE0C4" strokeWidth={10} /></svg>
      <Highlight text="DATE NIGHT" x={40} y={760} size={120} at={-20} seed={5} rot={-3} />
      <div style={{position: 'absolute', right: 40, top: 50, fontFamily: JF.display, fontSize: 170, lineHeight: 1, color: '#FF6F61', transform: 'rotate(-3deg)', WebkitTextStroke: '6px #111',
        textShadow: '0 8px 0 #111, 0 0 40px rgba(0,0,0,0.9)'}}>DEMON?</div>
      <div style={{position: 'absolute', left: 50, top: 40, padding: '2px 18px', background: 'rgba(10,8,6,0.85)', fontFamily: JF.display, fontSize: 70, color: '#f4efe6'}}>1920</div>
      <div style={{position: 'absolute', right: 70, bottom: 40, fontFamily: JF.display, fontSize: 70, color: '#f4efe6', textShadow: '0 4px 14px #000'}}>1973</div>
    </AbsoluteFill>
  </PaletteCtx.Provider>
);

/** C: same board, different hands: the 1920 couple vs. the lone child of 1973. */
export const ThumbC: React.FC = () => (
  <PaletteCtx.Provider value={PALETTES.locked}>
    <AbsoluteFill style={{background: '#0b0a08'}}>
      <AbsoluteFill style={{clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'}}>
        <Img src={staticFile('img/gen/hands_1920_couple.jpg')} style={{position: 'absolute', left: -480, top: -20, width: 2000, height: 1117, filter: 'sepia(0.35) saturate(1.1) contrast(1.1)'}} />
      </AbsoluteFill>
      <AbsoluteFill style={{clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)'}}>
        <Img src={staticFile('img/gen/hands_1973_alone.jpg')} style={{position: 'absolute', left: 400, top: -20, width: 2000, height: 1117, filter: 'grayscale(1) contrast(1.3) brightness(0.7)'}} />
        <div style={{position: 'absolute', left: 400, top: -20, width: 2000, height: 1117, background: '#FF6F61', mixBlendMode: 'color',
          WebkitMaskImage: `url(${staticFile('img/masks/hands_1973_alone_magenta_a.png')})`, WebkitMaskSize: '100% 100%'}} />
      </AbsoluteFill>
      <div style={{position: 'absolute', left: 955, top: 0, width: 10, height: 1080, background: '#2FE0C4'}} />
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.7) 100%)'}} />
      <Highlight text="LOVE GAME" x={50} y={50} size={130} at={-20} seed={7} rot={-2} />
      <div style={{position: 'absolute', right: 50, bottom: 40, fontFamily: JF.display, fontSize: 170, lineHeight: 1, color: '#FF6F61', transform: 'rotate(-3deg)', WebkitTextStroke: '6px #111',
        textShadow: '0 8px 0 #111, 0 0 40px rgba(0,0,0,0.9)'}}>HORROR?</div>
    </AbsoluteFill>
  </PaletteCtx.Provider>
);
