/*
 * 克洛船長
 *
 * 躡步
 * 將速度屬性角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 1.2 : 1;
}
