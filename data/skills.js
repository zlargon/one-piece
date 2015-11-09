import config from '../config';
import { TypeEffect, ClassEffect, BeadEffect, OrderEffect } from './GeneralEffect';

let captain = [];
let special = [];
for (let i = 0; i < config.maxCharacterNumber.jp; i++) {
  captain[i] = () => 1;
  special[i] = null;
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
special[209] = TypeEffect('知', 1.5);

// 妮可・羅賓
// 於1回合內，將知識屬性的攻擊力提升2倍
special[210] = TypeEffect('知', 2);

// Mr.9
// 將打擊型角色的攻擊力提升1.2倍
captain[211] = ClassEffect('打擊', 1.2);

// Mr.9  熱血九號毅力球棒
// 將打擊型角色的攻擊力提升1.5倍
captain[212] = ClassEffect('打擊', 1.5);

// 蒙其・D・魯夫 ３檔
// 連續擊出3次以上PERFECT，之後的角色攻擊力將會提升3.5倍
captain[217] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'perfect' ? sum + 1 : 0;
    if (sum >= 3) return 3.5;
  }
  return 1;
}

// 娜美 風和日麗
// 將知識屬性角色的攻擊力提升2倍
captain[220] = TypeEffect('知', 2);

// 娜美 幸福的一擊
// 將知識屬性角色的攻擊力提升2.5倍
captain[221] = TypeEffect('知', 2.5);

// 騙人布 騙人布反擊
captain[222] = TypeEffect('心', 1.2);  // 將心靈屬性角色的攻擊力提升1.2倍
special[222] = TypeEffect('心', 1.5);  // 於1回合內，將心靈屬性的攻擊力提升1.5倍

// 騙人布 衝撃
captain[223] = TypeEffect('心', 1.5);  // 將心靈屬性角色的攻擊力提升1.5倍
special[222] = TypeEffect('心', 2);    // 於1回合內，將心靈屬性的攻擊力提升2倍

// Mr.王子 羊肉SHOT
// 連續擊出2次以上PERFECT，之後的角色攻擊力將會提升2倍
captain[224] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'perfect' ? sum + 1 : 0;
    if (sum >= 2) return 2;
  }
  return 1;
}

// Mr.王子 小牛肉SHOT
// 連續擊出2次以上PERFECT，之後的角色攻擊力將會提升2.5倍
captain[225] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'perfect' ? sum + 1 : 0;
    if (sum >= 2) return 2.5;
  }
  return 1;
}

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
special[263] = BeadEffect;             // 於2回合內將海賊團全體成員的技能格影響力大幅提升


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
special[313] = ClassEffect('打擊', 1.5);

captain[314] = ClassEffect('打擊', 2);
special[314] = ClassEffect('打擊', 1.5);

captain[315] = ClassEffect('格鬥', 1.5);
captain[316] = ClassEffect('格鬥', 1.5);
captain[319] = ClassEffect('打擊', 1.5);
captain[320] = ClassEffect('打擊', 2);
captain[321] = TypeEffect('速', 2);
captain[322] = TypeEffect('速', 2);

special[323] = BeadEffect;
special[324] = BeadEffect;

captain[332] = ClassEffect('打擊', 1.2);

captain[333] = function({ character }) {
  return character.type === '心' || character.type === '知' ? 1.5 : 1;
}

captain[336] = function({ character }) {
  return character.type === '心' ? 2 : 0.8;
}

captain[337] = function({ character }) {
  return character.type === '心' ? 2.5 : 0.8;
}

captain[340] = ClassEffect('打擊', 2);
captain[341] = ClassEffect('打擊', 2);

captain[352] = ClassEffect('射擊', 2);
special[352] = ClassEffect('射擊', 1.75);

captain[353] = ClassEffect('射擊', 2.5);
special[353] = ClassEffect('射擊', 1.75);


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
special[385] = ClassEffect('格鬥', 1.25);

captain[386] = TypeEffect('知', 2);
special[386] = ClassEffect('格鬥', 1.25);


function isAboveGood(timing) {
  return timing === 'good' || timing === 'great' || timing === 'perfect';
}

captain[389] = OrderEffect(['技', '知', '速'], 2.25);
captain[390] = OrderEffect(['技', '知', '速'], 2.75);

captain[395] = TypeEffect('速', 1.2);
special[395] = BeadEffect;

captain[396] = TypeEffect('速', 1.5);
special[396] = BeadEffect;

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

special[399] = TypeEffect('技', 1.5);
special[400] = TypeEffect('技', 1.5);

