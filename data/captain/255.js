/*
 * 花劍比斯塔
 *
 * 花劍的霸氣
 * 將知識屬性角色的攻擊力及體力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 2 : 1;
}
