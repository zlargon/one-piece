import Character from '../lib/CharacterClass';

export function TypeEffect(type, magni) {
  return function ({ character }) {
    return character.type === type ? magni : 1;
  }
}

export function ClassEffect(className, magni) {
  return function ({ character }) {
    return character.classes.indexOf(className) >= 0 ? magni : 1;
  }
}

export function BeadEffect({ bead }) {
  if (bead === 2)   return 1.5;
  if (bead === 0.5) return (2/3);
  return 1;
}

export function OrderEffect(typeOrder, magni) {
  function isAboveGood(timing) {
    return timing === 'good' || timing === 'great' || timing === 'perfect';
  }

  return function ({ characterList }) {
    let index = 0;

    for (let i = 0; i < characterList.length; i++) {
      const character = characterList[i];
      const characterType = Character.get(character.no).type;
      const nextType = typeOrder[index];

      if (characterType !== nextType || !isAboveGood(character.timing)) {
        index = 0;  // restart index
        continue;
      }

      // is not the last type
      if (index !== typeOrder.length - 1) {
        index++;
        continue;
      }

      return magni;
    }
    return 1;
  }
}
