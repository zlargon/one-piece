import { MAX_CHAR_JP }                   from '../config';
import CharacterData                     from '../data/characters';
import Character                         from './CharacterClass';
import { CaptainEffect, SpecialAbility } from './CharacterSkill';

// Character Info
let CharacterInfo = [];
for (let no = 1; no <= MAX_CHAR_JP; no++) {
  CharacterInfo[no] = Character.parse(CharacterData[no - 1]);
  if (CharacterInfo[no] === null) {
    CharacterInfo[no] = new Character().setNo(no);
  }

  // add skills functions
  Object.assign(CharacterInfo[no].captainEffect,  CaptainEffect[no]);
  Object.assign(CharacterInfo[no].specialAbility, SpecialAbility[no]);
}

CharacterInfo.get = function (no) {
  return CharacterInfo[no];
}

export default CharacterInfo;
