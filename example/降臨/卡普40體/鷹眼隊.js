var OnePiece = require("one-piece");

// [降臨] 卡普 40 體 - 鷹眼隊
var 卡普 = { type: "心", defense: 100 };
var 斬隊 = [
    { no: 8,   attack: 1250, bead: 1, timing: "perfect" },                 // 索隆 Lv.87
    { no: 227, attack: 1285, bead: 1, timing: "perfect", captain: true },  // 鷹眼 Lv.99
    { no: 227, attack: 1285, bead: 1, timing: "perfect", captain: true },  // 鷹眼 Lv.99
    { no: 39,  attack: 702,  bead: 1, timing: "perfect" },                 // 巴其 Lv.61
    { no: 66,  attack: 1491, bead: 1, timing: "perfect" },                 // 惡龍 Lv.99
    { no: 255, attack: 1155, bead: 1, timing: "perfect" },                 // 花劍 Lv.71
];

// 開始分析
OnePiece.attackAnalysis({
    enemy: 卡普,
    boat: 1.5,      // 梅莉號 Lv.10
    team: 斬隊
});
