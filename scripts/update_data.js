#!/usr/bin/env babel-node

import { MAX_CHAR_JP, MAX_CHAR_TW } from '../config'
import fs             from 'fs';
import path           from 'path';
import Character      from '../lib/CharacterClass';
import CharacterFetch from '../lib/CharacterFetch';
import ShipFetch      from '../lib/ShipFetch';

async function main () {
  // 1. Fetch Ships
  let file = path.resolve(__dirname, '../data', 'ships.json');
  try {
    // check the ship file is exist or not
    fs.statSync(file);

  } catch (e) {
    // ship file is not exist, start to fetch the ship data
    const Ships = await ShipFetch();

    // write file
    fs.writeFileSync(file, JSON.stringify(Ships, null, 2));
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
    fs.writeFileSync(file, JSON.stringify(CharacterData));
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
