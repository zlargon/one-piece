export default function({ character }) {
  const classes = character.classes;
  for (let i = 0; i < classes.length; i++) {
    if (classes[i] === '打擊') return 1.5;
  }
  return 1;
}
