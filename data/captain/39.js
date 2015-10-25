/*
 * 小丑巴其
 *
 * 華麗地死吧！！
 * 將知識屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 2 : 1;
}
