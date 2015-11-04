/*
 * 巴其
 *
 * 華麗地戰鬥吧！
 * 將知識屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 1.5 : 1;
}
