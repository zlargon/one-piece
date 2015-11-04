/*
 * 老鼠
 *
 * 超強交際手腕
 * 將知識屬性角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 1.2 : 1;
}
