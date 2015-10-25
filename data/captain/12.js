/*
 * 娜美 雷霆天候
 *
 * 操縱天氣的航海士
 * 將知識屬性角色的攻擊力和體力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 1.5 : 1;
}
