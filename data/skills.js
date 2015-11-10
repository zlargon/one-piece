import config from '../config';
import { TypeEffect, ClassEffect, BeadEffect, PerfectEffect, OrderEffect } from './GeneralEffect';

let captain = [];
let SpecialAbility = [];
for (let i = 0; i <= config.maxCharacterNumber.jp; i++) {
  captain[i] = () => 1;
  SpecialAbility[i] = null;
}

// 蒙其・D・魯夫 伸縮自如的橡膠槍
// 將力量屬性角色的攻擊力提升為1.5倍
captain[2] = TypeEffect('力', 1.5);

// 蒙其・D・魯夫 伸縮自如的橡膠火箭砲
// 將力量屬性角色的攻擊力提升為1.5倍
captain[3] = TypeEffect('力', 1.5);

// 蒙其・D・魯夫 2檔
// 將力量屬性角色的攻擊力提升2倍
captain[4] = TypeEffect('力', 2);

// 羅羅亞・索隆
// 將技能屬性角色的攻擊力提升1.5倍
captain[5] = TypeEffect('技', 1.5);

// 羅羅亞・索隆 三・千・世・界
// 將技能屬性角色的攻擊力提升1.5倍
captain[6] = TypeEffect('技', 1.5);

// 羅羅亞・索隆 煩惱鳳
// 將技能屬性角色的攻擊力提升1.5倍
captain[7] = TypeEffect('技', 1.5);

// 羅羅亞・索隆 阿修羅壹霧銀
// 將技能屬性角色的攻擊力提升2倍
captain[8] = TypeEffect('技', 2);

// 娜美 龍捲風天候
// 將知識屬性角色的攻擊力提升1.5倍
captain[10] = TypeEffect('知', 1.5);

// 娜美 海市蜃樓天候
// 將知識屬性角色的攻擊力提升1.5倍
captain[11] = TypeEffect('知', 1.5);

// 娜美 雷霆天候
// 將知識屬性角色的攻擊力和體力提升1.5倍
captain[12] = TypeEffect('知', 1.5);

// 騙人布
// 將射擊型角色的攻擊力提升1.2倍
captain[13] = ClassEffect('射擊', 1.2);

// 騙人布 墨西哥辣椒星
// 將心靈屬性角色攻擊力提升1.5倍
captain[14] = TypeEffect('心', 1.5);

// 騙人布 黃金鐵鎚
// 將心靈屬性角色的攻擊力提升1.5倍
captain[15] = TypeEffect('心', 1.5);

// 狙擊王
// 將心靈屬性角色的攻擊力提升1.5倍
captain[16] = TypeEffect('心', 1.5);

// 香吉士
// 將速度屬性角色的攻擊力提升1.5倍
captain[17] = TypeEffect('速', 1.5);

// 廚師香吉士 燒石燉菜
// 將速度屬性角色的攻擊力提升1.5倍
captain[19] = TypeEffect('速', 1.5);

// 香吉士 惡魔風腳
// 將速度屬性角色的攻擊力及體力提升1.5倍
captain[20] = TypeEffect('速', 1.5);

// 近海的王者
// 將格鬥型角色的攻擊力提升1.2倍
captain[28] = ClassEffect('格鬥', 1.2);

// 摩奇＆利基
// 將心靈屬性角色的攻擊力提升1.5倍
captain[36] = TypeEffect('心', 1.5);

// 特技卡巴吉
// 將技能屬性角色的攻擊力提升1.5倍
captain[37] = TypeEffect('技', 1.5);

// 巴其
// 將知識屬性角色的攻擊力提升1.5倍
captain[38] = TypeEffect('知', 1.5);

// 小丑巴其
// 將知識屬性角色的攻擊力提升2倍
captain[39] = TypeEffect('知', 2);

// 布奇
// 將力量屬性角色的攻擊力提升1.2倍
captain[42] = TypeEffect('力', 1.2);

// 克洛船長
// 將速度屬性角色的攻擊力提升1.2倍
captain[45] = TypeEffect('速', 1.2);

// 百計的克洛
// 將速度屬性角色的攻擊力提升1.5倍
captain[46] = TypeEffect('速', 1.5);

// 鐵拳芬布迪
// 將力量屬性角色的攻擊力提升1.5倍
captain[49] = TypeEffect('力', 1.5);

// 主廚哲普
// 將格鬥型角色的攻擊力提升2.5倍
captain[52] = ClassEffect('格鬥', 2.5);

// 老鼠
// 將知識屬性角色的攻擊力提升1.2倍
captain[59] = TypeEffect('知', 1.2);

// 海牛呣
// 將力量屬性角色的攻擊力提升1.5倍
captain[60] = TypeEffect('力', 1.5);

// 惡龍
// 將斬擊型角色的攻擊力提升2倍
captain[65] = ClassEffect('斬擊', 2);

