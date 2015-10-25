/*
 * 蒙其・D・魯夫 伸縮自如的橡膠槍
 *
 * 橡膠力量
 * 將力量屬性角色的攻擊力提升為1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 1.5 : 1;
}
