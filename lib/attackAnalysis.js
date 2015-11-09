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

    let magnification = {
      boat,
      bead: character.bead,
      chain: chainMagnification,
      type: getTypeMagnification(characterInfo, enemy),
      captain: getCaptainMagnification(current, captains),
      special: 1
    };

    // get special ability magnification
    magnification.special =
      specialAbilities.reduce(function (magnification, specialAbility) {
        return magnification * specialAbility.specialAbility.magnification({
          character: characterInfo,
          bead: character.bead
        });
      }, 1);
    magnification.special = Math.round(magnification.special * 100) / 100;

    let attack = {
      original: character.attack,
      basic: 0,
      singal: 0,
      timing: character.timing,
      combo: characterInfo.combo
    }

    // Basic Attack
    attack.basic = Math.round(
      character.attack
      * magnification.boat
      * magnification.type
      * magnification.captain
      * magnification.bead
      * magnification.chain
      * magnification.special
    );

    // Singal Attack
    attack.singal = Math.round(attack.basic / characterInfo.combo);   // 四捨五入

    // Timing
    let timingMagnification = 0;
    switch (character.timing) {
        case 'bad':     attack.combo -= 3;  chainMagnification =  1;    timingMagnification = 0;       break;
        case 'good':    attack.combo -= 3;  chainMagnification += 0;    timingMagnification = 0.3;     break;
        case 'great':   attack.combo -= 1;  chainMagnification += 0.1;  timingMagnification = 0.5939;  break;
        case 'perfect': attack.combo -= 0;  chainMagnification += 0.3;  timingMagnification = 0.8999;  break;
        case 'miss':    attack.combo -= 0;  chainMagnification =  1;    timingMagnification = 0;       break;
    }
    chainMagnification = Math.round(chainMagnification * 10) / 10;

    // Damage
    let damage = {
      singal: attack.singal - enemy.defense,
      final: Math.round(attack.singal * (characterInfo.combo * timingMagnification + 1) - enemy.defense),
      history: [],
      total: 0
    };
    if (damage.singal < 1) damage.singal = 1;
    if (damage.final < 1)  damage.final  = 1;

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
