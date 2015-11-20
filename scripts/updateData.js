import { MAX_CHAR_JP } from '../config.js'
import fs              from 'fs';
import path            from 'path';
import coroutine       from 'co';
import CharacterFetch  from '../lib/CharacterFetch.js';
import ShipFetch       from '../lib/ShipFetch.js';

function getFileStat(filePath) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, value) => {
      return err ? reject(err) : resolve(value);
    });
  });
}

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      return err ? reject(err) : resolve();
    });
  });
}

function fillZero(number) {
  return (number + 10000).toString().substring(1);
}

function exportModule(json) {
  return `export default ${JSON.stringify(json, null, 2)};\n`;
}

coroutine(function * () {
  // 1. Fetch Ships
  const Ships = yield ShipFetch();
  const file = path.resolve(__dirname, '../data/ship', 'info.js');
  yield writeFile(file, exportModule(Ships));
  console.log('Save to ' + file);

  // 2. Fetch Characters
  for (let number = 1; number <= MAX_CHAR_JP; number++) {
    const file = path.resolve(__dirname, '../data/character',  fillZero(number) + '.js');

    // 1. check the file is exist or not
    let stat;
    try {
      stat = yield getFileStat(file);
      continue;
    } catch (e) {
      // console.log(`${file} is not exist`);
    }

    // 2. fetch character
    let character = null;
    try {
      console.log(`Fetching no.${number} ...`);
      character = yield CharacterFetch(number);
    } catch (e) {
      console.log(e.stack);
      continue;
    }

    // 3. write file
    try {
      yield writeFile(file, exportModule(character));
      console.log(`Save to ${file}`);
    } catch (e) {
      console.log(e.stack);
    }
  }
})
.then(function () {
  console.log('done');
})
.catch(e => {
  console.log(e.stack);
});
