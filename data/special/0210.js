/*
 * 妮可・羅賓
 *
 * 百花繚亂
 * 於1回合內，將知識屬性的攻擊力提升2倍
 *
 */
export default function({ character }) {
  return character.type === '知' ? 2 : 1;
}
