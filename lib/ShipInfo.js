import ShipInfo from '../data/ships';
import Skill    from './ShipSkill';

// add ship skills to info
ShipInfo.forEach((ship, no) => {
  ship.level.forEach((info, level) => {
    Object.assign(info, Skill[no][level]);
  });
});

ShipInfo.get = function (no, level) {
  if (typeof no !== 'number' || 0 > no || no > ShipInfo.length - 1) {
    throw new Error(`no ${no} range should be 0 ~ ${ShipInfo.length - 1}`);
  }

  if (typeof level !== 'number' || 1 > level || level > 10) {
    throw new Error(`level ${level} range should be 1 ~ 10`);
  }

  return ShipInfo[no].level[level - 1];
}

export default ShipInfo;