//
captain[401] = function({ character }) {
  return character.classes.indexOf('斬擊') >= 0 ? 1.5 : 0.8;   // FIXME
}
special[401] = ClassEffect('斬擊', 1.25);

//
captain[402] = function({ character }) {
  return character.classes.indexOf('斬擊') >= 0 ? 2 : 0.8;   // FIXME
}
special[402] = special[401];

captain[404] = ClassEffect('射擊', 1.5);
captain[405] = ClassEffect('射擊', 2);
special[406] = () => 1.2;

captain[408] = ClassEffect('斬擊', 2);
captain[409] = ClassEffect('格鬥', 2);
captain[410] = ClassEffect('格鬥', 2.5);
captain[411] = TypeEffect('力', 2);
captain[412] = TypeEffect('力', 2);
captain[413] = TypeEffect('知', 2.5);
captain[414] = TypeEffect('知', 3);

captain[415] = function ({ character }) {
  return character.type === '速' || character.type === '心' ? 2.75 : 1;
}
captain[416] = captain[415];

captain[417] = ClassEffect('斬擊', 2);
special[417] = function BeadEffect({ bead }) {
  if (bead === 2)   return 2;
  if (bead === 0.5) return 0.5;
  return 1;
}
captain[418] = captain[417];
special[418] = special[417];

captain[419] = TypeEffect('速', 2);
captain[420] = TypeEffect('力', 1.5);
captain[421] = TypeEffect('技', 1.5);
captain[422] = TypeEffect('知', 1.5);
captain[424] = () => 1.5;
captain[425] = ClassEffect('斬擊', 1.5);
special[426] = TypeEffect('力', 1.05);
captain[428] = TypeEffect('心', 2);

captain[430] = TypeEffect('技', 1.5);
special[430] = BeadEffect;

captain[431] = captain[430];
special[431] = special[430];

captain[433] = OrderEffect(['速', '力', '技'], 2);

captain[434] = OrderEffect(['心', '知', '知'], 2);
special[434] = BeadEffect;

captain[435] = OrderEffect(['知', '心', '速'], 2);
captain[436] = OrderEffect(['知', '心', '速'], 2.25);

// TODO: captain[444] =
// TODO: captain[445] =

captain[446] = TypeEffect('力', 2);
captain[447] = TypeEffect('力', 2.5);
captain[448] = TypeEffect('速', 3);
captain[449] = TypeEffect('速', 3);

captain[450] = ClassEffect('格鬥', 2);
special[450] = ClassEffect('格鬥', 1.5);
captain[451] = captain[450];
special[451] = special[450];

captain[452] = ClassEffect('打擊', 2);
captain[453] = captain[452];

captain[454] = TypeEffect('力', 2);
special[454] = TypeEffect('力', 1.5);
captain[455] = captain[454];
special[455] = special[454];

captain[456] = ClassEffect('射擊', 2);
captain[457] = ClassEffect('射擊', 2);

captain[458] = function ({ character }) {
  return character.cost <= 20 ? 3 : 1;
}
special[458] = () => 1.5;
captain[459] = captain[458];
special[459] = special[458];

captain[461] = ClassEffect('格鬥', 2);
special[461] = ClassEffect('格鬥', 1.25);
captain[462] = captain[461];
special[462] = special[461];

captain[464] = ClassEffect('打擊', 1.5);

captain[465] = function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'bad' ? sum + 1 : 0;
    if (sum >= 4) return 3;
  }
  return 1;
}
special[465] = function ({ bead }) {
  if (bead === 2)   return 1.25;
  if (bead === 0.5) return 0.8;
  return 1;
}

captain[466] = ClassEffect('射擊', 1.5);
captain[467] = TypeEffect('力', 1.5);
captain[471] = TypeEffect('知', 1.2);
captain[483] = TypeEffect('速', 1.2);
captain[486] = ClassEffect('打擊', 1.5);

special[487] = TypeEffect('力', 1.2);
special[488] = TypeEffect('速', 1.2);
special[489] = TypeEffect('技', 1.2);

captain[490] = ClassEffect('打擊', 1.2);
special[490] = TypeEffect('力', 1.2);

special[491] = TypeEffect('速', 1.2);

captain[492] = TypeEffect('技', 1.5);
special[492] = TypeEffect('技', 1.2);

captain[496] = ClassEffect('射擊', 1.5);
captain[497] = TypeEffect('速', 1.5);
captain[498] = TypeEffect('速', 1.5);

export default {
  CaptainEffect: captain,
  SpecialAbility: special
}
