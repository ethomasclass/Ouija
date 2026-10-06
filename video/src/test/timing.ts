// Frame cues for the test scene. Everything visual lands LEAD frames before its word: a change that
// lands exactly on the word reads as late; two frames early reads as "in sync".
import {FPS} from '../lib/theme';
import {WORDS} from './words';

export const LEAD = 2;
const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, '');

/** Frame where the nth occurrence (1-based) of `word` starts, minus LEAD. */
export const w = (word: string, n = 1): number => {
  const hits = WORDS.filter((x) => norm(x.w) === norm(word));
  if (!hits[n - 1]) throw new Error(`word not in clip: ${word} #${n}`);
  return Math.round(hits[n - 1].s * FPS) - LEAD;
};
/** Same, at the end of the word. */
export const wEnd = (word: string, n = 1): number => {
  const hits = WORDS.filter((x) => norm(x.w) === norm(word));
  return Math.round(hits[n - 1].e * FPS) - LEAD;
};

export const sec = (s: number) => Math.round(s * FPS);

// Shot boundaries (frames from the start of the test).
export const CUT1 = sec(9.3); // plate -> board (whip pan), on "And the knocks"
export const CUT2 = sec(16.8); // board -> desk (push through, cut on motion)
export const END = sec(26.5);
