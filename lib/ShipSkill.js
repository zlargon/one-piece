import { length as SHIP_LENGTH }   from '../data/ships.js';
import { TypeEffect, ClassEffect } from './GeneralEffect';

// reset skills
let Skill = [];
for (let i = 0; i < SHIP_LENGTH; i++) {

  let levels = [];
  for (let j = 0; j < 10; j++) {
    levels.push({
      add:  () => 0,
      plus: () => 1
    });
  }

  Skill.push(levels);
}

// 0. 酒桶小船

// 1. 前進梅利號
Skill[1].forEach((ship, index) => {
  const level = index + 1;

  let magni = 1;
  if      (level <= 5) magni = 1;   // 1 ~ 5
  else if (level <= 9) magni = 1.2; // 6 ~ 9
  else                 magni = 1.5; // 10

  ship.plus = () => magni;
});

// 2. 海軍船
Skill[2].forEach((ship, index) => {
  const level = index + 1;
  ship.add = function ({ character }) {
    return character.classes.indexOf('射擊') >= 0 ? level * 10 : 0;
  }
});

// 3. 芭拉蒂

// 4. 棺船
Skill[4].forEach((ship, index) => {
  const level = index + 1;

  let magni = 1;
  if      (level <= 2) magni = 1.1;   // 1 ~ 2
  else if (level <= 4) magni = 1.2;   // 3 ~ 4
  else if (level <= 7) magni = 1.3;   // 5 ~ 7
  else if (level <= 9) magni = 1.4;   // 8 ~ 9
  else                 magni = 1.5;   // 10

  ship.plus = ClassEffect('斬擊', magni);
});

// 5. Missラブ・ダック号
Skill[5].forEach((ship, index) => {
  const level = index + 1;

  let attack = 0;
  if      (level <= 6) attack = 0;   // 1 ~ 6
  else if (level <= 9) attack = 50;  // 7 ~ 9
  else                 attack = 100; // 10

  ship.add = function({ character }) {
    return character.classes.indexOf('打擊') >= 0 ? attack : 0;
  }
});

// 6. ゴーイング・メリー号 フライングモデル
Skill[6].forEach((ship, index) => {
  const level = index + 1;

  let magni = 1;
  if      (level <= 6) magni = 1;     // 1 ~ 6
  else if (level <= 9) magni = 1.1;   // 7 ~ 9
  else                 magni = 1.2;   // 10

  ship.plus = () => magni;
});

// 7. モビー・ディック号
Skill[7].forEach((ship, index) => {
  const level = index + 1;

  let magni = 1;
  if      (level <= 2) magni = 1.2;   // 1 ~ 2
  else if (level <= 3) magni = 1.25;  // 3
  else if (level <= 5) magni = 1.3;   // 4 ~ 5
  else if (level <= 6) magni = 1.35;  // 6
  else if (level <= 9) magni = 1.4;   // 7 ~ 9
  else                 magni = 1.5;   // 10

  ship.plus = () => magni;
});

// 8. ビッグトップ号
Skill[8].forEach((ship, index) => {
  const level = index + 1;

  let cost = level <= 5 ? 15 : 20;

  let magni = 1;
  if      (level <= 1) magni = 1.1;   // 1
  else if (level <= 3) magni = 1.2;   // 2 ~ 3
  else if (level <= 7) magni = 1.3;   // 4 ~ 7
  else                 magni = 1.4;   // 8 ~ 10

  ship.plus = ({ character }) => {
    return character.cost <= cost ? magni : 1;
  }
});

// 9. ベザン・ブラック号
Skill[9].forEach((ship, index) => {
  const level = index + 1;

  let magni = 1;
  if      (level <= 2) magni = 1.1;   // 1 ~ 2
  else if (level <= 3) magni = 1.15;  // 3
  else if (level <= 6) magni = 1.2;   // 4 ~ 6
  else if (level <= 7) magni = 1.25;  // 7
  else if (level <= 9) magni = 1.3;   // 8 ~ 9
  else                 magni = 1.4;   // 10

  ship.plus = TypeEffect('速', magni);
});

// 10. サウザンド・サニー号
Skill[10].forEach((ship, index) => {
  const level = index + 1;

  let magni = 1;
  if      (level <= 3) magni = 1.2;   // 1 ~ 3
  else if (level <= 7) magni = 1.3;   // 4 ~ 7
  else if (level <= 9) magni = 1.4;   // 8 ~ 9
  else                 magni = 1.5;   // 10

  ship.plus = ClassEffect('打擊', magni);
});

export default Skill;
