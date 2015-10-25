/*
 * 廚師香吉士 燒石燉菜
 *
 * 使用踢擊的廚師
 * 將速度屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 1.5 : 1;
}
