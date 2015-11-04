/*
 * 以藏
 *
 * 堅毅的女形
 * 將技能屬性角色的攻擊力及回復力提升2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "技" ? 2 : 1;
}
