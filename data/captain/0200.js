/*
 * Mr.5 微風氣息炸彈
 *
 * 全身引爆人
 * 將力量屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 2 : 1;
}
