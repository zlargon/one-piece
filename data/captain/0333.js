export default function({ character }) {
  return character.type === '心' || character.type === '知' ? 1.5 : 1;
}