// 抓狂的惡龍　鯊魚齒輪
// 將斬擊型角色的攻擊力提升2倍
captain[66] = ClassEffect('斬擊', 2);

// 波特卡斯・D・艾斯
// 將速度屬性角色的攻擊力提升2倍
captain[74] = TypeEffect('速', 2);

// 波特卡斯・D・艾斯　鏡火炎
// 將速度屬性角色的攻擊力提升2.5倍
captain[75] = TypeEffect('速', 2.5);

// 傑克
// 將心靈屬性角色的攻擊力提升2倍
captain[76] = TypeEffect('心', 2);

// 紅髮傑克
// 將心靈屬性角色的攻擊力提升2.5倍
captain[77] = TypeEffect('心', 2.5);

// 戴手指虎的少尉 海軍本部
// 將力量屬性角色的攻擊力提升1.5倍
captain[194] = TypeEffect('力', 1.5);

// 佩劍的少尉 海軍本部
// 將技能屬性角色的攻擊力提升1.5倍
captain[195] = TypeEffect('技', 1.5);

// 薙刀少尉 海軍本部
// 將速度屬性角色的攻擊力提升1.5倍
captain[196] = TypeEffect('速', 1.5);

// 火箭砲少尉 海軍本部
// 將射擊型角色的攻擊力提升1.5倍
captain[198] = ClassEffect('射擊', 1.5);

// Mr.5 鼻空想砲
// 將力量屬性角色的攻擊力提升1.5倍
captain[199] = TypeEffect('力', 1.5);

// Mr.5 微風氣息炸彈
// 將力量屬性角色的攻擊力提升2倍
captain[200] = TypeEffect('力', 2);

// Miss All Sunday
// 於1回合內，將知識屬性的攻擊力提升1.5倍
SpecialAbility[209] = TypeEffect('知', 1.5);

// 妮可・羅賓
// 於1回合內，將知識屬性的攻擊力提升2倍
SpecialAbility[210] = TypeEffect('知', 2);

// Mr.9
// 將打擊型角色的攻擊力提升1.2倍
captain[211] = ClassEffect('打擊', 1.2);

// Mr.9  熱血九號毅力球棒
// 將打擊型角色的攻擊力提升1.5倍
captain[212] = ClassEffect('打擊', 1.5);

// 蒙其・D・魯夫 ３檔
// 連續擊出3次以上PERFECT，之後的角色攻擊力將會提升3.5倍
captain[217] = PerfectEffect(3, 3.5);

// 娜美 風和日麗
// 將知識屬性角色的攻擊力提升2倍
captain[220] = TypeEffect('知', 2);

// 娜美 幸福的一擊
// 將知識屬性角色的攻擊力提升2.5倍
captain[221] = TypeEffect('知', 2.5);

// 騙人布 騙人布反擊
captain[222] = TypeEffect('心', 1.2);  // 將心靈屬性角色的攻擊力提升1.2倍
SpecialAbility[222] = TypeEffect('心', 1.5);  // 於1回合內，將心靈屬性的攻擊力提升1.5倍

// 騙人布 衝撃
captain[223] = TypeEffect('心', 1.5);  // 將心靈屬性角色的攻擊力提升1.5倍
SpecialAbility[222] = TypeEffect('心', 2);    // 於1回合內，將心靈屬性的攻擊力提升2倍

// Mr.王子 羊肉SHOT
// 連續擊出2次以上PERFECT，之後的角色攻擊力將會提升2倍
captain[224] = PerfectEffect(2, 2);

// Mr.王子 小牛肉SHOT
// 連續擊出2次以上PERFECT，之後的角色攻擊力將會提升2.5倍
captain[225] = PerfectEffect(2, 2.5);

// 喬拉可爾・密佛格
// 將斬擊型角色的攻擊力提升2倍
captain[226] = ClassEffect('斬擊', 2);

// 鷹眼密佛格
// 將斬擊型角色的攻擊力提升2.5倍
captain[227] = ClassEffect('斬擊', 2.5);

// 雙鐵拳的芬布迪
// 將力量屬性角色的攻擊力提升1.5倍
captain[230] = TypeEffect('力', 1.5);

// 希娜
// 將速度屬性角色的攻擊力提升2倍
captain[231] = TypeEffect('速', 2);

// 黑檻的希娜
// 將速度屬性角色的攻擊力提升2倍
captain[232] = TypeEffect('速', 2);

captain[235] = ClassEffect('格鬥', 1.2);
captain[236] = ClassEffect('格鬥', 1.5);
captain[248] = TypeEffect('力', 2.5);
captain[249] = TypeEffect('力', 3);

// 馬可
// 在攻擊開始前體力全滿時，將心靈屬性角色的攻擊力提升3倍
captain[250] = TypeEffect('心', 3);

// 不死鳥馬可
// 在攻擊開始前體力全滿時，將心靈屬性角色的攻擊力提升3倍
captain[251] = TypeEffect('心', 3);

