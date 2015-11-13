import fetch   from 'node-fetch';
import cheerio from 'cheerio';

function fetchRegionShip(lang) {
  return new Promise((resolve, reject) => {
    if (lang !== 'jp' && lang !== 'tw') {
      return reject(new Error('Invalid parameter: lang = ' + lang));
    }

    const host = lang === 'tw' ? 'line-optc.com/tw' : 'onepiece-treasurecruise.com';

    fetch(`http://${host}/ship/`, {
      method: 'GET',
      timeout: 30 * 1000
    })
    .then(res => res.text())
    .then(html => {
      const $ = cheerio.load(html);
      const entry = $('#entry');
      let Ships = [];

      // get ship name
      entry.find('h2.ship_name').each((shipIndex, element) => {
        const name = $(element).text().trim();
        Ships[shipIndex] = { name };
      });

      // get ship level text
      entry.find('table.ship_lv').each((shipIndex, shipElement) => {
        let level = [];
        $(shipElement).find('tr td:last-child').each((index, element) => {
          const text = $(element).text().trim();
          level.push({ text });
        });
        Ships[shipIndex].level = level;
      });

      resolve(Ships);
    })
    .catch(e => {
      reject(e);
    });
  });
}

/*
 * fetchShip
 *
 * @return Promise
 */
export default function fetchShip() {
  return Promise.all([
    fetchRegionShip('jp'),
    fetchRegionShip('tw')
  ])
  .then(function ([ ships, tw ]) {
    tw.forEach((ship, index) => {
      ships[index] = ship;
    });
    return ships;
  });
}
