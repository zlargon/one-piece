import { MAX_CHAR_JP }                   from '../config.js';
import Character                         from './CharacterClass';
import ShipInfo                          from '../data/ship/info';
import ShipSkill                         from './skill/ship';
import { CaptainEffect, SpecialAbility } from './skill/character';

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

// Character Info
let CharacterInfo = [];
for (let no = 1; no <= MAX_CHAR_JP; no++) {
  try {
    CharacterInfo[no] = require(`../data/character/${fillZero(no)}.js`);

    // copy Captain Effect functions
    CharacterInfo[no].captainEffect = {
      ...CharacterInfo[no].captainEffect,
      ...CaptainEffect[no]
    };

    // copy Special Ability functions
    CharacterInfo[no].specialAbility = {
      ...CharacterInfo[no].specialAbility,
      ...SpecialAbility[no]
    };
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
  characterInfo.captainEffect = {
    ...characterInfo.captainEffect,
    ...CaptainEffect[no]
  };
  characterInfo.specialAbility = {
    ...characterInfo.specialAbility,
    ...SpecialAbility[no]
  };
  return characterInfo;
}

// Ship Info
ShipInfo.forEach((ship, no) => {
  ship.level = ship.level.map((info, level) => {
    return {
      ...info,
      ...ShipSkill[no][level]
    }
  });
});

ShipInfo.get = function (no, level) {
  if (typeof no !== 'number' || 0 > no || no > ShipInfo.length - 1) {
    throw new Error(`no ${no} range should be 0 ~ ${ShipInfo.length - 1}`);
  }

  if (typeof level !== 'number' || 1 > level || level > 10) {
    throw new Error(`level ${level} range should be 1 ~ 10`);
  }

  return ShipInfo[no].level[level - 1];
}

export default {
  CharacterInfo,
  ShipInfo
};
