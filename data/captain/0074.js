/*
 * 波特卡斯・D・艾斯
 *
 * 燃燒的身體
 * 將速度屬性角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "速" ? 2 : 1;
}