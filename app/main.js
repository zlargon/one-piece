var attackAnalysis = require("../lib/attackAnalysis.js");
var characterList  = require("../data/character_list.js");

if (typeof window === "object") {
    window.onePiece = {
        attackAnalysis: attackAnalysis,
        characterList: characterList
    }
}
