var fs        = require("fs");
var path      = require("path");
var config    = require("../config.js");
var character = require("../lib/character.js");

function updateCharacter(number) {
    var file = path.resolve(config.path.characterFolder, number + ".js");

    function nextStep () {
        if (number >= config.maxCharacterNumber.jp) {
            console.log("ALL DONE");
        } else {
            updateCharacter(number + 1);
        }
    };

    fs.stat(file, function(err, stat) {
        // 1. file is exist, update the data
        if (err === null) {
            nextStep();
            return;
        }

        // 2. file is exist, but read file error
        if (err.code !== "ENOENT") {
            console.error(err);
            return;
        }

        // 3. file is not exist. fetch all the character data, and write into the file
        character.fetch(number, function(no, err, character) {
            if (err !== null) {
                console.log(err);
                nextStep();
                return;
            }

            var content = "module.exports = " + JSON.stringify(character, null, 2) + ";\n";
            fs.writeFile(file, content, function (err) {
                if (err !== null) throw err;
                nextStep();
            });
        });
    });
}

// start from character no.1
updateCharacter(1);
