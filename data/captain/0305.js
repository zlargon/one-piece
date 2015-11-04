module.exports = function(param) {
    var type = param.character.type;
    return type === "心" ? 1.5 : 1;
}