// 裘斯
// 將速度屬性角色的攻擊力及體力提升2倍
captain[252] = TypeEffect('速', 2);

// 鑽石裘斯
// 將速度屬性角色的攻擊力及體力提升2倍
captain[253] = TypeEffect('速', 2);

// 比斯塔
// 將知識屬性角色的攻擊力及體力提升2倍
captain[254] = TypeEffect('知', 2);

// 花劍比斯塔
// 將知識屬性角色的攻擊力及體力提升2倍
captain[255] = TypeEffect('知', 2);

// 以藏
// 將技能屬性角色的攻擊力及回復力提升2倍
captain[256] = TypeEffect('技', 2);

// 短槍以藏
// 將技能屬性角色的攻擊力及回復力提升2倍
captain[257] = TypeEffect('技', 2);

// 布朗明哥
// 將力量屬性角色的攻擊力及回復力提升2倍
captain[258] = TypeEffect('力', 2);

// 大槌布朗明哥
// 將力量屬性角色的攻擊力及回復力提升2倍
captain[259] = TypeEffect('力', 2);

// 艾德華・紐蓋特
// 當殘餘體力太少時，將海賊團的攻擊力提升3倍
captain[260] = () => 3;

// 白鬍子
// 當殘餘體力太少時，將海賊團的攻擊力提升3倍
captain[261] = () => 3;

// 克比上士
captain[263] = ClassEffect('格鬥', 2);  // 將格鬥型角色的攻擊力提升2倍
SpecialAbility[263] = BeadEffect(1.5);  // 於2回合內將海賊團全體成員的技能格影響力大幅提升

// 貝魯梅柏中士
// 將斬擊型角色的攻擊力及體力提升1.5倍
captain[265] = ClassEffect('斬擊', 1.5);

// 彩虹紋守護龍
// 將海賊團的攻擊力提升1.5倍
captain[267] = () => 1.5;

captain[290] = ClassEffect('射擊', 1.5);
captain[296] = ClassEffect('射擊', 2);
captain[297] = ClassEffect('射擊', 2);
captain[299] = TypeEffect('技', 2);
captain[305] = TypeEffect('心', 1.5);
captain[306] = TypeEffect('心', 2);
captain[307] = TypeEffect('技', 2.5);
captain[308] = TypeEffect('技', 2.5);

captain[311] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'bad' ? sum + 1 : 0;
    if (sum >= 3) return 3.5;
  }
  return 1;
}
captain[311] = captain[312];

captain[313] = ClassEffect('打擊', 2);
SpecialAbility[313] = ClassEffect('打擊', 1.5);

captain[314] = ClassEffect('打擊', 2);
SpecialAbility[314] = ClassEffect('打擊', 1.5);

captain[315] = ClassEffect('格鬥', 1.5);
captain[316] = ClassEffect('格鬥', 1.5);
captain[319] = ClassEffect('打擊', 1.5);
captain[320] = ClassEffect('打擊', 2);
captain[321] = TypeEffect('速', 2);
captain[322] = TypeEffect('速', 2);

SpecialAbility[323] = BeadEffect(1.5);
SpecialAbility[324] = BeadEffect(1.5);

captain[332] = ClassEffect('打擊', 1.2);

captain[333] = TypeEffect(['心', '知'], 1.5);

captain[336] = TypeEffect('心', 2, 0.8);
captain[337] = TypeEffect('心', 2.5, 0.8);

captain[340] = ClassEffect('打擊', 2);
captain[341] = ClassEffect('打擊', 2);

captain[352] = ClassEffect('射擊', 2);
SpecialAbility[352] = ClassEffect('射擊', 1.75);

captain[353] = ClassEffect('射擊', 2.5);
SpecialAbility[353] = ClassEffect('射擊', 1.75);


captain[356] = ClassEffect('打擊', 2);
captain[357] = ClassEffect('打擊', 2);
captain[358] = TypeEffect('技', 2.5);
captain[359] = TypeEffect('技', 3);
captain[360] = TypeEffect('知', 3);
captain[361] = TypeEffect('知', 3);
captain[361] = TypeEffect('心', 2);
captain[363] = TypeEffect('心', 2);
captain[364] = TypeEffect('速', 2);
captain[365] = TypeEffect('速', 2);

// 366, 367 雷利特殊隊長技能，連擊係數另外處理

captain[373] = ClassEffect('斬擊', 1.5);
captain[374] = ClassEffect('射擊', 1.5);
captain[375] = ClassEffect('射擊', 1.5);
captain[376] = ClassEffect('格鬥', 1.5);
captain[377] = ClassEffect('打擊', 1.5);
captain[380] = TypeEffect('力', 1.5);
captain[383] = TypeEffect('知', 2);
captain[384] = TypeEffect('知', 2);

