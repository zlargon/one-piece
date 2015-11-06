/*
 * 克比上士
 *
 * 剃
 * 於2回合內將海賊團全體成員的技能格影響力大幅提升
 *
 */
export default function({ bead }) {
  if (bead === 2)   return 1.5;
  if (bead === 0.5) return (2/3);
  return 1;
}
