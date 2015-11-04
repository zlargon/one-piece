/*
 * 騙人布 騙人布反擊
 *
 * 擁有覺悟的海上狙擊手
 * 將心靈屬性角色的攻擊力提升1.2倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "心" ? 1.2 : 1;
}
