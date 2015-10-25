module.exports = function(param) {
    var type = param.character.type;
    return type === "技" ? 2.5 : 1;
}
