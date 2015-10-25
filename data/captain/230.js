/*
 * 雙鐵拳的芬布迪
 *
 * 搞笑至上的海軍
 * 將力量屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 1.5 : 1;
}
