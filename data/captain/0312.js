module.exports = function(param) {
    var timingHistory = param.timingHistory;

    var sum = 0;
    for (var i = 0; i < timingHistory.length; i++) {
        sum = timingHistory[i] === "bad" ? sum + 1 : 0;
        if (sum >= 3) return 3.5;
    }

    return 1;
}
