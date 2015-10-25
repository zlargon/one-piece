/*
 * 佩劍的少尉 海軍本部
 *
 * 正義的技巧
 * 將技能屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "技" ? 1.5 : 1;
}
