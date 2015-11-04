var characterList = require("../data/characterList.js");

function getTypeMagnification(character, enemy) {
    if (character.type === "力" && enemy.type === "技") return 2;
    if (character.type === "技" && enemy.type === "速") return 2;
    if (character.type === "速" && enemy.type === "力") return 2;
    if (character.type === "心" && enemy.type === "知") return 2;
    if (character.type === "知" && enemy.type === "心") return 2;

    if (character.type === "技" && enemy.type === "力") return 0.5;
    if (character.type === "速" && enemy.type === "技") return 0.5;
    if (character.type === "力" && enemy.type === "速") return 0.5;

    return 1;
}

function attackAnalysis(param) {
    var attackList        = param.team;
    var boatMagnification = param.boat;
    var enemy             = param.enemy;

    function log (s) {
        if (param.log === false) return;
        console.log(s);
    }

    // get the captain
    var captainList = [];
    attackList.forEach(function (member) {
        if (member.captain === true) {
            captainList.push(characterList[member.no]);
        }
    });
    if (captainList.length > 2) {
        log(`captain should not more than two: ${captainList.length}`);
        return null;
    }

    // show captain effect content
    log("隊長：");
    captainList.forEach(function (captain, n) {
        var name = captain.name.tw !== null ? captain.name.tw : captain.name.jp;
        var content = captain.captainEffect.tw.content || captain.captainEffect.jp.content;
        log(`${n + 1}. ${name} No.${captain.no}`);
        log("   " + content);
        log("");
    });
    log("--------------------------------------------------------\n");

    var chain = 1;
    var timingHistory = [];
    var total = {
        attack: 0,
        combo: 0
    };
    attackList.forEach(function(member, n) {
        var character = characterList[member.no];
        var name = character.name.tw !== null ? character.name.tw : character.name.jp;

        log(`第 ${n + 1} 位：${name}`);
        log(`原始攻擊力 = ${member.attack}, Combo = ${character.combo}`);

        var magnification = {
            boat: boatMagnification,
            type: getTypeMagnification(character, enemy),
            captain: 1,
            bead: member.bead,
            chain: chain
        };

        // get captain magnification
        captainList.forEach(function(captain) {
            var fn = captain.captainEffect.magnification;
            magnification.captain *= fn({
                character: character,
                timingHistory: timingHistory
            });
        });

        // update timing history
        timingHistory.push(member.timing);

        log(
            `梅莉號：${magnification.boat}, `
          + `船長：${magnification.captain}, `
          + `屬珠：${magnification.bead}, `
          + `剋屬：${magnification.type}, `
          + `Chain：${magnification.chain}`
        );

        var baseAttack = member.attack
            * magnification.boat
            * magnification.type
            * magnification.captain
            * magnification.bead
            * magnification.chain;
        baseAttack = Math.round(baseAttack);
        log(`加成後攻擊力 = ${baseAttack}`);

        // Combo
        var perAttack = Math.round(baseAttack / character.combo);   // 四捨五入
        log(`單下攻擊力   = ${perAttack} (${character.combo} Combo)`);

        // Timing
        var combo = character.combo;
        var timing = 0;
        switch (member.timing) {
            case "bad":      combo -= 3;  chain =  1;    timing = 0;       break;
            case "good":     combo -= 3;  chain += 0;    timing = 0.3;     break;
            case "great":    combo -= 1;  chain += 0.1;  timing = 0.5939;  break;
            case "perfect":  combo -= 0;  chain += 0.3;  timing = 0.8999;  break;
            case "miss":     combo -= 0;  chain =  1;    timing = 0;       break;
        }
        chain = Math.round(chain * 10) / 10;

        // Damage
        var perDamage = perAttack - enemy.defense;
        if (perDamage < 1) perDamage = 1;

        var finalDamage = perAttack * (character.combo * timing + 1) - enemy.defense;
        finalDamage = Math.round(finalDamage);
        if (finalDamage < 1) finalDamage = 1;

        log(`前 ${combo - 1} 下傷害  = ${perDamage}`);
        log(`最終傷害     = ${finalDamage} (${member.timing.toUpperCase()})\n`);

        // 累計傷害
        log("累計傷害：");
        var sum = 0;
        for (var i = 0; i < combo - 1; i++) {
            sum += perDamage;
            log(sum);
        }
        log(`${sum + perDamage} => ${sum + finalDamage}`);
        sum += finalDamage;

        // Total
        total.attack += sum;
        total.combo += combo;

        log(`\nCombo = ${total.combo}`);
        log(`Total = ${total.attack}`);
        log("\n--------------------------------------------------------\n");
    });

    return total;
}

module.exports = attackAnalysis;
