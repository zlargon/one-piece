import Character from './CharacterClass';

function getCaptainList(characters) {
  let list = [];
  characters.forEach(character => {
    if (character.captainEffect === true) {
      list.push(Character.get(character.no));
    }
  });
  return list;
}

function getSpecialAbilityList(characters) {
  let list = [];
  characters.forEach(character => {
    if (character.specialAbility !== true) {
      return;
    }

    const characterInfo = Character.get(character.no);
    if (characterInfo.specialAbility.magnification !== null) {
      list.push(characterInfo);
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

function getCaptainMagnification(currentCharacterList, captainList) {
  let current = currentCharacterList.slice();   // Array copy
  const character = current.pop();
  const characterInfo = Character.get(character.no);
  const timingHistory = current.map(character => {
    return character.timing;
  });

  const magni = captainList.map(character => {
    return character.captainEffect.magnification;
  })
  .reduce((magni, fn) => {
    return magni * fn({
      character: characterInfo,
      timingHistory
    });
  }, 1);
  return Math.round(magni * 100) / 100;
}

function getSpecialMagnification(currentCharacterList, specialAbilityList) {
  let current = currentCharacterList.slice();   // Array copy
  const character = current.pop();
  const characterInfo = Character.get(character.no);

  const magni = specialAbilityList.map(character => {
    return character.specialAbility.magnification;
  })
  .reduce((magni, fn) => {
    return magni * fn({
      character: characterInfo,
      bead: character.bead
    })
  }, 1);
  return Math.round(magni * 100) / 100;
}

function getBasicAttack(attack, magnification) {
  let basic = attack;
  for (let key in magnification) {
    basic *= magnification[key];
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
  if (timing === 'good')  return combo - 3;
  if (timing === 'great') return combo - 1;
  return combo;
}

function updateChainMagnification(magni: originalChainMagnification, timing) {
  switch (timing) {
    case 'good':    magni += 0;    break;
    case 'great':   magni += 0.1;  break;
    case 'perfect': magni += 0.3;  break;
    case 'bad':
    case 'miss':    magni =  1;    break;
  }
  return Math.round(magni * 10) / 10;
}

function getDamage(attack, defense) {
  const damage = attack - defense;
  return damage > 1 ? damage : 1;
}

export default function attackAnalysis({ enemy, boat, characters }) {
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
    const characterInfo = Character.get(character.no);

    const magnification = {
      boat,
      bead: character.bead,
      chain: chainMagnification,
      type: getTypeMagnification(characterInfo, enemy),
      captain: getCaptainMagnification(current, captains),
      special: getSpecialMagnification(current, specialAbilities)
    };

    // Basic Attack
    const basic = getBasicAttack(character.attack, magnification);

    const attack = {
      original: character.attack,
      basic,
      singal: getSigalAttack(basic, characterInfo.combo),
      final: getFinalAttack(basic, characterInfo.combo, character.timing),
      timing: character.timing,
      combo: getAttackCombo(characterInfo.combo, character.timing)
    };

    // update chain magnification
    chainMagnification = updateChainMagnification(chainMagnification, character.timing);

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
      magnification,
      attack,
      damage,
      total: {
        attack: total.attack,
        combo: total.combo
      }
    });
  });

  return { captains, specialAbilities, analysis, total };
}
