#!/usr/bin/env babel-node

import { MAX_CHAR_JP, MAX_CHAR_TW } from '../config'
import fs             from 'fs';
import path           from 'path';
import Character      from '../lib/CharacterClass';
import CharacterFetch from '../lib/CharacterFetch';
import ShipFetch      from '../lib/ShipFetch';

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

async function main () {
  // 1. Fetch Ships
  let file = path.resolve(__dirname, '../data', 'ships.json');
  try {
    // check the ship file is exist or not
    await getFileStat(file);

  } catch (e) {
    // ship file is not exist, start to fetch the ship data
    const Ships = await ShipFetch();

    // write file
    await writeFile(file, JSON.stringify(Ships, null, 2));
    console.log('Save to ' + file);
  }

  // 2. Fetch Characters
  file = path.resolve(__dirname, '../data/characters.json');
  let CharacterData = [];
  try {
    CharacterData = require(file);
  } catch (e) {
    // characters.json is not exist
  }

  for (let number = 1; number <= MAX_CHAR_JP; number++) {

    // 1. check if character info is completed or not
    let character = Character.parse(CharacterData[number - 1]);
    if (character !== null && (number > MAX_CHAR_TW || character.name.tw !== null)) {
      continue;
    }

    // 2. fetch character
    try {
      console.log(`Fetching no.${number} ...`);
      character = await CharacterFetch(number);
    } catch (e) {
      console.log(e.stack);
      continue;
    }

    // 3. add to CharacterData
    CharacterData[number - 1] = Character.compact(character);
    console.log(`Add no.${number} (JP${ character.name.tw ? ' + TW' : ''})`);
  }

  // write file
  try {
    await writeFile(file, JSON.stringify(CharacterData, null, 0));
  } catch (e) {
    console.log(e.stack);
  }
}

// start
main()
.then(() => {
  console.log('done');
})
.catch(e => {
  console.log(e.stack);
});
