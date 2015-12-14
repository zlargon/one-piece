import CharacterInfo from './CharacterInfo';
import ShipInfo      from './ShipInfo';

function getCaptainList(characters) {
  let list = [];
  characters.forEach(character => {
    if (character.captainEffect === true) {
      list.push(CharacterInfo.get(character.no));
    }
  });
  return list;
}

function getSpecialAbilityList(characters) {
  let list = [];
  characters.forEach((character, specialAbilityIndex) => {
    if (character.specialAbility !== true) {
      return;
    }

    const characterInfo = CharacterInfo.get(character.no);
    if (characterInfo.specialAbility.hasSpecialAbility === true) {
      list.push({
        ...characterInfo,
        specialAbilityIndex
      });
    }
  });
  return list;
}

function getTypeMagnification(character, enemy) {
  if (character.type === '力' && enemy.type === '技') return 2;
  if (character.type === '技' && enemy.type === '速') return 2;
  if (character.type === '速' && enemy.type === '力') return 2;
  if (character.type === '心' && enemy.type === '知') return 2;
  if (character.type === '知' && enemy.type === '心') return 2;
  if (character.type === '技' && enemy.type === '力') return 0.5;
  if (character.type === '速' && enemy.type === '技') return 0.5;
  if (character.type === '力' && enemy.type === '速') return 0.5;
  return 1;
}

function getCaptainAdd(currentCharacterList, captainList) {
  const character = currentCharacterList.slice().pop();
  const characterInfo = CharacterInfo.get(character.no);

  const additive = captainList.map(character => {
    return character.captainEffect.add;
  })
  .reduce((additive, fn) => {
    return additive + fn({ character: characterInfo });
  }, 0);

  return additive;
}

function getSpecialAdd(currentCharacterList, specialAbilityList) {
  const character = currentCharacterList.slice().pop();
  const characterInfo = CharacterInfo.get(character.no);

  const additive = specialAbilityList.map(character => {
    return character.specialAbility.add;
  })
  .reduce((additive, fn) => {
    return additive + fn({ character: characterInfo });
  }, 0);

  return additive;
}

function getAdditiveAttack(add) {
  let attack = 0;
  for (let key in add) {
    attack += add[key];
  }
  return attack;
}

function getCaptainPlus(currentCharacterList, captainList) {
  let current = currentCharacterList.slice();   // Array copy
  const character = current.pop();
  const characterInfo = CharacterInfo.get(character.no);
  const timingHistory = current.map(character => {
    return character.timing;
  });

  const magni = captainList.map(character => {
    return character.captainEffect.plus;
  })
  .reduce((magni, fn) => {
    return magni * fn({
      character: characterInfo,
      timingHistory,
      characterList: current,
      bead: character.bead
    });
  }, 1);
  return Math.round(magni * 100) / 100;
}

function getSpecialPlus(currentCharacterList, specialAbilityList) {
  let current = currentCharacterList.slice();   // Array copy
  const character = current.pop();
  const characterInfo = CharacterInfo.get(character.no);

  let magni = 1;
  specialAbilityList.forEach(specialCharacter => {
    const { specialAbilityIndex } = specialCharacter;
    const fn = specialCharacter.specialAbility.plus;

    magni *= fn({
      characterList: current,
      character: characterInfo,
      bead: character.bead,
      specialAbilityIndex
    });
  });

  return Math.round(magni * 100) / 100;
}

function getBasicAttack(attack, additive, plus) {
  let basic = attack + additive;
  for (let key in plus) {
    basic *= plus[key];
  }
  return Math.round(basic);
}

function getSigalAttack(basicAttack, combo) {
  return Math.round(basicAttack / combo);
}

function getFinalAttack(basicAttack, combo, timing) {
  let magni = 0;
  if (timing === 'good')    magni = 0.3;
  if (timing === 'great')   magni = 0.5939;
  if (timing === 'perfect') magni = 0.8999;

  const final = (basicAttack / combo) * (combo * magni + 1)
  return Math.round(final);
}

function getAttackCombo(combo, timing) {
  if (timing === 'bad')   return combo - 3;
  if (timing === 'good')  return combo - 2;
  if (timing === 'great') return combo - 1;
  return combo;
}

function updateChainMagnification(magni: originalChainMagnification, timing, captainList) {
  // check chain coefficient
  let coefficient = 1;
  captainList.forEach(function (character) {
    coefficient *= character.captainEffect.chainCoefficient();
  });

  switch (timing) {
    case 'good':    magni += 0   * coefficient;  break;
    case 'great':   magni += 0.1 * coefficient;  break;
    case 'perfect': magni += 0.3 * coefficient;  break;
    case 'bad':
    case 'miss':    magni =  1;    break;
  }
  return Math.round(magni * 10) / 10;
}

function getDamage(attack, defense) {
  const damage = attack - defense;
  return damage > 1 ? damage : 1;
}

export default function attackAnalysis({ enemy, ship, characters }) {
  const shipInfo = ShipInfo.get(ship.no, ship.level);

  // get captains
  const captains = getCaptainList(characters);
  if (captains.length > 2) {
    throw new Error('It should not have more than 2 captain at the same time');
  }

  const specialAbilities = getSpecialAbilityList(characters);

  let analysis = [];
  let chainMagnification = 1;
  let total = {
    attack: 0,
    combo: 0
  };
  let current = [];
  characters.forEach(function(character) {
    current.push(character);
    const characterInfo = CharacterInfo.get(character.no);

    const add = {
      ship: shipInfo.add({ character: characterInfo }),
      captain: getCaptainAdd(current, captains),
      special: getSpecialAdd(current, specialAbilities)
    };

    const plus = {
      ship: shipInfo.plus({ character: characterInfo }),
      bead: character.bead,
      chain: chainMagnification,
      type: getTypeMagnification(characterInfo, enemy),
      captain: getCaptainPlus(current, captains),
      special: getSpecialPlus(current, specialAbilities),
      custom: character.custom
    };

    // Additive Attack
    const additive = getAdditiveAttack(add);

    // Basic Attack
    const basic = getBasicAttack(character.attack, additive, plus);

    const attack = {
      original: character.attack,
      add: additive,
      basic,
      singal: getSigalAttack(basic, characterInfo.combo),
      final: getFinalAttack(basic, characterInfo.combo, character.timing),
      timing: character.timing,
      combo: getAttackCombo(characterInfo.combo, character.timing)
    };

    // update chain magnification
    chainMagnification = updateChainMagnification(chainMagnification, character.timing, captains);

    // Damage
    let damage = {
      singal: getDamage(attack.singal, enemy.defense),
      final: getDamage(attack.final, enemy.defense),
      history: [],
      total: 0
    };

    // Total Damage
    for (let i = 0; i < attack.combo; i++) {
      damage.total += damage.singal;
      damage.history.push(damage.total);
    }
    damage.total += damage.final - damage.singal;

    // Total
    total.attack += damage.total;
    total.combo += attack.combo;

    // add stucture to analysis
    analysis.push({
      character: characterInfo,
      magnification: plus,
      attack,
      damage,
      total: {
        attack: total.attack,
        combo: total.combo
      }
    });
  });

  return { captains, shipInfo, specialAbilities, analysis, total };
}
