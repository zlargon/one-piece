/*
 * 娜美 幸福的一擊
 *
 * 不知羞恥的航海士
 * 將知識屬性角色的攻擊力提升2.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 2.5 : 1;
}
