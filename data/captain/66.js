/*
 * 抓狂的惡龍　鯊魚齒輪
 *
 * 抓狂力量
 * 將斬擊型角色的攻擊力提升2倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "斬擊") return 2;
    }
    return 1;
}
