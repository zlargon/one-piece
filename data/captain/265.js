module.exports = function(param) {
    var classes = param.character.classes;
    for (var i = 0; i < classes.length; i++) {
        if (classes[i] === "斬擊") return 1.5;
    }
    return 1;
}
