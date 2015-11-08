/*
 * Mr.王子 羊肉SHOT
 *
 * 智囊廚師
 * 連續擊出2次以上PERFECT，之後的角色攻擊力將會提升2倍
 */
export default function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'perfect' ? sum + 1 : 0;
    if (sum >= 2) return 2;
  }

  return 1;
}
