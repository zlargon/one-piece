/*
 * Mr.王子 小牛肉SHOT
 *
 * 紳士廚師
 * 連續擊出2次以上PERFECT，之後的角色攻擊力將會提升2.5倍
 *
 */
module.exports = function(param) {
    var timingHistory = param.timingHistory;

    var perfectSum = 0;
    for (var i = 0; i < timingHistory.length; i++) {
        perfectSum = timingHistory[i] === "perfect" ? perfectSum + 1 : 0;
        if (perfectSum >= 2) return 2.5;
    }

    return 1;
}