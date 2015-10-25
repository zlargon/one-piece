/*
 * Mr.9  熱血九號毅力球棒
 *
 * 2刀流特技表演者
 * 將打擊型角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "打擊") return 1.5;
    }
    return 1;
}
