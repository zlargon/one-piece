var fs     = require("fs");
var path   = require("path");
var config = require("../config.js");

var characterList = [];
for (var i = 1; i <= config.maxCharacterNumber.jp; i++) {
    var file = path.resolve(config.path.characterFolder, i + ".js");
    try {
        fs.statSync(file);
        characterList[i] = require(file);
    } catch (e) {
        console.log("character file " + i + ".js is not exist");
    }
}

module.exports = characterList;
