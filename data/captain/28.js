/*
 * 近海的王者
 *
 * 海王類的獠牙
 * 將格鬥型角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "格鬥") return 1.2;
    }
    return 1;
}
