var fs            = require("fs");
var path          = require("path");
var characterList = require("../data/character_list.js");

function addComment(n) {
    var file = path.resolve(__dirname, `../data/captain/${n}.js`);

    try {
        var content = fs.readFileSync(file, "utf8");
        var character = characterList[n];
        var comment =
`/*
 * ${character.name.tw}
 *
 * ${character.captain.tw.name}
 * ${character.captain.tw.content}
 *
 */
`
        fs.writeFileSync(file, comment + content, "utf8");
    } catch (e) {
        console.log(e);
    }
}

// example:
// for (var i = 1; i <= 100; i++) {
//     addComment(i);
// }
