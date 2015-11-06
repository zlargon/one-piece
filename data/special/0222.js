/*
 * 騙人布 騙人布反擊
 *
 * 騙人布反擊
 * 於1回合內，將心靈屬性的攻擊力提升1.5倍
 *
 */
export default function({ character }) {
  return character.type === '心' ? 1.5 : 1;
}
