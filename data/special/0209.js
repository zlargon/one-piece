/*
 * Miss All Sunday
 *
 * 十六輪花
 * 於1回合內，將知識屬性的攻擊力提升1.5倍
 *
 */
export default function({ character }) {
  return character.type === '知' ? 1.5 : 1;
}
