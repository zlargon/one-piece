/*
 * 香吉士 惡魔風腳
 *
 * 擁有騎士精神的廚師
 * 將速度屬性角色的攻擊力及體力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 1.5 : 1;
}