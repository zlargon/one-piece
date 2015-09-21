var fetch   = require("node-fetch");
var cheerio = require("cheerio");

// subfunction: attr
var attr = function attr(value) {
    var isMember = typeof value !== "function";

    return {
        value: value,
        writable: isMember,
        enumerable: isMember,
        configurable: false
    }
};

// subfunction: str2num
var str2num = function str2num(str) {
    return parseInt(str.split(",").join(""));
};


// Character.create
var create = function create() {
    var Character = function Character() {};
    var instance = new Character();

    Object.defineProperties(instance, {
        no:      attr(0),
        name:    attr(null),
        type:    attr(null),
        classes: attr([]),
        star:    attr(0),
        cost:    attr(0),
        combo:   attr(0),
        min:     attr({ LV: 0, HP: 0, ATK: 0, RCV: 0 }),
        max:     attr({ LV: 0, HP: 0, ATK: 0, RCV: 0 }),

        setNo: attr(function setNo(no) {
            instance.no = no;
            return instance;
        }),

        setName: attr(function setNo(name) {
            instance.name = name;
            return instance;
        }),

        setType: attr(function setType(type) {
            instance.type = type;
            return instance;
        }),

        addClass: attr(function addClass(classes) {
            if (classes !== "-") {
                instance.classes.push(classes);
            }
            return instance;
        }),

        setStar: attr(function setStar(star) {
            instance.star = star;
            return instance;
        }),

        setCost: attr(function setCost(cost) {
            instance.cost = cost;
            return instance;
        }),

        setCombo: attr(function setCombo(combo) {
            instance.combo = combo;
            return instance;
        }),

        setMin: attr(function setMin(obj) {
            instance.min = {
                LV:  obj.LV,
                HP:  obj.HP,
                ATK: obj.ATK,
                RCV: obj.RCV
            };
            return instance;
        }),

        setMax: attr(function setMax(obj) {
            instance.max = {
                LV:  obj.LV,
                HP:  obj.HP,
                ATK: obj.ATK,
                RCV: obj.RCV
            };
            return instance;
        })
    });

    return instance;
};

// fetch character data from Japan official website (http://onepiece-treasurecruise.com)
var fetchFromJapan = function fetchFromJapan(number, response) {

    fetch("http://onepiece-treasurecruise.com/c-" + number, {
        method: "GET",
        timeout: 30 * 1000
    })

    .then(function(res) {
        return res.text();
    })

    .then(function(html) {
        var $ = cheerio.load(html);
        var info1 = $('#left table').eq(1).find("td");
        var info2 = $('#left table').eq(2).find("td");
        var min   = $('#left table').eq(3).find("tr").eq(1).find("td");
        var max   = $('#left table').eq(3).find("tr").eq(2).find("td");

        var character = create().setNo(number)
                                .setName($("#entry h1").text())
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
                                });

        response(number, null, character);
    })

    .catch(function(error) {
        response(number, error);
    });
};

// fetch character data from Taiwan official website (http://line-optc.com/tw)
var fetchFromTaiwan = function fetchFromTaiwan(number, response) {

    fetch("http://line-optc.com/tw/c-" + number, {
        method: "GET",
        timeout: 30 * 1000
    })

    .then(function(res) {
        return res.text();
    })

    .then(function(html) {
        var $ = cheerio.load(html);
        var info = $('#left table').eq(1).find("td");
        var min  = $('#left table').eq(2).find("tr").eq(1).find("td");
        var max  = $('#left table').eq(2).find("tr").eq(2).find("td");

        var character = create().setNo(number)
                                .setName($("#entry h1").text())
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
                                });

        response(number, null, character);
    })

    .catch(function(error) {
        response(number, error);
    });
};

// export
module.exports = {
    create: create,
    fetch: fetchFromJapan
};
