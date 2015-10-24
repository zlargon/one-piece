var config = require("../config.js");

var characterList = [];
for (var i = 1; i <= config.maxCharacterNumber.jp; i++) {
    try {
        characterList[i] = require(`../data/character/${i}.js`);
        characterList[i].captain.magnification = require(`../data/captain/${i}.js`)
    } catch (e) {
        // console.log("character file " + i + ".js is not exist");
    }
}

module.exports = characterList;
