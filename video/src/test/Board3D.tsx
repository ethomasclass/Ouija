// Shot 2: a real 3D talking board (react-three-fiber inside Remotion). Candlelight with a flicker,
// soft shadows, a planchette that drifts like a hand is on it (the ideomotor effect, planted early),
// and a camera that whips in, follows the planchette a beat late, then pushes through its window.
import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, Easing, interpolate, spring, staticFile, useCurrentFrame} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';
import {noise2D} from '@remotion/noise';
import * as THREE from 'three';
import {clamp} from '../lib/anim';
import {FPS} from '../lib/theme';
import {Highlight, useGFrame} from '../kit/Kit';
import {spot, toWorld, BW, BH} from './board';
import {Label, WhipBlur} from './fx';
import {CUT1, CUT2, sec, w} from './timing';

const TEAL = '#2FE0C4';
export const TITLE_AT = sec(15.0);
export const PUSH = CUT2 - 12; // push through the planchette window

// ---- planchette path (texture px), in global frames ---------------------------------------------
type Key = {f: number; to: string | {x: number; y: number}; dur: number};
const REST = {x: 1024, y: 760};
const MOVES = (): Key[] => [
  {f: w('Once') - 4, to: 'YES', dur: w('yes.') - (w('Once') - 4)},
  {f: w('Silence'), to: 'NO', dur: w('no.') - w('Silence')},
  {f: w('They') + 2, to: {x: 1350, y: 520}, dur: 30},
];
export const ARRIVALS = () => MOVES().slice(0, 2).map((k) => k.f + k.dur);
export const GLIDES = () => MOVES().map((k) => k.f);

const planchetteAt = (f: number) => {
  let p = REST;
  let yaw = 0;
  for (const k of MOVES()) {
    const target = typeof k.to === 'string' ? spot(k.to) : k.to;
    if (f <= k.f) break;
    // slow start, soft landing, then a small overshoot-and-settle like a real hand stopping
    const t = interpolate(f, [k.f, k.f + k.dur], [0, 1], {...clamp, easing: Easing.bezier(0.55, 0, 0.25, 1)});
    const settle = f > k.f + k.dur ? spring({frame: f - (k.f + k.dur), fps: FPS, config: {stiffness: 160, damping: 9}}) : 0;
    const over = f > k.f + k.dur ? (1 - settle) * 0.04 : 0;
    const dx = target.x - p.x, dy = target.y - p.y;
    yaw = Math.sin(Math.PI * t) * Math.atan2(dx, -dy) * 0.18; // leans into the move, straightens on landing
    p = {x: p.x + dx * (t - over), y: p.y + dy * (t - over)};
  }
  // ideomotor drift: always a little; a slow searching circle while "answer questions" is said
  const search = interpolate(f, [w('answer') - 4, w('answer') + 6, w('Once') - 6, w('Once')], [0, 1, 1, 0], clamp);
  const a = (f - w('answer')) / 9;
  const n = (s: string, k: number) => noise2D(s, f * k, 0);
  return {
    x: p.x + n('px', 0.05) * 9 + Math.cos(a) * 40 * search,
    y: p.y + n('py', 0.05) * 9 + Math.sin(a) * 26 * search,
    yaw: yaw + n('pr', 0.04) * 0.04,
  };
};

// ---- geometry -----------------------------------------------------------------------------------
const planchetteShape = () => {
  const r = 0.27, cy = -0.06, tip = 0.42;
  const d = tip - cy;
  const phi = Math.acos(r / d);
  const s = new THREE.Shape();
  s.moveTo(0, tip);
  s.lineTo(Math.cos(Math.PI / 2 + phi) * r, cy + Math.sin(Math.PI / 2 + phi) * r);
  s.absarc(0, cy, r, Math.PI / 2 + phi, Math.PI / 2 - phi + Math.PI * 2, false);
  s.lineTo(0, tip);
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.085, 0, Math.PI * 2, true);
  s.holes.push(hole);
  return s;
};

const useTexture = (src: string) => {
  const [tex, setTex] = useState<THREE.Texture | null>(null);
  const [h] = useState(() => delayRender(`texture ${src}`));
  useEffect(() => {
    new THREE.TextureLoader().load(staticFile(src), (t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = 8;
      setTex(t);
      continueRender(h);
    });
  }, [src, h]);
  return tex;
};

const Rig: React.FC<{pos: number[]; look: number[]; fov: number}> = ({pos, look, fov}) => {
  const {camera} = useThree();
  const cam = camera as THREE.PerspectiveCamera;
  cam.position.set(pos[0], pos[1], pos[2]);
  cam.fov = fov;
  cam.near = 0.02;
  cam.updateProjectionMatrix();
  cam.lookAt(look[0], look[1], look[2]);
  return null;
};

/** A teal ring "drawn" around the letter the planchette lands on, stepped like the 2D marks. */
const Ring: React.FC<{at: number; x: number; z: number}> = ({at, x, z}) => {
  const g = useGFrame();
  const p = interpolate(g, [at, at + 8], [0, 1], clamp);
  if (p <= 0) return null;
  return (
    <mesh position={[x, 0.032, z]} rotation={[-Math.PI / 2, 0, 0.6]}>
      <ringGeometry args={[0.105, 0.118, 64, 1, 0, Math.PI * 2 * p * 0.93]} />
      <meshBasicMaterial color={TEAL} toneMapped={false} transparent opacity={0.95} />
    </mesh>
  );
};

