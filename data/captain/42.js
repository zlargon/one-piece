/*
 * 布奇
 *
 * 怪力貓
 * 將力量屬性角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 1.2 : 1;
}
