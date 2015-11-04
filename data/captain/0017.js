/*
 * 香吉士
 *
 * 好色的廚師
 * 將速度屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 1.5 : 1;
}
