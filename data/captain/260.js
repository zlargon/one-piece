module.exports = function(param) {
    var type = param.character.type;
    return type === "力" ? 3 : 1;
}
