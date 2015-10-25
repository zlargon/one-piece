/*
 * 羅羅亞・索隆 阿修羅壹霧銀
 *
 * 三頭六臂的劍士
 * 將技能屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "技" ? 2 : 1;
}
