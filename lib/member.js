var Character = require("../data/character_data.json");

var isNatural = function isNatural(num) {
    return typeof num === "number" && num > 0 && num % 1 === 0;
};

// Member.create
var createMember = function createMember(obj) {
    if (typeof obj !== "object" || !isNatural(obj.no) || !isNatural(obj.level)) {
        return null;
    }

    var getAttr = function getAttr(attr, level, character) {
        var inc = (character.max[attr] - character.min[attr]) / (character.max.LV - character.min.LV);
        var value = inc * (level - character.min.LV) + character.min[attr];
        return Math.floor(value);
    };

    var c = Character[obj.no];
    return {
        no: obj.no,
        level: obj.level,
        name: c.name,
        type: c.type,
        classes: c.classes,
        star: c.star,
        cost: c.cost,
        combo: c.combo,
        HP:  getAttr("HP",  obj.level, c),
        ATK: getAttr("ATK", obj.level, c),
        RCV: getAttr("RCV", obj.level, c),
        skill: c.skill,
        captain: c.captain
    };
}

// export
module.exports = {
    create: createMember
};
