/*
 * 鐵拳芬布迪
 *
 * 手指虎
 * 將力量屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 1.5 : 1;
}
