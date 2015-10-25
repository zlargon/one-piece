/*
 * 娜美 風和日麗
 *
 * 操控天氣的航海士
 * 將知識屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 2 : 1;
}