captain[385] = TypeEffect('知', 2);
SpecialAbility[385] = ClassEffect('格鬥', 1.25);

captain[386] = TypeEffect('知', 2);
SpecialAbility[386] = ClassEffect('格鬥', 1.25);

captain[389] = OrderEffect(['技', '知', '速'], 2.25);
captain[390] = OrderEffect(['技', '知', '速'], 2.75);

captain[395] = TypeEffect('速', 1.2);
SpecialAbility[395] = BeadEffect(1.5);

captain[396] = TypeEffect('速', 1.5);
SpecialAbility[396] = BeadEffect(1.5);

captain[397] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] !== 'perfect' ? sum + 1 : 0;
    if (sum >= 5) return 3;
  }
  return 1;
}

captain[398] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] !== 'perfect' ? sum + 1 : 0;
    if (sum >= 5) return 4;
  }
  return 1;
}

SpecialAbility[399] = TypeEffect('技', 1.5);
SpecialAbility[400] = TypeEffect('技', 1.5);

captain[401] = ClassEffect('斬擊', 1.5);
SpecialAbility[401] = ClassEffect('斬擊', 1.25);

captain[402] = ClassEffect('斬擊', 2);
SpecialAbility[402] = SpecialAbility[401];

captain[404] = ClassEffect('射擊', 1.5);
captain[405] = ClassEffect('射擊', 2);
SpecialAbility[406] = () => 1.2;

captain[408] = ClassEffect('斬擊', 2);
captain[409] = ClassEffect('格鬥', 2);
captain[410] = ClassEffect('格鬥', 2.5);
captain[411] = TypeEffect('力', 2);
captain[412] = TypeEffect('力', 2);
captain[413] = TypeEffect('知', 2.5);
captain[414] = TypeEffect('知', 3);
captain[415] = TypeEffect(['速', '心'], 2.75);
captain[416] = captain[415];

captain[417] = ClassEffect('斬擊', 2);
SpecialAbility[417] = BeadEffect(2);

captain[418] = captain[417];
SpecialAbility[418] = SpecialAbility[417];

captain[419] = TypeEffect('速', 2);
captain[420] = TypeEffect('力', 1.5);
captain[421] = TypeEffect('技', 1.5);
captain[422] = TypeEffect('知', 1.5);
captain[424] = () => 1.5;
captain[425] = ClassEffect('斬擊', 1.5);
SpecialAbility[426] = TypeEffect('力', 1.05);
captain[428] = TypeEffect('心', 2);

captain[430] = TypeEffect('技', 1.5);
SpecialAbility[430] = BeadEffect(1.5);

captain[431] = captain[430];
SpecialAbility[431] = SpecialAbility[430];

captain[433] = OrderEffect(['速', '力', '技'], 2);

captain[434] = OrderEffect(['心', '知', '知'], 2);
SpecialAbility[434] = BeadEffect(1.5);

captain[435] = OrderEffect(['知', '心', '速'], 2);
captain[436] = OrderEffect(['知', '心', '速'], 2.25);

captain[444] = ClassEffect(['進化用', '強化用'], 2);
captain[445] = ClassEffect(['進化用', '強化用'], 2.5);

captain[446] = TypeEffect('力', 2);
captain[447] = TypeEffect('力', 2.5);
captain[448] = TypeEffect('速', 3);
captain[449] = TypeEffect('速', 3);

captain[450] = ClassEffect('格鬥', 2);
SpecialAbility[450] = ClassEffect('格鬥', 1.5);
captain[451] = captain[450];
SpecialAbility[451] = SpecialAbility[450];

captain[452] = ClassEffect('打擊', 2);
captain[453] = captain[452];

captain[454] = TypeEffect('力', 2);
SpecialAbility[454] = TypeEffect('力', 1.5);
captain[455] = captain[454];
SpecialAbility[455] = SpecialAbility[454];

captain[456] = ClassEffect('射擊', 2);
captain[457] = ClassEffect('射擊', 2);

captain[458] = function ({ character }) {
  return character.cost <= 20 ? 3 : 1;
}
SpecialAbility[458] = () => 1.5;
captain[459] = captain[458];
SpecialAbility[459] = SpecialAbility[458];

captain[461] = ClassEffect('格鬥', 2);
SpecialAbility[461] = ClassEffect('格鬥', 1.25);
captain[462] = captain[461];
SpecialAbility[462] = SpecialAbility[461];

captain[464] = ClassEffect('打擊', 1.5);

captain[465] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'bad' ? sum + 1 : 0;
    if (sum >= 4) return 3;
  }
  return 1;
}
SpecialAbility[465] = BeadEffect(1.25);

captain[466] = ClassEffect('射擊', 1.5);
captain[467] = TypeEffect('力', 1.5);
captain[471] = TypeEffect('知', 1.2);
captain[483] = TypeEffect('速', 1.2);
captain[486] = ClassEffect('打擊', 1.5);

