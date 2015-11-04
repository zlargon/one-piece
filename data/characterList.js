import config from '../config.js';

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

const startTime = new Date().getTime();
let characterList = [];
for (let number = 1; number <= config.maxCharacterNumber.jp; number++) {
  const file = fillZero(number) + '.js';

  try {
    characterList[number] = require('../data/character/' + file);
    characterList[number].captainEffect.magnification = () => 1;
    characterList[number].captainEffect.magnification = require('../data/captain/' + file);
  } catch (e) {
    // console.log(e.stack);
  }
}
const spendTime = new Date().getTime() - startTime;
const second = Math.floor(spendTime / 100) / 10;
console.log(`${second} sec`)

module.exports = characterList;
