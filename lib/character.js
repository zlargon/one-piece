var fetch   = require("node-fetch");
var cheerio = require("cheerio");
var config  = require("../config.js");

// sub-function
var str2num = function str2num(str) {
    return parseInt(str.split(",").join(""));
};

var isInteger = function isInteger(num) {
    return typeof num === "number" && num % 1 === 0;
};

var isWord = function isWord(str) {
    return typeof str === "string" && str.length > 0;
};


// Character.create
var createCharacter = function createCharacter() {

    var attr = function attr(value) {
        var isMember = typeof value !== "function";
        return {
            value: value,
            writable: isMember,
            enumerable: isMember,
            configurable: false
        }
    };

    var isValidAttr = function isValidAttr(obj) {
        return typeof obj === "object"  &&
                isInteger(obj.LV)       &&
                isInteger(obj.HP)       &&
                isInteger(obj.ATK)      &&
                isInteger(obj.RCV)      &&
                obj.LV > 0              &&
                obj.LV < 100;
    };

    var verifyNameContent = function verifyNameContent(obj) {
        if (typeof obj         !== "object" ||
            typeof obj.name    !== "string" ||
            typeof obj.content !== "string") {
            throw new Error("name or content " + JSON.stringify(obj) + " is invalid");
        }

        var isEmpty = function isEmpty(str) {
            return str === "なし" || str === "無" || str.length === 0;
        }

        return {
            name:    isEmpty(obj.name)    ? null : obj.name,
            content: isEmpty(obj.content) ? null : obj.content
        }
    };

    var Character = function Character() {};
    var instance = new Character();

    Object.defineProperties(instance, {
        no:      attr(0),
        name:    attr({ jp: null, tw: null }),
        type:    attr(null),
        classes: attr([]),
        star:    attr(0),
        cost:    attr(0),
        combo:   attr(0),
        min:     attr({ LV: 0, HP: 0, ATK: 0, RCV: 0 }),
        max:     attr({ LV: 0, HP: 0, ATK: 0, RCV: 0 }),
        skill:   attr({
            jp: { name: null, content: null },
            tw: { name: null, content: null }
        }),
        captain: attr({
            jp: { name: null, content: null },
            tw: { name: null, content: null }
        }),

        setNo: attr(function setNo(no) {
            if (!isInteger(no) || no < 1) {
                throw new Error("no '" + no + "' is invalid");
            }

            instance.no = no;
            return instance;
        }),

        setNameJp: attr(function setNameJp(name) {
            if (!isWord(name)) {
                throw new Error("name '" + name + "' is invalid");
            }

            instance.name.jp = name;
            return instance;
        }),

        setNameTw: attr(function setNameTw(name) {
            if (!isWord(name)) {
                throw new Error("name '" + name + "' is invalid");
            }

            instance.name.tw = name;
            return instance;
        }),

        setType: attr(function setType(type) {
            if (!isWord(type)) {
                throw new Error("type '" + type + "' is invalid");
            }

            // translate into chinese
            switch (type) {
                case "力属性": type = "力"; break;
                case "技属性": type = "技"; break;
                case "速属性": type = "速"; break;
                case "心属性": type = "心"; break;
                case "知属性": type = "知"; break;
            }

            instance.type = type
            return instance;
        }),

        addClass: attr(function addClass(classes) {
            if (!isWord(classes)) {
                throw new Error("classes '" + classes + "' is invalid");
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

            // ignore classes "-"
            if (classes !== "-") {
                instance.classes.push(classes);
            }
            return instance;
        }),

        setStar: attr(function setStar(star) {
            if (!isInteger(star) || star < 1) {
                throw new Error("star '" + star + "' is invalid");
            }

            instance.star = star;
            return instance;
        }),

        setCost: attr(function setCost(cost) {
            if (!isInteger(cost) || cost < 1) {
                throw new Error("cost '" + cost + "' is invalid");
            }

            instance.cost = cost;
            return instance;
        }),

        setCombo: attr(function setCombo(combo) {
            if (!isInteger(combo) || combo < 1) {
                throw new Error("combo '" + combo + "' is invalid");
            }

            instance.combo = combo;
            return instance;
        }),

        setMin: attr(function setMin(obj) {
            if (!isValidAttr(obj)) {
                throw new Error("attribute " + obj + " is invalid");
            }

            instance.min = {
                LV:  obj.LV,
                HP:  obj.HP,
                ATK: obj.ATK,
                RCV: obj.RCV
            };
            return instance;
        }),

        setMax: attr(function setMax(obj) {
            if (!isValidAttr(obj)) {
                throw new Error("attribute " + obj + " is invalid");
            }

            instance.max = {
                LV:  obj.LV,
                HP:  obj.HP,
                ATK: obj.ATK,
                RCV: obj.RCV
            };
            return instance;
        }),

        setSkillJp: attr(function setSkillJp(obj) {
            instance.skill.jp = verifyNameContent(obj);
            return instance;
        }),

        setSkillTw: attr(function setSkillTw(obj) {
            instance.skill.tw = verifyNameContent(obj);
            return instance;
        }),

        setCaptainJp: attr(function setCaptainJp(obj) {
            instance.captain.jp = verifyNameContent(obj);
            return instance;
        }),

        setCaptainTw: attr(function setCaptainTw(obj) {
            instance.captain.tw = verifyNameContent(obj);
            return instance;
        })
    });

    return instance;
};

// fetch character data from Japan official website (http://onepiece-treasurecruise.com)
var fetchFromJapan = function fetchFromJapan(number, response) {

    var cb = typeof response === "function" ? response : function() {};
    if (!isInteger(number) || number < 1 || number > config.maxCharacterNumber.jp) {
        cb(number, new Error("number '" + number + "' is invalid"));
        return;
    }

    fetch("http://onepiece-treasurecruise.com/c-" + number, {
        method: "GET",
        timeout: 30 * 1000
    })

    .then(function(res) {
        return res.text();
    })

    .then(function(html) {
        var $ = cheerio.load(html);
        var info1   = $('#left table').eq(1).find("td");
        var info2   = $('#left table').eq(2).find("td");
        var min     = $('#left table').eq(3).find("tr").eq(1).find("td");
        var max     = $('#left table').eq(3).find("tr").eq(2).find("td");
        var skill   = $('#left table').eq(4).find("td");
        var captain = $('#left table').eq(5).find("td");

        var character = createCharacter()
                        .setNo(number)
                        .setNameJp($("#entry h1").text())
                        .setType(info1.eq(0).text())
                        .addClass(info1.eq(1).text())
                        .addClass(info1.eq(2).text())
                        .setStar(str2num(info1.eq(3).text()))
                        .setCost(str2num(info1.eq(4).text()))
                        .setCombo(str2num(info2.eq(1).text()))
                        .setMin({
                            LV:  str2num(min.eq(1).text()),
                            HP:  str2num(min.eq(2).text()),
                            ATK: str2num(min.eq(3).text()),
                            RCV: str2num(min.eq(4).text())
                        })
                        .setMax({
                            LV:  str2num(max.eq(1).text()),
                            HP:  str2num(max.eq(2).text()),
                            ATK: str2num(max.eq(3).text()),
                            RCV: str2num(max.eq(4).text())
                        })
                        .setSkillJp({
                            name:    skill.eq(1).text(),
                            content: skill.eq(3).text()
                        })
                        .setCaptainJp({
                            name:    captain.eq(1).text(),
                            content: captain.eq(3).text()
                        });

        cb(number, null, character);
    })

    .catch(function(error) {
        cb(number, error);
    });
};

// fetch character data from Taiwan official website (http://line-optc.com/tw)
var fetchFromTaiwan = function fetchFromTaiwan(number, response) {

    var cb = typeof response === "function" ? response : function() {};
    if (!isInteger(number) || number < 1 || number > config.maxCharacterNumber.tw) {
        cb(number, new Error("number '" + number + "' is invalid"));
        return;
    }

    fetch("http://line-optc.com/tw/c-" + number, {
        method: "GET",
        timeout: 30 * 1000
    })

    .then(function(res) {
        return res.text();
    })

    .then(function(html) {
        var $ = cheerio.load(html);
        var info    = $('#left table').eq(1).find("td");
        var min     = $('#left table').eq(2).find("tr").eq(1).find("td");
        var max     = $('#left table').eq(2).find("tr").eq(2).find("td");
        var skill   = $('#left table').eq(3).find("td");
        var captain = $('#left table').eq(4).find("td");

        var character = createCharacter()
                            .setNo(number)
                            .setNameTw($("#entry h1").text())
                            .setType(info.eq(0).text())
                            .addClass(info.eq(1).text())
                            .setStar(str2num(info.eq(2).text()))
                            .setCost(str2num(info.eq(3).text()))
                            .setCombo(str2num(info.eq(4).text()))
                            .setMin({
                                LV:  str2num(min.eq(1).text()),
                                HP:  str2num(min.eq(2).text()),
                                ATK: str2num(min.eq(3).text()),
                                RCV: str2num(min.eq(4).text())
                            })
                            .setMax({
                                LV:  str2num(max.eq(1).text()),
                                HP:  str2num(max.eq(2).text()),
                                ATK: str2num(max.eq(3).text()),
                                RCV: str2num(max.eq(4).text())
                            })
                            .setSkillTw({
                                name:    skill.eq(1).text(),
                                content: skill.eq(3).text()
                            })
                            .setCaptainTw({
                                name:    captain.eq(1).text(),
                                content: captain.eq(3).text()
                            });

        cb(number, null, character);
    })

    .catch(function(error) {
        cb(number, error);
    });
};

/*
 * Character.fetch
 *
 * @number    { from: 1, to: 100 }
 * @response  function (number, error, characterList) {}
 */
var fetchCharacter = function fetchCharacter(number, response) {
    var cb = typeof response === "function" ? response : function() {};
    if (typeof number !== "object"  ||
        !isInteger(number.from)     ||
        !isInteger(number.to)       ||
        number.from > number.to) {

        cb(number, new Error("number from " + number.from + " to " + number.to + " is invalid"));
        return;
    }

    var list = [];
    var getCharacter = function getCharacter(num) {
        // 1. Japan
        fetchFromJapan(num, function (num, error, character) {
            if (error !== null) {
                console.log("fetching character no." + num + " from Japan FAILED");
                console.error(error);
                character = createCharacter().setNo(num);
            } else {
                console.log("fetching character no." + num + " from Japan OK");
            }

            // add to list
            list[num] = character;

            // check whether the number of character is enable in Taiwan
            if (num > config.maxCharacterNumber.tw) {
                if (num === number.to) {
                    cb(number, null, list);
                } else {
                    getCharacter(num + 1);  // get next one
                }
                return;
            }

            // 2. Taiwan
            fetchFromTaiwan(num, function (num, error, character) {
                if (error !== null) {
                    console.log("fetching character no." + num + " from Taiwan FAILED");
                    console.error(error);
                    character = createCharacter().setNo(num);
                } else {
                    console.log("fetching character no." + num + " from Taiwan OK");
                }

                // update chinese name, skill, captain
                list[num].name.tw    = character.name.tw;
                list[num].skill.tw   = character.skill.tw;
                list[num].captain.tw = character.captain.tw;

                // 3. all done, or to get the next one
                if (num === number.to) {
                    cb(number, null, list);
                } else {
                    getCharacter(num + 1);  // get next one
                }
            });
        });
    }

    // start fetching
    getCharacter(number.from);
};

// export
module.exports = {
    create: createCharacter,
    fetch: fetchCharacter
};
