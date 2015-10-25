var OnePiece = require("one-piece");

// [雙週] 亞爾麗塔 30 體 - 哲普隊
var BOSS = { type: "力", defense: 10000 };   // 滑滑女防禦力 20000, 降半防 10000
var Team = [
    { no: 15, attack: 1080, bead: 1, timing: "perfect" },                 // 騙人布 Lv.50
    { no: 34, attack: 485,  bead: 1, timing: "perfect" },                 // 笨兒子 Lv.50
    { no: 52, attack: 908,  bead: 1, timing: "perfect", captain: true },  // 哲普 Lv.50
    { no: 52, attack: 908,  bead: 1, timing: "perfect", captain: true },  // 哲普 Lv.50
    { no: 62, attack: 759,  bead: 1, timing: "great"   },                 // 歐比 Lv.50
    { no: 18, attack: 496,  bead: 2, timing: "perfect" },                 // 香吉士 Lv.35
];

// 開始分析
OnePiece.attackAnalysis({
    boat: 1.2,      // 梅莉號 Lv.6
    enemy: BOSS,
    team: Team
});
