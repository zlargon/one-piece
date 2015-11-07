import coroutine from 'co';
import fetch     from 'node-fetch';
import cheerio   from 'cheerio';
import config    from '../config';
import Character from './CharacterClass';

function str2num (str) {
  return parseInt(str.split(',').join(''));
};

function isInteger (num) {
  return typeof num === 'number' && num % 1 === 0;
}

// fetch character data from Japan official website (http://onepiece-treasurecruise.com)
function fetchFromJapan(number) {
  return new Promise(function (resolve, reject) {
    if (!isInteger(number) || number < 1 || number > config.maxCharacterNumber.jp) {
      return reject(new Error('Invalid parameter: number = ' + number));
    }

    fetch('http://onepiece-treasurecruise.com/c-' + number, {
      method: 'GET',
      timeout: 30 * 1000
    })

    .then(function(res) {
      return res.text();
    })

    .then(function(html) {
      const $ = cheerio.load(html);
      const info1   = $('#left table').eq(1).find('td');
      const info2   = $('#left table').eq(2).find('td');
      const min     = $('#left table').eq(3).find('tr').eq(1).find('td');
      const max     = $('#left table').eq(3).find('tr').eq(2).find('td');
      const skill   = $('#left table').eq(4).find('td');
      const captain = $('#left table').eq(5).find('td');

      const character =
      new Character()
        .setNo(number)
        .setName('jp', $('#entry h1').text())
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

      resolve(character);
    })

    .catch(function(error) {
        reject(error);
    });
  });
};

// fetch character data from Taiwan official website (http://line-optc.com/tw)
function fetchFromTaiwan(number) {
  return new Promise (function (resolve, reject) {
    if (!isInteger(number) || number < 1 || number > config.maxCharacterNumber.tw) {
      reject(new Error('Invalid parameter: number = ' + number));
      return;
    }

    fetch('http://line-optc.com/tw/c-' + number, {
        method: 'GET',
        timeout: 30 * 1000
    })

    .then(function(res) {
        return res.text();
    })

    .then(function(html) {
      const $ = cheerio.load(html);
      const info    = $('#left table').eq(1).find('td');
      const min     = $('#left table').eq(2).find('tr').eq(1).find('td');
      const max     = $('#left table').eq(2).find('tr').eq(2).find('td');
      const skill   = $('#left table').eq(3).find('td');
      const captain = $('#left table').eq(4).find('td');

      const character =
      new Character()
        .setNo(number)
        .setName('tw', $('#entry h1').text())
        .setType(info.eq(0).text())
        .addClass(info.eq(1).text())
        .setStar(str2num(info.eq(2).text()))
        .setCost(str2num(info.eq(3).text()))
        .setCombo(str2num(info.eq(4).text()))
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

      resolve(character);
    })

    .catch(function(error) {
      reject(error);
    });
  });
};

/*
 * fetchCharacter
 *
 * @number
 */
export default function fetchCharacter(number) {
  return coroutine(function * () {
    let japan = null, taiwan = null;

    try {
      // if fetch japan failed, no need to fetch taiwan
      japan = yield fetchFromJapan(number);
      taiwan = yield fetchFromTaiwan(number);
    } catch (e) {
      // console.log(e.stack);
    }

    return { japan, taiwan };
  })
  .then(function ({ japan, taiwan }) {
    if (japan === null) {
      throw new Error(`character no.${number} is not found`);
    }

    if (taiwan === null) {
      return japan;
    }

    // merge taiwan into japan
    japan.setName('tw', taiwan.name.tw);
    japan.setSpecialAbility('tw', taiwan.specialAbility.tw.name, taiwan.specialAbility.tw.content);
    japan.setCaptainEffect('tw', taiwan.captainEffect.tw.name, taiwan.captainEffect.tw.content);

    return japan;
  })
};
