/*
 * 羅羅亞・索隆 三・千・世・界
 *
 * 絕不背對敵人的劍士
 * 將技能屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "技" ? 1.5 : 1;
}
