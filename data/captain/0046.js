/*
 * 百計的克洛
 *
 * 躡步（百計的克洛）
 * 將速度屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 1.5 : 1;
}
