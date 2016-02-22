import { MAX_CHAR_JP, MAX_CHAR_TW } from '../config';
import fetch     from 'node-fetch';
import cheerio   from 'cheerio';
import Character from './CharacterClass';

function str2num (str) {
  return parseInt(str.split(',').join(''));
};

function isInteger (num) {
  return typeof num === 'number' && num % 1 === 0;
}

// fetch character data from Japan official website (http://onepiece-treasurecruise.com)
async function fetchFromJapan(number) {
  if (!isInteger(number) || number < 1 || number > MAX_CHAR_JP) {
    let err = new Error(`character no.${number} is out of range (1 ~ ${MAX_CHAR_JP}) [JP]`);
    err.code = 'CHARACTER_OUT_OF_RANGE';
    throw err;
  }

  const res = await fetch('http://onepiece-treasurecruise.com/c-' + number, {
    method: 'GET',
    timeout: 30 * 1000
  });

  const $ = cheerio.load(await res.text());
  const name = $('#entry h1').text();
  if (name === '？？？') {
    let err = new Error(`character no.${number} is not found from Japan.`);
    err.code = 'CHARACTER_NOT_FOUND';
    throw err;
  }

  const info0   = $('#left table').eq(0).find('td');
  const info1   = $('#left table').eq(1).find('td');
  const info2   = $('#left table').eq(2).find('td');
  const min     = $('#left table').eq(3).find('tr').eq(1).find('td');
  const max     = $('#left table').eq(3).find('tr').eq(2).find('td');
  const skill   = $('#left table').eq(4).find('td');
  const captain = $('#left table').eq(5).find('td');

  const character = new Character();
  character
    .setNo(number)
    .setName('jp', name)
    .setImgUrl(info0.find('img').attr('src'))
    .setType(info1.eq(0).text())
    .addClass(info1.eq(1).text())
    .addClass(info1.eq(2).text())
    .setStar(str2num(info1.eq(3).text()))
    .setCost(str2num(info1.eq(4).text()))
    .setCombo(str2num(info2.eq(1).text()))
    .setMin(
      str2num(min.eq(1).text()),
      str2num(min.eq(2).text()),
      str2num(min.eq(3).text()),
      str2num(min.eq(4).text())
    )
    .setMax(
      str2num(max.eq(1).text()),
      str2num(max.eq(2).text()),
      str2num(max.eq(3).text()),
      str2num(max.eq(4).text())
    )
    .setSpecialAbility(
      'jp',
      skill.eq(1).text(),
      skill.eq(3).text())
    .setCaptainEffect(
      'jp',
      captain.eq(1).text(),
      captain.eq(3).text()
    );

  return character;
};

// fetch character data from Taiwan official website (http://line-optc.com/tw)
async function fetchFromTaiwan(number) {
  if (!isInteger(number) || number < 1 || number > MAX_CHAR_TW) {
    let err = new Error(`character no.${number} is out of range (1 ~ ${MAX_CHAR_TW}) [TW]`);
    err.code = 'CHARACTER_OUT_OF_RANGE';
    throw err;
  }

  const res = await fetch('http://line-optc.com/tw/c-' + number, {
      method: 'GET',
      timeout: 30 * 1000
  });

  const $ = cheerio.load(await res.text());
  const name = $('#entry h1').text();
  if (name === '') {
    let err = new Error(`character no.${number} is not found from Taiwan.`);
    err.code = 'CHARACTER_NOT_FOUND';
    throw err;
  }

  const info0   = $('#left table').eq(0).find('td');
  const info1   = $('#left table').eq(1).find('td');
  const min     = $('#left table').eq(2).find('tr').eq(1).find('td');
  const max     = $('#left table').eq(2).find('tr').eq(2).find('td');
  const skill   = $('#left table').eq(3).find('td');
  const captain = $('#left table').eq(4).find('td');

  const character = new Character();
  character
    .setNo(number)
    .setName('tw', name)
    .setImgUrl(info0.find('img').attr('src'))
    .setType(info1.eq(0).text())
    .addClass(info1.eq(1).text())
    .setStar(str2num(info1.eq(2).text()))
    .setCost(str2num(info1.eq(3).text()))
    .setCombo(str2num(info1.eq(4).text()))
    .setMin(
      str2num(min.eq(1).text()),
      str2num(min.eq(2).text()),
      str2num(min.eq(3).text()),
      str2num(min.eq(4).text())
    )
    .setMax(
      str2num(max.eq(1).text()),
      str2num(max.eq(2).text()),
      str2num(max.eq(3).text()),
      str2num(max.eq(4).text())
    )
    .setSpecialAbility(
      'tw',
      skill.eq(1).text(),
      skill.eq(3).text()
    )
    .setCaptainEffect(
      'tw',
      captain.eq(1).text(),
      captain.eq(3).text()
    );

  return character;
};

/*
 * fetchCharacter
 *
 * @number
 */
export default async function fetchCharacter(number) {
  // if fetch from japan failed, throw error
  let character = await fetchFromJapan(number);

  try {
    const taiwan = await fetchFromTaiwan(number);

    // merge taiwan into character
    character.setName('tw', taiwan.name.tw);
    character.setSpecialAbility('tw', taiwan.specialAbility.tw.name, taiwan.specialAbility.tw.content);
    character.setCaptainEffect('tw', taiwan.captainEffect.tw.name, taiwan.captainEffect.tw.content);

  } catch (e) {
    if (e.code !== 'CHARACTER_NOT_FOUND' && e.code !== 'CHARACTER_OUT_OF_RANGE') {
      throw e;
    }
  }

  return character;
};
