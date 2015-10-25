/*
 * 娜美 龍捲風天候
 *
 * 狡猾的航海士
 * 將知識屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "知" ? 1.5 : 1;
}
