import config from '../config.js';

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

let characterList = [];
for (let number = 1; number <= config.maxCharacterNumber.jp; number++) {
  const file = fillZero(number) + '.js';

  // 1. set character info
  try {
    characterList[number] = require('../data/character/' + file);
    characterList[number].captainEffect.magnification = () => 1;
    characterList[number].specialAbility.magnification = null;

    // chain coefficient
    if (typeof characterList[number].captainEffect.chainCoefficient !== 'number') {
      characterList[number].captainEffect.chainCoefficient = 1;
    }
  } catch (e) {
    // console.log(e.stack);
    continue;
  }

  // 2. set captain effect
  try {
    characterList[number].captainEffect.magnification = require('../data/captain/' + file);
  } catch (e) {
    // console.log(e.stack);
  }

  // 3. set special ability
  try {
    characterList[number].specialAbility.magnification = require('../data/special/' + file);
  } catch (e) {
    // console.log(e.stack);
  }
}

export default characterList;