SpecialAbility[487] = TypeEffect('力', 1.2);
SpecialAbility[488] = TypeEffect('速', 1.2);
SpecialAbility[489] = TypeEffect('技', 1.2);

captain[490] = ClassEffect('打擊', 1.2);
SpecialAbility[490] = TypeEffect('力', 1.2);

SpecialAbility[491] = TypeEffect('速', 1.2);

captain[492] = TypeEffect('技', 1.5);
SpecialAbility[492] = TypeEffect('技', 1.2);

captain[496] = ClassEffect('射擊', 1.5);
captain[497] = TypeEffect('速', 1.5);
captain[498] = TypeEffect('速', 1.5);
captain[501] = TypeEffect('心', 1.2);
captain[502] = TypeEffect('心', 1.5);

SpecialAbility[505] = TypeEffect('速', 1.25);
SpecialAbility[506] = SpecialAbility[505];

captain[507] = TypeEffect('力', 1.2);
captain[508] = TypeEffect('力', 1.5);

captain[509] = ClassEffect('打擊', 2);
SpecialAbility[509] = ClassEffect('打擊', 1.5);
captain[510] = captain[509];
SpecialAbility[510] = SpecialAbility[509];

captain[511] = ClassEffect('斬擊', 2);
SpecialAbility[511] = ClassEffect('斬擊', 1.25);

captain[513] = TypeEffect('心', 1.5);

captain[514] = TypeEffect('知', 2);
SpecialAbility[514] = TypeEffect('知', 1.5);

captain[515] = ClassEffect('斬擊', 1.5);
captain[516] = captain[515];

// ISSUE: 待確認倍率
// SpecialAbility[517, 518] = 我方兩回合的攻擊力微增

captain[519] = TypeEffect('力', 2);
SpecialAbility[519] = TypeEffect('力', 2);

captain[520] = TypeEffect('力', 2.5);
SpecialAbility[520] = TypeEffect('力', 2);

captain[523] = ClassEffect('打擊', 1.5);
captain[524] = ClassEffect('打擊', 2);
captain[525] = TypeEffect('心', 2);
captain[526] = TypeEffect('心', 2);
captain[527] = TypeEffect('技', 1.5);
captain[528] = TypeEffect('技', 2);

// ISSUE: 無法獲得 HP 的資訊
// 心珠出現率比例3倍(約37.5%)，心屬性攻擊力[2+0.75*(剩餘HP/總HP)]倍(體力越高倍率越高，最高2.75倍，最低2倍)
captain[530] = captain[529] = TypeEffect('心', 2.75);  // 暫時以 HP 100% 計算

captain[533] = TypeEffect('速', 2);
SpecialAbility[533] = BeadEffect(1.5);
captain[534] = captain[533];
SpecialAbility[534] = SpecialAbility[533];

// 537, 538 特殊隊長技能，連擊係數另外處理

captain[541] = TypeEffect('心', 2.5);
captain[543] = ClassEffect('射擊', 1.5);
captain[544] = ClassEffect('射擊', 2.25);

captain[545] = TypeEffect('心', 2);
SpecialAbility[545] = TypeEffect('心', 1.5);
captain[546] = captain[545];
SpecialAbility[546] = SpecialAbility[545];

captain[548] = () => 1.5;

captain[549] = PerfectEffect(3, 2);
SpecialAbility[549] = () => 1.3;
captain[550] = PerfectEffect(3, 2.5);
SpecialAbility[550] = () => 1.3;

captain[553] = TypeEffect('技', 2.75);
captain[554] = TypeEffect('技', 3);
captain[555] = ClassEffect('射擊', 2);
captain[556] = ClassEffect('射擊', 2);
captain[557] = TypeEffect('知', 1.5);
captain[558] = TypeEffect('知', 2);

captain[559] = TypeEffect('力', 2);
SpecialAbility[559] = BeadEffect(1.5);
captain[560] = TypeEffect('力', 2.25);
SpecialAbility[560] = BeadEffect(1.5);

captain[561] = function({ bead }) {
  return bead === 2 ? 3 : 2;
}
captain[562] = captain[561];

captain[568] = () => 1.25;
captain[569] = () => 1.5;

captain[570] = function ({ character }) {
  return character.type === '力' || character.classes.indexOf('格鬥') >= 0 ? 1.5 : 1;
}
captain[571] = captain[570];

captain[572] = ClassEffect('格鬥', 2.5);
SpecialAbility[572] = ClassEffect('格鬥', 2);

captain[574] = ClassEffect('打擊', 2);
SpecialAbility[574] = ClassEffect('打擊', 1.75);
captain[575] = captain[574];
SpecialAbility[575] = SpecialAbility[574];

captain[576] = () => 1.5;

