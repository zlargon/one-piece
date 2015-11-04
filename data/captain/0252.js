/*
 * 裘斯
 *
 * 鑽石雙腕
 * 將速度屬性角色的攻擊力及體力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 2 : 1;
}