const Scene: React.FC<{tex: THREE.Texture}> = ({tex}) => {
  const f = useCurrentFrame();
  const shape = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(planchetteShape(), {depth: 0.03, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 4, curveSegments: 48});
    g.rotateX(-Math.PI / 2); // lie flat; shape +y points up the board (-z)
    return g;
  }, []);

  const pl = planchetteAt(f);
  const [px, pz] = toWorld(pl);
  // the camera follows where the planchette was a few frames ago: a lag reads as a real operator
  const lag = planchetteAt(f - 5);
  const [lx, lz] = toWorld(lag);

  // whip in: moving right, decelerating hard (expo out), continuing the plate's whip
  const whip = interpolate(f, [CUT1, CUT1 + 12], [-2.4, 0], {...clamp, easing: Easing.out(Easing.exp)});
  const dolly = interpolate(f, [w('They'), PUSH], [0, 1], {...clamp, easing: Easing.inOut(Easing.sin)});
  const push = interpolate(f, [PUSH, CUT2], [0, 1], {...clamp, easing: Easing.in(Easing.cubic)});
  const base = [0.1 + lx * 0.25 + whip, 1.35 - dolly * 0.3, 2.15 - dolly * 0.4];
  const look0 = [lx * 0.35 + whip * 0.9, 0, -0.2 + lz * 0.25];
  const pos = base.map((v, i) => v + ([px, 0.1, pz + 0.025][i] - v) * push);
  const look = look0.map((v, i) => v + ([px, 0, pz][i] - v) * push);

  // candle: warm key light that flickers; it gutters on "it's a spirit"
  const spooky = interpolate(f, [w('spirit.') - 6, w('spirit.') + 10], [0, 1], clamp);
  const flick = 1 + noise2D('c1', f * 0.35, 0) * (0.1 + spooky * 0.35) + noise2D('c2', f * 1.3, 1) * 0.05;

  return (
    <>
      <Rig pos={pos} look={look} fov={37} />
      <ambientLight intensity={0.06} color="#8899bb" />
      <pointLight position={[-1.7, 0.95, -1.0]} intensity={9 * flick * (1 - spooky * 0.25)} distance={0} decay={1.6} color="#ffb071" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-radius={6} shadow-bias={-0.0004} />
      <directionalLight position={[2.5, 1.2, 1.5]} intensity={0.22} color="#7f9cff" />
      {/* table */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#1b1611" roughness={0.9} />
      </mesh>
      {/* board: a slab with the artwork on top */}
      <mesh position={[0, 0.0125, 0]} receiveShadow>
        <boxGeometry args={[BW, 0.025, BH]} />
        <meshStandardMaterial color="#5b4630" roughness={0.75} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0256, 0]} receiveShadow>
        <planeGeometry args={[BW, BH]} />
        <meshStandardMaterial map={tex} roughness={0.62} metalness={0} />
      </mesh>
      {ARRIVALS().map((a, i) => {
        const [x, z] = toWorld(spot(i === 0 ? 'YES' : 'NO'));
        return <Ring key={i} at={a - 1} x={x} z={z} />;
      })}
      {/* planchette: the one coral subject */}
      <group position={[px, 0.0255 + 0.6 * 0.02, pz]} rotation={[0, -pl.yaw, 0]} scale={0.6}>
        <mesh geometry={shape} castShadow receiveShadow>
          <meshStandardMaterial color="#e2705f" roughness={0.45} metalness={0.05} />
        </mesh>
        {[[-0.17, 0.12], [0.17, 0.12], [0, -0.36]].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.012, z]} castShadow>
            <cylinderGeometry args={[0.022, 0.026, 0.026, 16]} />
            <meshStandardMaterial color="#2a211a" roughness={1} />
          </mesh>
        ))}
      </group>
    </>
  );
};

export const Board3D: React.FC<{labels: boolean}> = ({labels}) => {
  const f = useCurrentFrame();
  const tex = useTexture('img/test/board_tex.png');
  const whipV = interpolate(f, [CUT1, CUT1 + 12], [-2.4, 0], {...clamp, easing: Easing.out(Easing.exp)}) - interpolate(f - 1, [CUT1, CUT1 + 12], [-2.4, 0], {...clamp, easing: Easing.out(Easing.exp)});
  const titleOut = interpolate(f, [CUT2 - 4, CUT2], [1, 0], clamp);
  return (
    <AbsoluteFill style={{background: '#0b0a08'}}>
      <WhipBlur id="boardblur" speed={whipV * 700}>
        {tex && (
          <ThreeCanvas width={1920} height={1080} shadows gl={{antialias: true, preserveDrawingBuffer: true}}
            onCreated={({gl}) => { gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.15; gl.shadowMap.type = THREE.PCFSoftShadowMap; }}>
            <Scene tex={tex} />
          </ThreeCanvas>
        )}
        {/* shallow depth of field: blur the near and far edges of the frame (tilt-shift) */}
        <AbsoluteFill style={{backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)',
          maskImage: 'linear-gradient(180deg, #000 0%, transparent 14%, transparent 58%, #000 100%)', WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 14%, transparent 58%, #000 100%)'}} />
        <AbsoluteFill style={{background: 'radial-gradient(ellipse at 45% 45%, transparent 35%, rgba(5,4,3,0.75) 100%)'}} />
      </WhipBlur>
      <div style={{opacity: titleOut}}>
        <Highlight text="KNOCK ONCE" after="FOR YES" x={150} y={800} size={104} at={TITLE_AT} rot={-2} />
      </div>
      <Label show={labels} text={f < TITLE_AT ? '3D board · candle flicker · soft shadows · camera lags the planchette' : f < PUSH ? 'title stamp on twos · tilt-shift depth of field' : 'push through the window · cut on motion'} />
    </AbsoluteFill>
  );
};
