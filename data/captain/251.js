/*
 * 不死鳥馬可
 *
 * 不死鳥的霸氣
 * 在攻擊開始前體力全滿時，將心靈屬性角色的攻擊力提升3倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "心" ? 3 : 1;
}
