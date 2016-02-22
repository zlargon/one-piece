import fetch   from 'node-fetch';
import cheerio from 'cheerio';

async function fetchRegionShip(lang) {
  if (lang !== 'jp' && lang !== 'tw') {
    throw new Error('Invalid parameter: lang = ' + lang);
  }

  const host = lang === 'tw' ? 'line-optc.com/tw' : 'onepiece-treasurecruise.com';

  const res = await fetch(`http://${host}/ship/`, {
    method: 'GET',
    timeout: 30 * 1000
  });

  if (res.status !== 200) {
    throw new Error(`request to ${HOST} failed: ${res.statusText} (${res.status})`);
  }

  const $ = cheerio.load(await res.text());
  const entry = $('#entry');
  let Ships = [];

  // get ship name
  entry.find('h2.ship_name').each((shipIndex, element) => {
    const name = $(element).text().trim();
    Ships[shipIndex] = { name };
  });

  // get ship img url
  entry.find('img.aligncenter').each((shipIndex, element) => {
    const imgUrl = $(element).attr('src');
    Ships[shipIndex].imgUrl = imgUrl;
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

  return Ships;
}

/*
 * fetchShip
 *
 * @return Promise
 */
export default async function fetchShip() {
  const ships = await fetchRegionShip('jp');

  (await fetchRegionShip('tw')).forEach((ship, index) => {
    const imgUrl = ships[index].imgUrl;
    ships[index] = {
      ...ship,
      imgUrl    // Keep imgUrl from Japan
    };
  });

  return ships;
}
