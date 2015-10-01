var fetch           = require("node-fetch");
var cheerio         = require("cheerio");
var config          = require("../config.js");
var createCharacter = require("./character_create.js");

function str2num(str) {
    return parseInt(str.split(",").join(""));
};

function isInteger(num) {
    return typeof num === "number" && num % 1 === 0;
}

// fetch character data from Japan official website (http://onepiece-treasurecruise.com)
function fetchFromJapan(number, response) {

    var cb = typeof response === "function" ? response : function() {};
    if (!isInteger(number) || number < 1 || number > config.maxCharacterNumber.jp) {
        cb(number, new Error("Invalid parameter: number = " + number));
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
                            .setName("jp", $("#entry h1").text())
                            .setType(info1.eq(0).text())
                            .addClass(info1.eq(1).text())
                            .addClass(info1.eq(2).text())
                            .setStar(str2num(info1.eq(3).text()))
                            .setCost(str2num(info1.eq(4).text()))
                            .setCombo(str2num(info2.eq(1).text()))
                            .setMin(
                                str2num(min.eq(1).text()),
                                str2num(min.eq(2).text()),
                                str2num(min.eq(3).text()),
                                str2num(min.eq(4).text())
                            )
                            .setMax(
                                str2num(max.eq(1).text()),
                                str2num(max.eq(2).text()),
                                str2num(max.eq(3).text()),
                                str2num(max.eq(4).text())
                            )
                            .setSkill("jp", skill.eq(1).text(), skill.eq(3).text())
                            .setCaptain("jp", captain.eq(1).text(), captain.eq(3).text());

        cb(number, null, character);
    })

    .catch(function(error) {
        cb(number, error);
    });
};

// fetch character data from Taiwan official website (http://line-optc.com/tw)
function fetchFromTaiwan(number, response) {

    var cb = typeof response === "function" ? response : function() {};
    if (!isInteger(number) || number < 1 || number > config.maxCharacterNumber.tw) {
        cb(number, new Error("Invalid parameter: number = " + number));
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
                            .setName("tw", $("#entry h1").text())
                            .setType(info.eq(0).text())
                            .addClass(info.eq(1).text())
                            .setStar(str2num(info.eq(2).text()))
                            .setCost(str2num(info.eq(3).text()))
                            .setCombo(str2num(info.eq(4).text()))
                            .setMin(
                                str2num(min.eq(1).text()),
                                str2num(min.eq(2).text()),
                                str2num(min.eq(3).text()),
                                str2num(min.eq(4).text())
                            )
                            .setMax(
                                str2num(max.eq(1).text()),
                                str2num(max.eq(2).text()),
                                str2num(max.eq(3).text()),
                                str2num(max.eq(4).text())
                            )
                            .setSkill(
                                "tw",
                                skill.eq(1).text(),
                                skill.eq(3).text()
                            )
                            .setCaptain(
                                "tw",
                                captain.eq(1).text(),
                                captain.eq(3).text()
                            );

        cb(number, null, character);
    })

    .catch(function(error) {
        cb(number, error);
    });
};

/*
 * fetchCharacter
 *
 * @number
 * @response  function (number, error, character) {}
 */
function fetchCharacter(number, response) {
    var cb = typeof response === "function" ? response : function() {};
    if (!isInteger(number) || number < 1) {
        cb(number, new Error("Invalid parameter: number = " + number));
        return;
    }

    // 1. Japan
    fetchFromJapan(number, function (num, error, character) {
        if (error !== null) {
            cb(num, new Error("fetching character no." + num + " from Japan FAILED"));
            console.error(error);
            return;
        }

        console.log("fetching character no." + num + " from Japan OK");

        // check whether the number of character is enable in Taiwan
        if (num > config.maxCharacterNumber.tw) {
            cb(num, null, character);
            return;
        }

        // 2. Taiwan
        fetchFromTaiwan(num, function (num, error, characterTw) {
            if (error !== null) {
                console.log("fetching character no." + num + " from Taiwan FAILED");
                console.error(error);
                cb(num, null, character);
                return;
            }

            console.log("fetching character no." + num + " from Taiwan OK");

            // update chinese name, skill, captain
            character.name.tw    = characterTw.name.tw;
            character.skill.tw   = characterTw.skill.tw;
            character.captain.tw = characterTw.captain.tw;

            cb(num, null, character);
            return;
        });
    });
};

// export
module.exports = fetchCharacter;
