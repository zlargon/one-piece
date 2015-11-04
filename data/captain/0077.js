/*
 * 紅髮傑克
 *
 * 四皇的霸氣
 * 將心靈屬性角色的攻擊力提升2.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "心" ? 2.5 : 1;
}
