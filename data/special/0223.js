/*
 * 騙人布 衝撃
 *
 * 衝撃
 * 於1回合內，將心靈屬性的攻擊力提升2倍
 *
 */
export default function({ character }) {
  return character.type === '心' ? 2 : 1;
}
