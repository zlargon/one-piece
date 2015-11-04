/*
 * 喬拉可爾・密佛格
 *
 * 小刀一斬
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
