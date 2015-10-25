module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "格鬥") return 1.2;
    }
    return 1;
}
