var config        = require("../config.js");
var characterList = require(config.path.characterData);

var isNatural = function isNatural(num) {
    return typeof num === "number" && num > 0 && num % 1 === 0;
};

var linerAttr = function linerAttr(attr, level, character) {
    var inc = (character.max[attr] - character.min[attr]) / (character.max.LV - character.min.LV);
    var value = inc * (level - character.min.LV) + character.min[attr];
    return Math.floor(value);
};


// Member.create
var createMember = function createMember(obj) {
    if (typeof obj !== "object" ||
        !isNatural(obj.no)      ||
        !isNatural(obj.level)) {
        return null;
    }

    var character = characterList[obj.no];
    if (obj.level > character.max.LV) {
        console.error("level should not over than MAX level");
        console.log(JSON.stringify(character, null, 2));
        return null;
    }

    return {
        no: obj.no,
        level: obj.level,
        name: character.name,
        type: character.type,
        classes: character.classes,
        star: character.star,
        cost: character.cost,
        combo: character.combo,

        // FIXME: some character's attribute doesn't grow linearly
        HP:  linerAttr("HP",  obj.level, character),
        ATK: linerAttr("ATK", obj.level, character),
        RCV: linerAttr("RCV", obj.level, character),
        skill: character.skill,
        captain: character.captain
    };
}

// export
module.exports = {
    create: createMember
};
