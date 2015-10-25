/*
 * 傑克
 *
 * 隱藏的霸氣
 * 將心靈屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "心" ? 2 : 1;
}