captain[577] = function ({ timingHistory }) {
  const timingOrder = ['good', 'great', 'perfect'];
  let index = 0;

  for (let i = 0; i < timingHistory.length; i++) {
    const timing = timingHistory[i];
    const nextTiming = timingOrder[index];

    if (timing !== nextTiming) {
      index = 0;
      continue;
    }

    // is not the last timing
    if (index !== timingOrder.length - 1) {
      index++;
      continue;
    }

    return 4;
  }
  return 1;
}
captain[578] = captain[577];

captain[579] = TypeEffect(['速', '技'], 1.5);
captain[580] = TypeEffect(['速', '技'], 2);
captain[581] = TypeEffect('力', 1.5);

captain[582] = ClassEffect('打擊', 1.5);
SpecialAbility[582] = TypeEffect('速', 1.5);

captain[583] = ClassEffect('射擊', 1.5);
captain[584] = () => 0.1;

captain[589] = () => 1.5;
SpecialAbility[589] = ClassEffect('斬擊', 1.5);

captain[590] = () => 2;
SpecialAbility[590] = ClassEffect('斬擊', 1.5);

captain[596] = TypeEffect('力', 1.5);
captain[597] = TypeEffect('力', 1.75);
captain[598] = function({ character }) {
  return character.star === 1 || character.star === 2 ? 2.5 : 1;
}

captain[599] = function({ character }) {
  return character.star === 1 || character.star === 2 ? 3 : 1;
}

captain[600] = TypeEffect('心', 1.5);
SpecialAbility[600] = TypeEffect('心', 1.3);

captain[601] = TypeEffect('心', 2);
SpecialAbility[601] = TypeEffect('心', 1.3);

captain[602] = TypeEffect('速', 2);
SpecialAbility[602] = TypeEffect('速', 2);

captain[603] = TypeEffect('速', 2.25);
SpecialAbility[603] = TypeEffect('速', 2);

captain[604] = ClassEffect('格鬥', 2);
captain[605] = ClassEffect('格鬥', 2);
captain[606] = ClassEffect('格鬥', 2);
captain[607] = ClassEffect('格鬥', 2.5);

captain[612] = ClassEffect('斬擊', 1.5);
captain[613] = ClassEffect('斬擊', 1.5);

// ISSUE: 現在無法支援攻擊力增加實際數值
// SpecialAbility[612, 613] = 我方攻擊, 回復 + 45

captain[614] = function ({ character }) {
  return character.cost <= 20 ? 2.25 : 1;
}

SpecialAbility[617] = ClassEffect('射擊', 1.2);

captain[629] = function ({ character }) {
  return 0 < character.star && character.star <= 3 ? 2 : 1;
}

captain[630] = ClassEffect('斬擊', 1.5);
captain[631] = ClassEffect('斬擊', 2);
captain[632] = ClassEffect('格鬥', 1.5);
captain[633] = ClassEffect('格鬥', 2);

captain[634] = TypeEffect(['速', '心'], 1.25);
SpecialAbility[634] = TypeEffect(['速', '心'], 1.2);
captain[635] = TypeEffect(['速', '心'], 1.5);
SpecialAbility[635] = SpecialAbility[634];

captain[636] = function ({ character }) {
  return character.cost <= 2 ? 3 : 1;
}

captain[637] = ClassEffect('斬擊', 1.5);

// ISSUE: 尚不支援
// 給予一回合防禦力提高中的敵人傷害成為 1.3 倍
SpecialAbility[637] = () => 1.3;

captain[638] = ClassEffect('斬擊', 2);
captain[639] = captain[638];

captain[640] = ClassEffect('格鬥', 2);
captain[641] = ClassEffect('格鬥', 2.25);

captain[642] = TypeEffect('心', 2.5);
SpecialAbility[642] = BeadEffect(1.5);

captain[643] = TypeEffect('心', 3);
SpecialAbility[643] = BeadEffect(1.5);

captain[644] = TypeEffect('知', 2);
captain[645] = TypeEffect('知', 2.5);
captain[646] = ClassEffect('射擊', 2.5);
captain[647] = ClassEffect('射擊', 2.75);
captain[648] = TypeEffect(['速', '心'], 2.75);
SpecialAbility[648] = BeadEffect(1.5);
captain[649] = captain[648];
SpecialAbility[649] = SpecialAbility[648];

captain[650] = TypeEffect('知', 2);
SpecialAbility[650] = BeadEffect(1.5);
captain[651] = captain[650];
SpecialAbility[651] = SpecialAbility[650];

captain[652] = function({ bead }) {
  return bead === 2 ? 2 : 1;
}

captain[653] = function({ bead }) {
  return bead === 2 ? 2.25 : 1;
}

captain[654] = function({ bead }) {
  return bead === 2 ? 2.75 : 1;
}

captain[655] = TypeEffect('力', 1.5);
SpecialAbility[655] = BeadEffect(1.5);
captain[656] = TypeEffect('力', 2);
SpecialAbility[656] = BeadEffect(1.5);

