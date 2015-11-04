/*
 * 鷹眼密佛格
 *
 * 黑刀一斬
 * 將斬擊型角色的攻擊力提升2.5倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "斬擊") return 2.5;
    }
    return 1;
}
