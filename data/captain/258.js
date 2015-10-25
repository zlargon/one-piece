/*
 * 布朗明哥
 *
 * 奇妙的巨大身體
 * 將力量屬性角色的攻擊力及回復力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 2 : 1;
}
