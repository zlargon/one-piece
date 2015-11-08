export default function({ character }) {
  return character.classes.indexOf('打擊') >= 0 ? 1.2 : 1;
}
