import fs            from 'fs';
import path          from 'path';
import characterList from '../data/characterList.js';

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

function addComment(n) {
  const file = path.resolve(__dirname, `../data/captain/${fillZero(n)}.js`)

  try {
    const content = fs.readFileSync(file, 'utf8');
    const character = characterList[n];
    const comment =
`/*
 * ${character.name.tw}
 *
 * ${character.captainEffect.tw.name}
 * ${character.captainEffect.tw.content}
 *
 */
`
    fs.writeFileSync(file, comment + content, 'utf8');
  } catch (e) {
    console.log(e);
  }
}

// example:
// for (var i = 1; i <= 100; i++) {
//     addComment(i);
// }
