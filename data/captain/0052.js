/*
 * 主廚哲普
 *
 * 義肢飛踢
 * 將格鬥型角色的攻擊力提升2.5倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "格鬥") return 2.5;
    }
    return 1;
}
