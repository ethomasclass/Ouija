// Subject masks for the Gemini paintings (tools/trace.py from the magenta mask pass). Importing this file registers them.
import {registerMask} from './kit/oj';
import ch01_basement from '../public/img/masks/ch01_basement.json';
import ch02_alphabet_seance from '../public/img/masks/ch02_alphabet_seance.json';
import ch02_ohio_camp from '../public/img/masks/ch02_ohio_camp.json';
import ch03_locket from '../public/img/masks/ch03_locket.json';
import ch03_patent_office from '../public/img/masks/ch03_patent_office.json';
import ch04_parlor_chaperone from '../public/img/masks/ch04_parlor_chaperone.json';
import ch07_sleepover from '../public/img/masks/ch07_sleepover.json';
import ch07_toy_aisle from '../public/img/masks/ch07_toy_aisle.json';
import ch08_1949_house from '../public/img/masks/ch08_1949_house.json';
import ch08_theater_line from '../public/img/masks/ch08_theater_line.json';
import ch09_blindfold_lab from '../public/img/masks/ch09_blindfold_lab.json';
import hands_1913_pearl from '../public/img/masks/hands_1913_pearl.json';
import hands_1920_couple from '../public/img/masks/hands_1920_couple.json';
import hands_1967_kids from '../public/img/masks/hands_1967_kids.json';
import hands_1973_alone from '../public/img/masks/hands_1973_alone.json';

const all: Record<string, unknown> = {ch01_basement, ch02_alphabet_seance, ch02_ohio_camp, ch03_locket, ch03_patent_office, ch04_parlor_chaperone, ch07_sleepover,
  ch07_toy_aisle, ch08_1949_house, ch08_theater_line, ch09_blindfold_lab, hands_1913_pearl, hands_1920_couple, hands_1967_kids, hands_1973_alone};
Object.entries(all).forEach(([k, v]) => registerMask(k, v));
