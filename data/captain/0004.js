/*
 * 蒙其・D・魯夫 2檔
 *
 * 興奮力量
 * 將力量屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 2 : 1;
}
