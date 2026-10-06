import React from 'react';
import {Composition} from 'remotion';
import {JFonts} from './kit/Kit';
import {FPS, H, W} from './lib/theme';
import {BoardTexture} from './test/BoardTexture';
import {TH, TW} from './test/board';
import {TestScene} from './test/TestScene';
import {END} from './test/timing';

export const Root: React.FC = () => (
  <>
    <Composition id="Test" width={W} height={H} fps={FPS} durationInFrames={END} component={(p: {labels: boolean}) => <JFonts><TestScene {...p} /></JFonts>} defaultProps={{labels: true}} />
    <Composition id="BoardTexture" width={TW} height={TH} fps={FPS} durationInFrames={1} component={() => <JFonts><BoardTexture /></JFonts>} />
  </>
);
