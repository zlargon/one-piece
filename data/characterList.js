import config from '../config.js';
import { CaptainEffect, SpecialAbility } from './character/skills';

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

let characterList = [];
for (let number = 1; number <= config.maxCharacterNumber.jp; number++) {
  try {
    characterList[number] = require(`../data/character/${fillZero(number)}.js`);
    characterList[number].captainEffect.magnification = CaptainEffect[number];
    characterList[number].specialAbility.magnification = SpecialAbility[number];

    // chain coefficient
    if (typeof characterList[number].captainEffect.chainCoefficient !== 'number') {
      characterList[number].captainEffect.chainCoefficient = 1;
    }
  } catch (e) {
    // console.log(e.stack);
    continue;
  }
}

export default characterList;