captain[657] = ClassEffect('格鬥', 1.5);
captain[658] = ClassEffect('射擊', 1.5);
captain[659] = PerfectEffect(3, 2.5);
captain[660] = ClassEffect('射擊', 2);
captain[661] = ClassEffect('射擊', 2);
captain[662] = TypeEffect('心', 2);
captain[665] = () => 1.2;
captain[666] = () => 1.75;
captain[667] = () => 1.5;

// ISSUE: 無法獲得 HP 的資訊
// 全體回復力1.2倍，自由攻擊力[2+0.75*(剩餘HP/總HP)]倍(體力越高倍率越高，最高2.75倍，最低2倍)
captain[668] = ClassEffect('自由', 2.75);   // 暫時以 HP 100% 計算

// ISSUE: 無法選擇倍率
// 1 回合自由 x1.5；若全體 Perfect 下回合自由 x2
SpecialAbility[668] = ClassEffect('自由', 1.5);

captain[669] = captain[668];
SpecialAbility[669] = SpecialAbility[668];

captain[670] = ClassEffect('格鬥', 2);
SpecialAbility[670] = ClassEffect('格鬥', 1.75);

captain[671] = ClassEffect('格鬥', 2.25);
SpecialAbility[671] = ClassEffect('格鬥', 1.75);

captain[672] = ClassEffect('格鬥', 2);
captain[673] = ClassEffect('格鬥', 2);

captain[674] = ClassEffect('自由', 2);
captain[675] = ClassEffect('自由', 2.5);

captain[676] = ClassEffect('斬擊', 1.5);
captain[677] = ClassEffect('斬擊', 1.5);
captain[678] = TypeEffect('心', 1.2);
captain[679] = TypeEffect('心', 1.5);
SpecialAbility[680] = TypeEffect('技', 1.25);

captain[681] = ClassEffect('打擊', 1.5);
SpecialAbility[681] = TypeEffect('技', 1.25);

captain[683] = ClassEffect('格鬥', 1.5);
captain[685] = ClassEffect('射擊', 1.5);
captain[686] = ClassEffect('斬擊', 1.5);

captain[687] = ClassEffect('自由', 1.5);
SpecialAbility[687] = ClassEffect('自由', 1.3);
captain[688] = ClassEffect('自由', 2);
SpecialAbility[688] = ClassEffect('自由', 1.3);

captain[689] = ClassEffect('斬擊', 1.2);
SpecialAbility[689] = BeadEffect(1.5);
captain[690] = ClassEffect('斬擊', 1.5);
SpecialAbility[690] = BeadEffect(1.5);

captain[696] = ClassEffect('打擊', 1.75);
captain[697] = ClassEffect('射擊', 1.75);
captain[698] = ClassEffect('斬擊', 1.75);

// ISSUE: 現在無法支援攻擊力增加實際數值
// captain[699] = 射擊人物攻擊力 +500

captain[700] = ClassEffect('格鬥', 1.75);
captain[705] = TypeEffect(['力', '技', '速'], 1.25);
captain[706] = TypeEffect('力', 1.5);
captain[707] = TypeEffect('力', 1.5);

captain[708] = TypeEffect('心', 1.2);
captain[709] = TypeEffect('心', 1.5);

captain[710] = ClassEffect('射擊', 1.5);
SpecialAbility[710] = ClassEffect('射擊', 1.25);

captain[711] = ClassEffect('射擊', 2);
SpecialAbility[711] = ClassEffect('射擊', 1.25);

captain[712] = ClassEffect('打擊', 2);
captain[713] = ClassEffect('打擊', 2.5);

// ISSUE: 無法獲得角色位置
// SpecialAbility[712, 713] = 兩回合上段人物攻擊力 x1.5

SpecialAbility[715] = ClassEffect('自由', 1.5);
SpecialAbility[716] = ClassEffect('自由', 1.5);

captain[717] = function({ timingHistory }) {
  const prevTiming = timingHistory[timingHistory.length - 1];
  if (prevTiming === 'good')    return 2.25;
  if (prevTiming === 'great')   return 2.5;
  if (prevTiming === 'perfect') return 2.75;
  return 2;
}
captain[718] = captain[717];

// ISSUE: 無法獲得 HP 得資訊
// 搏識攻擊力[1.5+1.75*(1-剩餘HP)/總HP]倍(體力越少倍率越高，最大3.25倍，最小1.5倍)
captain[719] = ClassEffect('博識', 3.25);   // 暫時以 HP 100% 計算

// ISSUE: 無法獲得 HP 得資訊
// 一回合間博識的攻擊力1.5倍，必殺技發動時體力30%以下2倍，敵全體攻擊力20倍技屬性傷害
SpecialAbility[719] = ClassEffect('博識', 1.5);   // 暫時以 HP 100% 計算

captain[720] = captain[719];
SpecialAbility[720] = SpecialAbility[719];

