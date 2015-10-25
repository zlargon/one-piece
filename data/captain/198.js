/*
 * 火箭砲少尉 海軍本部
 *
 * 正義的知識
 * 將射擊型角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "射擊") return 1.5;
    }
    return 1;
}
