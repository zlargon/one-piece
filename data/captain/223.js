/*
 * 騙人布 衝撃
 *
 * 勇敢的海上狙擊手
 * 將心靈屬性角色的攻擊力提升1.5倍
 *
 */
module.exports = function(param) {
    var type = param.character.type;
    return type === "心" ? 1.5 : 1;
}