captain[721] = ClassEffect('格鬥', 1.5);
captain[722] = ClassEffect('格鬥', 2);
captain[723] = ClassEffect('斬擊', 1.5);
captain[724] = ClassEffect('斬擊', 1.75);
captain[727] = ClassEffect(['格鬥', '博識'], 1.75);
captain[728] = TypeEffect('技', 1.2);
captain[729] = TypeEffect('技', 1.2);

captain[730] = TypeEffect('知', 1.2);
SpecialAbility[730] = TypeEffect('知', 1.5);

captain[731] = TypeEffect('知', 1.5);
SpecialAbility[731] = TypeEffect('知', 1.5);

captain[734] = TypeEffect('心', 1.2);
captain[735] = TypeEffect('心', 1.5);

captain[736] = ClassEffect('斬擊', 2.5);
captain[737] = ClassEffect('格鬥', 2.75);

captain[738] = function ({ character }) {
  return character.cost >= 21 ? 2 : 1;
}

captain[739] = ClassEffect('自由', 2);

SpecialAbility[740] = () => 1.3;
SpecialAbility[741] = () => 1.3;

captain[742] = ClassEffect('自由', 1.2);
SpecialAbility[742] = BeadEffect(1.5);

captain[743] = ClassEffect('自由', 1.5);
SpecialAbility[743] = BeadEffect(1.5);

captain[744] = ClassEffect('自由', 2);
captain[745] = ClassEffect('自由', 2.5);

captain[747] = function({ character, bead }) {
  if (character.classes.indexOf('強韌') === -1) {
    return 1;
  }
  return bead === 2 ? 3 : 2.5;
}
captain[748] = captain[747];

captain[749] = TypeEffect('技', 1.5);
captain[750] = TypeEffect('技', 2);

captain[751] = ClassEffect('博識', 1.5);
captain[752] = ClassEffect('博識', 2.25);

captain[753] = ClassEffect('強韌', 2);
SpecialAbility[753] = BeadEffect(1.5);

captain[754] = ClassEffect('強韌', 2.5);
SpecialAbility[754] = BeadEffect(1.5);

captain[755] = TypeEffect('知', 1.5);
SpecialAbility[755] = ClassEffect('強韌', 1.75);

captain[756] = TypeEffect('知', 2);
SpecialAbility[756] = ClassEffect('強韌', 1.75);

captain[757] = TypeEffect('心', 2);
captain[758] = TypeEffect('心', 2);

captain[759] = TypeEffect('力', 2.5);
captain[760] = TypeEffect('力', 3);

captain[761] = ClassEffect('格鬥', 2);
SpecialAbility[761] = () => 1.2;

captain[762] = TypeEffect('心', 1.5);
SpecialAbility[762] = TypeEffect('心', 1.75);

captain[763] = TypeEffect('力', 2);
captain[764] = ClassEffect('打擊', 1.5);
captain[766] = TypeEffect('速', 2);
captain[767] = TypeEffect('技', 1.5);
captain[768] = TypeEffect('心', 2);
captain[769] = TypeEffect('知', 1.5);
captain[770] = TypeEffect('力', 2);

captain[771] = ClassEffect('博識', 2.5);
SpecialAbility[771] = ClassEffect('博識', 1.75);

captain[772] = ClassEffect('斬擊', 2);
captain[774] = ClassEffect('自由', 2);
captain[775] = ClassEffect('博識', 1.5);
captain[776] = TypeEffect('心', 1.25);
captain[777] = TypeEffect('心', 1.75);

captain[780] = () => 2;
// ISSUE: 無法獲得 HP 的資訊
// HP 50 ~ 100%, 攻 x 1.5
// HP 20 ~  50%, 攻 x 1.75
// HP  0 ~  20%, 攻 x 2
SpecialAbility[780] = () => 1.5;  // 暫時以 HP 100% 計算

captain[781] = () => 2.5;
SpecialAbility[781] = SpecialAbility[780];

captain[783] = ClassEffect('斬擊', 2);

SpecialAbility[788] = ClassEffect('斬擊', 1.75);

captain[789] = ClassEffect('斬擊', 1.5);
SpecialAbility[789] = ClassEffect('斬擊', 1.75);

SpecialAbility[790] = TypeEffect(['力', '技', '速'], 1.2);

captain[791] = TypeEffect(['力', '技', '速'], 1.25);
SpecialAbility[791] = SpecialAbility[790];

captain[793] = ClassEffect('博識', 1.5);
captain[794] = ClassEffect('強韌', 3);
captain[795] = ClassEffect('強韌', 3.5);

captain[796] = ClassEffect('博識', 2);

captain[797] = ClassEffect(['博識', '強韌'], 2);

captain[798] = PerfectEffect(3, 2.5);
SpecialAbility[798] = ClassEffect('格鬥', 1.75);

export default {
  CaptainEffect: captain,
  SpecialAbility
}
