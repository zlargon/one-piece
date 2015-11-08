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
