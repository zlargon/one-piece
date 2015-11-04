/*
 * 騙人布
 *
 * 吹牛的狙擊手
 * 將射擊型角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "射擊") return 1.5;
    }
    return 1;
}
