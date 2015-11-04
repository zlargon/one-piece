/*
 * 蒙其・D・魯夫 ３檔
 *
 * 巨人力量
 * 連續擊出3次以上PERFECT，之後的角色攻擊力將會提升3.5倍
 *
 */
module.exports = function(param) {
    var timingHistory = param.timingHistory;

    var perfectSum = 0;
    for (var i = 0; i < timingHistory.length; i++) {
        perfectSum = timingHistory[i] === "perfect" ? perfectSum + 1 : 0;
        if (perfectSum >= 3) return 3.5;
    }

    return 1;
}
