import Character from '../../lib/CharacterClass';

export default function ({ characterList }) {
  const TypeOrder = [ '技', '知', '速' ];
  let index = 0;

  for (let i = 0; i < characterList.length; i++) {
    const character = characterList[i];
    const characterType = Character.get(character.no).type;
    const nextType = TypeOrder[index];

    if (characterType !== nextType || !isAboveGood(character.timing)) {
      index = 0;  // restart index
      continue;
    }

    // is not the last type
    if (index !== TypeOrder.length - 1) {
      index++;
      continue;
    }

    return 2.75;
  }
  return 1;
}

function isAboveGood(timing) {
  return timing === 'good' || timing === 'great' || timing === 'perfect';
}
