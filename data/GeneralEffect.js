import Character from '../lib/CharacterClass';

export function TypeEffect(type, magni, low = 1) {
  const types = Array.isArray(type) ? type : [ type ];

  // check types
  const validTypes = ['力', '技', '速', '心', '知'];
  types.forEach(type => {
    if (validTypes.indexOf(type) === -1) {
      throw new Error('invalid type ' + type);
    }
  });

  return function ({ character }) {
    return types.indexOf(character.type) >= 0 ? magni : low;
  }
}

export function ClassEffect(className, magni, low = 1) {
  const classes = Array.isArray(className) ? className : [ className ];

  // check classes
  const validClasses = ['格鬥', '斬擊', '打擊', '射擊', '自由', '博識', '強韌'];
  classes.forEach(className => {
    if (validClasses.indexOf(className) === -1) {
      throw new Error('invalid class ' + className);
    }
  });

  return function ({ character }) {
    for (let i = 0; i < character.classes.length; i++) {
      const className = character.classes[i];
      if (classes.indexOf(className) >= 0) {
        return magni;
      }
    }
    return low;
  }
}

export function BeadEffect(magni) {
  if (magni < 1) {
    throw new Error('invalid bead magnification = ' + magni);
  }

  return function ({ bead }) {
    if (bead === 2)   return magni;
    if (bead === 0.5) return 1 / magni;
    return 1;
  }
}

export function PerfectEffect(perfectTimes, magni) {
  return function ({ timingHistory }) {
    let sum = 0;
    for (let i = 0; i < timingHistory.length; i++) {
      sum = timingHistory[i] === 'perfect' ? sum + 1 : 0;
      if (sum >= perfectTimes) return magni;
    }
    return 1;
  }
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
