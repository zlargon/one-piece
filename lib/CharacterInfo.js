import { MAX_CHAR_JP }                   from '../config.js';
import Character                         from './CharacterClass';
import { CaptainEffect, SpecialAbility } from './CharacterSkill';

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

// Character Info
let CharacterInfo = [];
for (let no = 1; no <= MAX_CHAR_JP; no++) {
  try {
    CharacterInfo[no] = require(`../data/character/${fillZero(no)}.js`);

    // add skills functions
    Object.assign(CharacterInfo[no].captainEffect,  CaptainEffect[no]);
    Object.assign(CharacterInfo[no].specialAbility, SpecialAbility[no]);

  } catch (e) {
    // console.log(e.stack);
    continue;
  }
}

CharacterInfo.get = function (no) {
  let characterInfo = CharacterInfo[no];
  if (typeof characterInfo === 'object') {
    return characterInfo;
  }

  // create empty character
  characterInfo = new Character();
  characterInfo.no = no;
  Object.assign(characterInfo.captainEffect,  CaptainEffect[no]);
  Object.assign(characterInfo.specialAbility, SpecialAbility[no])
  return characterInfo;
}

export default CharacterInfo;
