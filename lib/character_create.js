function isInteger(num) {
    return typeof num === "number" && num % 1 === 0;
}

function isWord(str) {
    return typeof str === "string" && str.length > 0;
}

function isNone(str) {
    return str === "なし" || str === "無" || str.length === 0;
}

function Character() {
    this.no = 0;
    this.name = { jp: null, tw: null };
    this.type = null;
    this.classes = [];
    this.star = 0;
    this.cost = 0;
    this.combo = 0;
    this.min = { lv: 0, hp: 0, atk: 0, rcv: 0 };
    this.max = { lv: 0, hp: 0, atk: 0, rcv: 0 };
    this.skill = {
        jp: { name: null, content: null },
        tw: { name: null, content: null }
    };
    this.captain = {
        jp: { name: null, content: null },
        tw: { name: null, content: null }
    };
}

Character.prototype.setNo = function setNo(no) {
    if (!isInteger(no) || no < 1) {
        throw new Error("Invalid parameter: " + no);
    }

    this.no = no;
    return this;
}

Character.prototype.setName = function setName(lang, name) {
    if (isWord(lang) === false) {
        throw new Error("Invalid parameter: " + lang);
    }

    if (!isWord(name)) {
        throw new Error("Invalid parameter: " + name);
    }

    this.name[lang] = name;
    return this;
}

Character.prototype.setType = function setType(type) {
    if (!isWord(type)) {
        throw new Error("Invalid parameter: " + type);
    }

    // translate into chinese
    switch (type) {
        case "力属性": type = "力"; break;
        case "技属性": type = "技"; break;
        case "速属性": type = "速"; break;
        case "心属性": type = "心"; break;
        case "知属性": type = "知"; break;
    }

    this.type = type;
    return this;
}

Character.prototype.addClass = function addClass(classes) {
    if (!isWord(classes)) {
        throw new Error("Invalid parameter: " + classes);
    }

    // ignore classes "-"
    if (classes.length === 1 || classes === "-") {
        return this;
    }

    // translate into chinese
    switch (classes) {
        case "格闘": classes = "格鬥"; break;
        case "斬撃": classes = "斬擊"; break;
        case "打突": classes = "打擊"; break;
        case "射撃": classes = "射擊"; break;
        case "自由": classes = "自由"; break;
        case "博識": classes = "博識"; break;
        case "強化用": classes = "強化用"; break;
        case "進化用": classes = "進化用"; break;
    }

    this.classes.push(classes);
    return this;
}

Character.prototype.setStar = function setStar(star) {
    if (!isInteger(star) || star < 1) {
        throw new Error("Invalid parameter: " + star);
    }

    this.star = star;
    return this;
}

Character.prototype.setCost = function setCost(cost) {
    if (!isInteger(cost) || cost < 1) {
        throw new Error("Invalid parameter: " + cost);
    }

    this.cost = cost;
    return this;
}

Character.prototype.setCombo = function setCombo(combo) {
    if (!isInteger(combo) || combo < 1) {
        throw new Error("Invalid parameter: " + combo);
    }

    this.combo = combo;
    return this;
}

Character.prototype.setMin = function setMin(lv, hp, atk, rcv) {
    if (!isInteger(lv) || lv < 1 || lv > 99) {
        throw new Error("Invalid parameter: lv = " + lv);
    }

    if (!isInteger(hp)) {
        throw new Error("Invalid parameter: hp = " + hp);
    }

    if (!isInteger(atk)) {
        throw new Error("Invalid parameter: atk = " + atk);
    }

    if (!isInteger(rcv)) {
        throw new Error("Invalid parameter: rcv = " + rcv);
    }

    this.min.lv = lv;
    this.min.hp = hp;
    this.min.atk = atk;
    this.min.rcv = rcv;
    return this;
}

Character.prototype.setMax = function setMax(lv, hp, atk, rcv) {
    if (!isInteger(lv) || lv < 1 || lv > 99) {
        throw new Error("Invalid parameter: lv = " + lv);
    }

    if (!isInteger(hp)) {
        throw new Error("Invalid parameter: hp = " + hp);
    }

    if (!isInteger(atk)) {
        throw new Error("Invalid parameter: atk = " + atk);
    }

    if (!isInteger(rcv)) {
        throw new Error("Invalid parameter: rcv = " + rcv);
    }

    this.max.lv = lv;
    this.max.hp = hp;
    this.max.atk = atk;
    this.max.rcv = rcv;
    return this;
}

Character.prototype.setSkill = function setSkill(lang, name, content) {
    if (isWord(lang) === false) {
        throw new Error("Invalid parameter: lang = " + lang);
    }

    if (!isWord(name)) {
        throw new Error("Invalid parameter: name = " + name);
    }

    if (!isWord(content)) {
        throw new Error("Invalid parameter: content = " + content);
    }

    this.skill[lang].name = isNone(name) ? null : name;
    this.skill[lang].content = isNone(content) ? null : content;
    return this;
}

Character.prototype.setCaptain = function setCaptain(lang, name, content) {
    if (isWord(lang) === false) {
        throw new Error("Invalid parameter: lang = " + lang);
    }

    if (!isWord(name)) {
        throw new Error("Invalid parameter: name = " + name);
    }

    if (!isWord(content)) {
        throw new Error("Invalid parameter: content = " + content);
    }

    this.captain[lang].name = isNone(name) ? null : name;
    this.captain[lang].content = isNone(content) ? null : content;
    return this;
}

// exports
module.exports = function createCharacter() {
    return new Character();
};
