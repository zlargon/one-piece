/*
 * 戴手指虎的少尉 海軍本部
 *
 * 正義的力量
 * 將力量屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 1.5 : 1;
}
