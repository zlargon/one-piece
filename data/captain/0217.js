/*
 * 蒙其・D・魯夫 ３檔
 *
 * 巨人力量
 * 連續擊出3次以上PERFECT，之後的角色攻擊力將會提升3.5倍
 */
export default function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'perfect' ? sum + 1 : 0;
    if (sum >= 3) return 3.5;
  }

  return 1;
}
