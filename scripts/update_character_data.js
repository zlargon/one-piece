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

    try {
        fs.statSync(file);
        nextStep();
    } catch (e) {
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
    }
}

// start from character no.1
updateCharacter(1);
