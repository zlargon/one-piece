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
