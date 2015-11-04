/*
 * Mr.9
 *
 * 特技表演者
 * 將打擊型角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "打擊") return 1.2;
    }
    return 1;
}
