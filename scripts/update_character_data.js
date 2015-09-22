var fs        = require("fs");
var config    = require("../config.js");
var character = require("../lib/character.js");

// update character data
var updateData = function updateData() {
    var characterList = require(config.path.characterData);

    var updateList = [];
    var getCharacter = function getCharacter(no) {

        // work is done. write the character list back to the file
        if (no > config.maxCharacterNumber.jp) {
            var content = "module.exports = " + JSON.stringify(characterList, null, 2) + ";\n";
            fs.writeFile(config.path.characterData, content, function (err) {
                if (err !== null) throw err;
                console.log("Character no." + updateList.join(", ") + " has been updated");
            });
            return;
        }

        // character data is already exist
        if (characterList[no] !== null && characterList[no].name.jp !== null) {
            getCharacter(no + 1);
            return;
        }

        // fetch character no.XX
        character.fetch({ from: no, to: no }, function (num, err, list) {
            if (err !== null) {
                console.error(err);
            } else {
                updateList.push(no);
                characterList[no] = list[no];
            }

            getCharacter(no + 1);
        });
    };

    // start fetching character data
    getCharacter(1);
}

// check whether the file is exist
fs.stat(config.path.characterData, function(err, stat) {

    // 1. file is exist, update the data
    if (err === null) {
        updateData();
        return;
    }

    // 2. file is exist, but read file error
    if (err.code !== "ENOENT") {
        console.error(err);
        return;
    }

    // 3. file is not exist. fetch all the character data, and write into the file
    character.fetch({ from: 1, to: config.maxCharacterNumber.jp }, function (num, err, list) {
        // fetch character data error
        if (err !== null) {
            console.error(err);
            return;
        }

        // write into the file
        var content = "module.exports = " + JSON.stringify(list, null, 2) + ";\n";
        fs.writeFile(config.path.characterData, content, function (err) {
            // write file error
            if (err !== null) {
                console.error(err);
                return;
            }

            // done
            console.log("Character no." + num.from + " ~ " + num.to + " has been written into " + config.path.characterData);
        });
    });
});
