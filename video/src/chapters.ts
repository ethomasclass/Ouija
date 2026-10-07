// The chapters, in order. Each is its own composition; tools/render.sh renders them, joins them and masters once.
import React from 'react';
import {Ch01, CH01_FRAMES} from './ch/Ch01';
import {Ch02, CH02_FRAMES} from './ch/Ch02';
import {Ch03, CH03_FRAMES} from './ch/Ch03';

export const CHAPTERS: {id: string; C: React.FC; frames: number}[] = [
  {id: 'Ch01', C: Ch01, frames: CH01_FRAMES},
  {id: 'Ch02', C: Ch02, frames: CH02_FRAMES},
  {id: 'Ch03', C: Ch03, frames: CH03_FRAMES},
];
