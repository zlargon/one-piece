import { MAX_CHAR_JP } from '../config';
import { TypeEffect, ClassEffect, BeadEffect, PerfectEffect, OrderEffect } from './GeneralEffect';

let CaptainEffect = [];
let SpecialAbility = [];
for (let i = 0; i <= MAX_CHAR_JP; i++) {
  CaptainEffect[i] = {
    add: () => 0,
    plus: () => 1,
    chainCoefficient: () => 1
  };
  SpecialAbility[i] = {
    hasSpecialAbility: false,
    add: () => 0,
    plus: () => 1
  };
}

const skill = (...numbers) => (captainEffect, specialAbility = null) => {
  // set Captain Effect
  if (captainEffect !== null) {
    const effect = typeof captainEffect === 'object' ? captainEffect : { plus: captainEffect };
    numbers.forEach(no => {
      CaptainEffect[no] = {
        ...CaptainEffect[no],
        ...effect
      };
    });
  }

  // set Special Ability
  if (specialAbility !== null) {
    const effect = typeof specialAbility === 'object' ? specialAbility : { plus: specialAbility };
    numbers.forEach(no => {
      SpecialAbility[no] = {
        ...SpecialAbility[no],
        ...effect,
        hasSpecialAbility: true
      };
    });
  }
}

// 蒙其・D・魯夫 伸縮自如的橡膠槍
// 蒙其・D・魯夫 伸縮自如的橡膠火箭砲
skill(2, 3)(TypeEffect('力', 1.5));

// 蒙其・D・魯夫 2檔
skill(4)(TypeEffect('力', 2));

// 羅羅亞・索隆
// 羅羅亞・索隆 三・千・世・界
// 羅羅亞・索隆 煩惱鳳
skill(5, 6, 7)(TypeEffect('技', 1.5));

// 羅羅亞・索隆 阿修羅壹霧銀
skill(8)(TypeEffect('技', 2));

// 娜美 龍捲風天候
// 娜美 海市蜃樓天候
// 娜美 雷霆天候
skill(10, 11, 12)(TypeEffect('知', 1.5));

// 騙人布
skill(13)(ClassEffect('射擊', 1.2));

// 騙人布 墨西哥辣椒星
// 騙人布 黃金鐵鎚
// 狙擊王
skill(14, 15, 16)(TypeEffect('心', 1.5));

// 香吉士
// 廚師香吉士 燒石燉菜
// 香吉士 惡魔風腳
skill(17, 19, 20)(TypeEffect('速', 1.5));

// 近海的王者
skill(28)(ClassEffect('格鬥', 1.2));

// 摩奇＆利基
skill(36)(TypeEffect('心', 1.5));

// 特技卡巴吉
skill(37)(TypeEffect('技', 1.5));

// 巴其
skill(38)(TypeEffect('知', 1.5));

// 小丑巴其
skill(39)(TypeEffect('知', 2));

// 布奇
skill(42)(TypeEffect('力', 1.2));

// 克洛船長
skill(45)(TypeEffect('速', 1.2));

// 百計的克洛
skill(46)(TypeEffect('速', 1.5));

// 鐵拳芬布迪
skill(49)(TypeEffect('力', 1.5));

// 主廚哲普
skill(52)(ClassEffect('格鬥', 2.5));

// 老鼠
skill(59)(TypeEffect('知', 1.2));

// 海牛呣
skill(60)(TypeEffect('力', 1.5));

// 惡龍
// 抓狂的惡龍　鯊魚齒輪
skill(65, 66)(ClassEffect('斬擊', 2));

// 波特卡斯・D・艾斯
skill(74)(TypeEffect('速', 2));

// 波特卡斯・D・艾斯　鏡火炎
skill(75)(TypeEffect('速', 2.5));

// 傑克
skill(76)(TypeEffect('心', 2));

// 紅髮傑克
skill(77)(TypeEffect('心', 2.5));

// 戴手指虎的少尉 海軍本部
skill(194)(TypeEffect('力', 1.5));

// 佩劍的少尉 海軍本部
skill(195)(TypeEffect('技', 1.5));

// 薙刀少尉 海軍本部
skill(196)(TypeEffect('速', 1.5));

// 火箭砲少尉 海軍本部
skill(198)(ClassEffect('射擊', 1.5));

// Mr.5 鼻空想砲
skill(199)(TypeEffect('力', 1.5));

// Mr.5 微風氣息炸彈
skill(200)(TypeEffect('力', 2));

// Miss All Sunday
// 於1回合內，將知識屬性的攻擊力提升1.5倍
skill(209)(null, TypeEffect('知', 1.5));

// 妮可・羅賓
// 於1回合內，將知識屬性的攻擊力提升2倍
skill(210)(null, TypeEffect('知', 2));

// Mr.9
skill(211)(ClassEffect('打擊', 1.2));

// Mr.9  熱血九號毅力球棒
skill(212)(ClassEffect('打擊', 1.5));

// 蒙其・D・魯夫 ３檔
skill(217)(PerfectEffect(3, 3.5));

// 娜美 風和日麗
skill(220)(TypeEffect('知', 2));

// 娜美 幸福的一擊
skill(221)(TypeEffect('知', 2.5));

// 騙人布 騙人布反擊
skill(222)(
  TypeEffect('心', 1.2), // 將心靈屬性角色的攻擊力提升1.2倍
  TypeEffect('心', 1.5)  // 於1回合內，將心靈屬性的攻擊力提升1.5倍
);

// 騙人布 衝撃
skill(223)(
  TypeEffect('心', 1.5), // 將心靈屬性角色的攻擊力提升1.5倍
  TypeEffect('心', 2)    // 於1回合內，將心靈屬性的攻擊力提升2倍
);

// Mr.王子 羊肉SHOT
skill(224)(PerfectEffect(2, 2));

// Mr.王子 小牛肉SHOT
skill(225)(PerfectEffect(2, 2.5));

// 喬拉可爾・密佛格
skill(226)(ClassEffect('斬擊', 2));

// 鷹眼密佛格
skill(227)(ClassEffect('斬擊', 2.5));

// 雙鐵拳的芬布迪
skill(230)(TypeEffect('力', 1.5));

// 希娜
// 黑檻的希娜
skill(231, 232)(TypeEffect('速', 2));

skill(235)(ClassEffect('格鬥', 1.2));
skill(236)(ClassEffect('格鬥', 1.5));
skill(248)(TypeEffect('力', 2.5));
skill(249)(TypeEffect('力', 3));

// 馬可
// 不死鳥馬可
skill(250, 251)(TypeEffect('心', 3));

// 裘斯
// 鑽石裘斯
skill(252, 253)(TypeEffect('速', 2));

// 比斯塔
// 花劍比斯塔
skill(254, 255)(TypeEffect('知', 2));

// 以藏
// 短槍以藏
skill(256, 257)(TypeEffect('技', 2));

// 布朗明哥
// 大槌布朗明哥
skill(258, 259)(TypeEffect('力', 2));

// 艾德華・紐蓋特
// 白鬍子
// 當殘餘體力太少時，將海賊團的攻擊力提升3倍
skill(260, 261)(() => 3);

// 克比上士
skill(263)(
  ClassEffect('格鬥', 2),  // 將格鬥型角色的攻擊力提升2倍
  BeadEffect(1.5)         // 於2回合內將海賊團全體成員的技能格影響力大幅提升
);

// 貝魯梅柏中士
skill(265)(ClassEffect('斬擊', 1.5));

// 彩虹紋守護龍
// 將海賊團的攻擊力提升1.5倍
skill(267)(() => 1.5);

skill(290)(ClassEffect('射擊', 1.5));
skill(296, 297)(ClassEffect('射擊', 2));
skill(299)(TypeEffect('技', 2));
skill(305)(TypeEffect('心', 1.5));
skill(306)(TypeEffect('心', 2));
skill(307, 308)(TypeEffect('技', 2.5));

skill(311, 312)(function ({ timingHistory }) {
  let sum = 0;
  for (let i = 0; i < timingHistory.length; i++) {
    sum = timingHistory[i] === 'bad' ? sum + 1 : 0;
    if (sum >= 3) return 3.5;
  }
  return 1;
});

skill(313, 314)(
  ClassEffect('打擊', 2),
  ClassEffect('打擊', 1.5)
);

skill(315, 316)(ClassEffect('格鬥', 1.5));
skill(319)(ClassEffect('打擊', 1.5));
skill(320)(ClassEffect('打擊', 2));
skill(321, 322)(TypeEffect('速', 2));

skill(323, 324)(
  TypeEffect('速', 1.5),
  BeadEffect(1.5)
);

skill(332)(ClassEffect('打擊', 1.2));
skill(333)(TypeEffect(['心', '知'], 1.5));
skill(336)(TypeEffect('心', 2, 0.8));
skill(337)(TypeEffect('心', 2.5, 0.8));
skill(340, 341)(ClassEffect('打擊', 2));

skill(352)(
  ClassEffect('射擊', 2),
  ClassEffect('射擊', 1.75)
);

skill(353)(
  ClassEffect('射擊', 2.5),
  ClassEffect('射擊', 1.75)
);

skill(356)(ClassEffect('打擊', 2));
skill(357)(ClassEffect('打擊', 2.5));
skill(358)(TypeEffect('技', 2.5));
skill(359)(TypeEffect('技', 3));
skill(360, 361)(TypeEffect('知', 3));
skill(362, 363)(TypeEffect('心', 2));
skill(364, 365)(TypeEffect('速', 2));

skill(366, 367)({
  chainCoefficient: () => 4
});

skill(373)(ClassEffect('斬擊', 1.5));
skill(374)(ClassEffect('射擊', 1.5));
skill(375)(ClassEffect('打擊', 1.5));
skill(376)(ClassEffect('格鬥', 1.5));
skill(377)(ClassEffect('打擊', 1.5));
skill(380)(TypeEffect('力', 1.5));
skill(383, 384)(TypeEffect('知', 2));

skill(385, 386)(
  TypeEffect('知', 2),
  ClassEffect('格鬥', 1.25)
);

skill(389)(OrderEffect(['技', '知', '速'], 2.25));
skill(390)(OrderEffect(['技', '知', '速'], 2.75));

skill(395)(
  TypeEffect('速', 1.2),
  BeadEffect(1.5)
);

skill(396)(
  TypeEffect('速', 1.5),
  BeadEffect(1.5)
);

skill(397)(PerfectEffect(5, 3));
skill(398)(PerfectEffect(5, 4));
skill(399, 400)(null, TypeEffect('技', 1.5));

skill(401)(
  ClassEffect('斬擊', 1.5),
  ClassEffect('斬擊', 1.25)
);

skill(402)(
  ClassEffect('斬擊', 2),
  ClassEffect('斬擊', 1.25)
);

skill(404)(ClassEffect('射擊', 1.5));
skill(405)(ClassEffect('射擊', 2));
skill(406)(null, () => 1.2);
skill(408)(ClassEffect('斬擊', 2));
skill(409)(ClassEffect('格鬥', 2));
skill(410)(ClassEffect('格鬥', 2.5));
skill(411, 412)(TypeEffect('力', 2));
skill(413)(TypeEffect('知', 2.5));
skill(414)(TypeEffect('知', 3));
skill(415, 416)(TypeEffect(['速', '心'], 2.75));

skill(417, 418)(
  ClassEffect('斬擊', 2),
  BeadEffect(2)
);

skill(419)(TypeEffect('速', 2));
skill(420)(TypeEffect('力', 1.5));
skill(421)(TypeEffect('技', 1.5));
skill(422)(TypeEffect('知', 1.5));
skill(424)(() => 1.5);
skill(425)(ClassEffect('斬擊', 1.5));
skill(426)(null, TypeEffect('力', 1.05));
skill(428)(TypeEffect('心', 2));

skill(430, 431)(
  TypeEffect('技', 1.5),
  BeadEffect(1.5)
);

skill(433)(OrderEffect(['速', '力', '技'], 2));

skill(434)(
  OrderEffect(['心', '知', '知'], 2),
  BeadEffect(1.5)
);

skill(435)(OrderEffect(['知', '心', '速'], 2));
skill(436)(OrderEffect(['知', '心', '速'], 2.25));
skill(444)(ClassEffect(['進化用', '強化用'], 2));
skill(445)(ClassEffect(['進化用', '強化用'], 2.5));
skill(446)(TypeEffect('力', 2));
skill(447)(TypeEffect('力', 2.5));
skill(448, 449)(TypeEffect('速', 3));

skill(450, 451)(
  ClassEffect('格鬥', 2),
  ClassEffect('格鬥', 1.5)
);

skill(452, 453)(ClassEffect('打擊', 2));

skill(454, 455)(
  TypeEffect('力', 2),
  TypeEffect('力', 1.5)
);

skill(456, 457)(ClassEffect('射擊', 2));

skill(458, 459)(
  ({ character }) => character.cost <= 20 ? 3 : 1,
  () => 1.5
);

skill(461, 462)(
  ClassEffect('格鬥', 2),
  ClassEffect('格鬥', 1.25)
);

skill(464)(ClassEffect('打擊', 1.5));

skill(465)(
  function ({ timingHistory }) {
    let sum = 0;
    for (let i = 0; i < timingHistory.length; i++) {
      sum = timingHistory[i] === 'bad' ? sum + 1 : 0;
      if (sum >= 4) return 3;
    }
    return 1;
  },
  BeadEffect(1.25)
);

skill(466)(ClassEffect('射擊', 1.5));
skill(467)(TypeEffect('力', 1.5));
skill(471)(TypeEffect('知', 1.2));
skill(483)(TypeEffect('速', 1.2));
skill(486)(ClassEffect('打擊', 1.5));
skill(487)(null, TypeEffect('力', 1.2));
skill(488)(null, TypeEffect('速', 1.2));
skill(489)(null, TypeEffect('技', 1.2));

skill(490)(
  ClassEffect('打擊', 1.2),
  TypeEffect('力', 1.2)
);

skill(491)(null, TypeEffect('速', 1.2));

skill(492)(
  TypeEffect('技', 1.5),
  TypeEffect('技', 1.2)
);

skill(496)(ClassEffect('射擊', 1.5));
skill(497, 498)(TypeEffect('速', 1.5));
skill(501)(TypeEffect('心', 1.2));
skill(502)(TypeEffect('心', 1.5));
skill(505, 506)(null, TypeEffect('速', 1.25));
skill(507)(TypeEffect('力', 1.2));
skill(508)(TypeEffect('力', 1.5));

skill(509, 510)(
  ClassEffect('打擊', 2),
  ClassEffect('打擊', 1.5)
);

skill(511)(
  ClassEffect('斬擊', 2),
  ClassEffect('斬擊', 1.25)
);

skill(513)(TypeEffect('心', 1.5));

skill(514)(
  TypeEffect('知', 2),
  TypeEffect('知', 1.5)
);

skill(515, 516)(ClassEffect('斬擊', 1.5));

// ISSUE: 待確認倍率
// SpecialAbility[517, 518] = 我方兩回合的攻擊力微增

skill(519)(
  TypeEffect('力', 2),
  TypeEffect('力', 2)
);

skill(520)(
  TypeEffect('力', 2.5),
  TypeEffect('力', 2)
);

skill(523)(ClassEffect('打擊', 1.5));
skill(524)(ClassEffect('打擊', 2));
skill(525, 526)(TypeEffect('心', 2));
skill(527)(TypeEffect('技', 1.5));
skill(528)(TypeEffect('技', 2));

// ISSUE: 無法獲得 HP 的資訊
// 心珠出現率比例3倍(約37.5%)，心屬性攻擊力[2+0.75*(剩餘HP/總HP)]倍(體力越高倍率越高，最高2.75倍，最低2倍)
skill(529, 530)(TypeEffect('心', 2.75));  // 暫時以 HP 100% 計算

skill(533, 534)(
  TypeEffect('速', 2),
  BeadEffect(1.5)
);

skill(537, 538)({
  chainCoefficient: () => 2
});

skill(541)(TypeEffect('力', 2.5));
skill(543)(ClassEffect('射擊', 1.5));
skill(544)(ClassEffect('射擊', 2.25));

skill(545, 546)(
  TypeEffect('心', 2),
  TypeEffect('心', 1.5)
);

skill(548)(() => 1.2);

skill(549)(
  PerfectEffect(3, 2),
  () => 1.3
);

skill(550)(
  PerfectEffect(3, 2.5),
  () => 1.3
);

skill(553)(TypeEffect('技', 2.75));
skill(554)(TypeEffect('技', 3));
skill(555, 556)(ClassEffect('射擊', 2));
skill(557)(TypeEffect('知', 1.5));
skill(558)(TypeEffect('知', 2));

skill(559)(
  TypeEffect('力', 2),
  BeadEffect(1.5)
);

skill(560)(
  TypeEffect('力', 2.25),
  BeadEffect(1.5)
);

skill(561, 562)(function({ bead }) {
  return bead === 2 ? 3 : 2;
});

skill(568)(() => 1.25);
skill(569)(() => 1.5);

skill(570, 571)(function ({ character }) {
  return character.type === '力' || character.classes.indexOf('格鬥') >= 0 ? 1.5 : 1;
});

skill(572)(
  ClassEffect('格鬥', 2.5),
  ClassEffect('格鬥', 2)
);

skill(574, 575)(
  ClassEffect('打擊', 2),
  ClassEffect('打擊', 1.75)
);

skill(576)(() => 1.5);

skill(577, 578)(function ({ timingHistory }) {
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
});

skill(579)(TypeEffect(['速', '技'], 1.5));
skill(580)(TypeEffect(['速', '技'], 2));
skill(581)(TypeEffect('力', 1.5));

skill(582)(
  ClassEffect('打擊', 1.5),
  TypeEffect('速', 1.5)
);

skill(583)(ClassEffect('射擊', 1.5));
skill(584)(() => 0.1);

skill(589)(
  () => 1.5,
  ClassEffect('斬擊', 1.5)
);

skill(590)(
  () => 2,
  ClassEffect('斬擊', 1.5)
);

skill(596)(TypeEffect('力', 1.5));
skill(597)(TypeEffect('力', 1.75));

skill(598)(function({ character }) {
  return character.star === 1 || character.star === 2 ? 2.5 : 1;
});

skill(599)(function({ character }) {
  return character.star === 1 || character.star === 2 ? 3 : 1;
});

skill(600)(
  TypeEffect('心', 1.5),
  TypeEffect('心', 1.3)
);

skill(601)(
  TypeEffect('心', 2),
  TypeEffect('心', 1.3)
);

skill(602)(
  TypeEffect('速', 2),
  TypeEffect('速', 2)
);

skill(603)(
  TypeEffect('速', 2.25),
  TypeEffect('速', 2)
);

skill(604, 605)(ClassEffect('格鬥', 2));
skill(606)(ClassEffect('格鬥', 2));
skill(607)(ClassEffect('格鬥', 2.5));

skill(612, 613)(
  ClassEffect('斬擊', 1.5),
  { add: () => 45 }
);

skill(614)(function ({ character }) {
  return character.cost <= 20 ? 2.25 : 1;
});

skill(617)(null, ClassEffect('射擊', 1.2));

skill(629)(function ({ character }) {
  return 0 < character.star && character.star <= 3 ? 2 : 1;
});

skill(630)(ClassEffect('斬擊', 1.5));
skill(631)(ClassEffect('斬擊', 2));
skill(632)(ClassEffect('格鬥', 1.5));
skill(633)(ClassEffect('格鬥', 2));

skill(634)(
  TypeEffect(['速', '心'], 1.25),
  TypeEffect(['速', '心'], 1.2)
);

skill(635)(
  TypeEffect(['速', '心'], 1.5),
  TypeEffect(['速', '心'], 1.2)
);

skill(636)(function ({ character }) {
  return character.cost <= 2 ? 3 : 1;
});

skill(637)(
  ClassEffect('斬擊', 1.5),
  () => 1.3   // 給予一回合防禦力提高中的敵人傷害成為 1.3 倍
);

skill(638, 639)(ClassEffect('斬擊', 2));
skill(640)(ClassEffect('格鬥', 2));
skill(641)(ClassEffect('格鬥', 2.25));

skill(642)(
  TypeEffect('心', 2.5),
  BeadEffect(1.5)
);

skill(643)(
  TypeEffect('心', 3),
  BeadEffect(1.5)
);

skill(644)(TypeEffect('知', 2));
skill(645)(TypeEffect('知', 2.5));
skill(646)(ClassEffect('射擊', 2.5));
skill(647)(ClassEffect('射擊', 2.75));

skill(648, 649)(
  TypeEffect(['速', '心'], 2.75),
  BeadEffect(1.5)
);

skill(650, 651)(
  TypeEffect('知', 2),
  BeadEffect(1.5)
);

skill(652)(({ bead }) => bead === 2 ? 2 : 1);
skill(653)(({ bead }) => bead === 2 ? 2.25 : 1);
skill(654)(({ bead }) => bead === 2 ? 2.75 : 1);

skill(655)(
  TypeEffect('力', 1.5),
  BeadEffect(1.5)
);

skill(656)(
  TypeEffect('力', 2),
  BeadEffect(1.5)
);

skill(657)(ClassEffect('格鬥', 1.5));
skill(658)(ClassEffect('射擊', 1.5));
skill(659)(PerfectEffect(3, 2.5));
skill(660, 661)(ClassEffect('射擊', 2));
skill(662)(TypeEffect('心', 2));
skill(665)(() => 1.2);
skill(666)(() => 1.75);
skill(667)(() => 1.5);

skill(668, 669)(
  // ISSUE: 無法獲得 HP 的資訊
  // 全體回復力1.2倍，自由攻擊力[2+0.75*(剩餘HP/總HP)]倍(體力越高倍率越高，最高2.75倍，最低2倍)
  ClassEffect('自由', 2.75),  // 暫時以 HP 100% 計算

  // ISSUE: 無法選擇倍率
  // 1 回合自由 x1.5；若全體 Perfect 下回合自由 x2
  ClassEffect('自由', 1.5)
);

skill(670)(
  ClassEffect('格鬥', 2),
  ClassEffect('格鬥', 1.75)
);

skill(671)(
  ClassEffect('格鬥', 2.25),
  ClassEffect('格鬥', 1.75)
);

skill(672, 673)(ClassEffect('格鬥', 2));
skill(674)(ClassEffect('自由', 2));
skill(675)(ClassEffect('自由', 2.5));
skill(676, 677)(ClassEffect('斬擊', 1.5));
skill(678)(TypeEffect('心', 1.2));
skill(679)(TypeEffect('心', 1.5));

skill(680)(
  null,
  TypeEffect('技', 1.25)
);

skill(681)(
  ClassEffect('打擊', 1.5),
  TypeEffect('技', 1.25)
);

skill(683)(ClassEffect('格鬥', 1.5));
skill(685)(ClassEffect('射擊', 1.5));
skill(686)(ClassEffect('斬擊', 1.5));

skill(687)(
  ClassEffect('自由', 1.5),
  ClassEffect('自由', 1.3)
);

skill(688)(
  ClassEffect('自由', 2),
  ClassEffect('自由', 1.3)
);

skill(689)(
  ClassEffect('斬擊', 1.2),
  BeadEffect(1.5)
);

skill(690)(
  ClassEffect('斬擊', 1.5),
  BeadEffect(1.5)
);

skill(696)(ClassEffect('打擊', 1.75));
skill(697)(ClassEffect('射擊', 1.75));
skill(698)(ClassEffect('斬擊', 1.75));

skill(699)({
  add: function({ character }) {
    return character.classes.indexOf('射擊') >= 0 ? 500 : 0;
  }
});

skill(700)(ClassEffect('格鬥', 1.75));
skill(705)(TypeEffect(['力', '技', '速'], 1.25));
skill(706, 707)(TypeEffect('力', 1.5));
skill(708)(TypeEffect('心', 1.2));
skill(709)(TypeEffect('心', 1.5));

skill(710)(
  ClassEffect('射擊', 1.5),
  ClassEffect('射擊', 1.25)
);

skill(711)(
  ClassEffect('射擊', 2),
  ClassEffect('射擊', 1.25)
);

skill(712)(ClassEffect('打擊', 2));
skill(713)(ClassEffect('打擊', 2.5));

// ISSUE: 無法獲得角色位置
// SpecialAbility[712, 713] = 兩回合上段人物攻擊力 x1.5

skill(715, 716)(null, ClassEffect('自由', 1.5));

skill(717, 718)(function({ timingHistory }) {
  const prevTiming = timingHistory[timingHistory.length - 1];
  if (prevTiming === 'good')    return 2.25;
  if (prevTiming === 'great')   return 2.5;
  if (prevTiming === 'perfect') return 2.75;
  return 2;
});

skill(719, 720)(
  // ISSUE: 無法獲得 HP 得資訊
  // 搏識攻擊力[1.5+1.75*(1-剩餘HP)/總HP]倍(體力越少倍率越高，最大3.25倍，最小1.5倍)
  ClassEffect('博識', 3.25),  // 暫時以 HP 100% 計算

  // ISSUE: 無法獲得 HP 得資訊
  // 一回合間博識的攻擊力1.5倍，必殺技發動時體力30%以下2倍，敵全體攻擊力20倍技屬性傷害
  ClassEffect('博識', 1.5)    // 暫時以 HP 100% 計算
);

skill(721)(ClassEffect('格鬥', 1.5));
skill(722)(ClassEffect('格鬥', 2));
skill(723)(ClassEffect('斬擊', 1.5));
skill(724)(ClassEffect('斬擊', 1.75));
skill(727)(ClassEffect(['格鬥', '自由'], 1.75));
skill(728, 729)(TypeEffect('技', 1.2));

skill(730)(
  TypeEffect('知', 1.2),
  TypeEffect('知', 1.5)
);

skill(731)(
  TypeEffect('知', 1.5),
  TypeEffect('知', 1.5)
);

skill(734)(TypeEffect('心', 1.2));
skill(735)(TypeEffect('心', 1.5));
skill(736)(ClassEffect('斬擊', 2.5));
skill(737)(ClassEffect('格鬥', 2.75));
skill(738)(({ character }) => character.cost >= 21 ? 2 : 1);
skill(739)(ClassEffect('自由', 2));
skill(740, 741)(() => 1.3);

skill(742)(
  ClassEffect('自由', 1.2),
  BeadEffect(1.5)
);

skill(743)(
  ClassEffect('自由', 1.5),
  BeadEffect(1.5)
);

skill(744)(ClassEffect('自由', 2));
skill(745)(ClassEffect('自由', 2.5));

skill(747, 748)(function({ character, bead }) {
  if (character.classes.indexOf('強韌') === -1) {
    return 1;
  }
  return bead === 2 ? 3 : 2.5;
});

skill(749)(TypeEffect('技', 1.5));
skill(750)(TypeEffect('技', 2));
skill(751)(ClassEffect('博識', 1.5));
skill(752)(ClassEffect('博識', 2.25));

skill(753)(
  ClassEffect('強韌', 2),
  BeadEffect(1.5)
);

skill(754)(
  ClassEffect('強韌', 2.5),
  BeadEffect(1.5)
);

skill(755)(
  TypeEffect('知', 1.5),
  ClassEffect('強韌', 1.75)
);

skill(756)(
  TypeEffect('知', 2),
  ClassEffect('強韌', 1.75)
);

skill(757, 758)(TypeEffect('心', 2));
skill(759)(TypeEffect('力', 2.5));
skill(760)(TypeEffect('力', 3));

skill(761)(
  ClassEffect('格鬥', 2),
  () => 1.2
);

skill(762)(
  TypeEffect('心', 1.5),
  TypeEffect('心', 1.75)
);

skill(763)(TypeEffect('力', 2));
skill(764)(ClassEffect('打擊', 1.5));
skill(766)(TypeEffect('速', 2));
skill(767)(TypeEffect('技', 1.5));
skill(768)(TypeEffect('心', 2));
skill(769)(TypeEffect('知', 1.5));
skill(770)(TypeEffect('力', 2));

skill(771)(
  ClassEffect('博識', 2.5),
  ClassEffect('博識', 1.75)
);

skill(772)(ClassEffect('斬擊', 2));
skill(774)(ClassEffect('自由', 2));
skill(775)(ClassEffect('博識', 1.5));
skill(776)(TypeEffect('心', 1.25));
skill(777)(TypeEffect('心', 1.75));

skill(780)(
  () => 2,
  // ISSUE: 無法獲得 HP 的資訊
  // HP 50 ~ 100%, 攻 x 1.5
  // HP 20 ~  50%, 攻 x 1.75
  // HP  0 ~  20%, 攻 x 2
  () => 1.5  // 暫時以 HP 100% 計算
);

skill(781)(
  () => 2.5,
  () => 1.5  // 暫時以 HP 100% 計算
);

skill(783)(ClassEffect('斬擊', 2));

skill(788)(
  null,
  ClassEffect('斬擊', 1.75)
);

skill(789)(
  ClassEffect('斬擊', 1.5),
  ClassEffect('斬擊', 1.75)
);

skill(790)(
  null,
  TypeEffect(['力', '技', '速'], 1.2)
);

skill(791)(
  TypeEffect(['力', '技', '速'], 1.25),
  TypeEffect(['力', '技', '速'], 1.2)
);

skill(793)(ClassEffect('博識', 1.5));
skill(794)(ClassEffect('強韌', 3));
skill(795)(ClassEffect('強韌', 3.5));
skill(796)(ClassEffect('博識', 2));
skill(797)(ClassEffect(['博識', '強韌'], 2));

skill(798)(
  PerfectEffect(3, 2.5),
  ClassEffect('格鬥', 1.75)
);

skill(801)(TypeEffect('心', 2));
skill(802)(TypeEffect('心', 2.5));

skill(803)(
  TypeEffect('技', 1.2),
  () => 1.1
);

skill(804)(
  TypeEffect('技', 1.5),
  () => 1.1
);

skill(805, 806)(
  ClassEffect('打擊', 2),
  BeadEffect(1.75)
);

skill(807, 808)(
  ClassEffect('博識', 1.5),
  () => 1.3
);

skill(809)(
  ClassEffect('強韌', 1.5),
  BeadEffect(1.5)
);

skill(810)(
  ClassEffect('強韌', 2),
  BeadEffect(1.5)
);

skill(815)(OrderEffect(['力', '知', '技'], 2.5));
skill(816)(OrderEffect(['力', '知', '技'], 2.75));

skill(825)(
  TypeEffect('力', 1.5),
  { add: ({ character }) => character.type === '力' ? 200 : 0 }
);

skill(826)(
  TypeEffect('技', 1.5),
  () => 0.2
);

skill(827)(TypeEffect('速', 1.5));
skill(830)(ClassEffect(['博識', '打擊'], 1.75));
skill(831)(ClassEffect(['博識', '打擊'], 2));

skill(832)(
  ClassEffect('自由', 2.5),
  ClassEffect('自由', 1.5),
);

skill(833)(
  ClassEffect('自由', 2.75),
  ClassEffect('自由', 1.5),
);

skill(834)(ClassEffect('射擊', 1.5));

skill(835, 836)(
  ClassEffect('博識', 2),
  BeadEffect(1.75)
);

skill(837)(
  ClassEffect('野心', 2),
  ClassEffect('野心', 1.75)
);

skill(838)(
  ClassEffect('野心', 2.5),
  ClassEffect('野心', 1.75)
);

skill(839)(
  ClassEffect('打擊', 2),
  ({ characterList, specialAbilityIndex }) => {
    return characterList.length === specialAbilityIndex ? 2 : 1;
  }
);

skill(840)(
  ClassEffect('打擊', 2.5),
  ({ characterList, specialAbilityIndex }) => {
    return characterList.length === specialAbilityIndex ? 2 : 1;
  }
);

skill(841, 842)(
  null,
  () => 1.25
);

skill(843)(
  ClassEffect(['斬擊', '打擊', '射擊'], 1.5),
  ClassEffect('射擊', 1.5)
  // ISSUE: 無法選擇下回合加乘的類型，預設一律採用射擊類角色的攻擊力1.5倍
  // 必殺技：1回合間，射擊類角色的攻擊力1.5倍，敵全體攻擊力15倍力屬性傷害
  // 此回合全員PERFECT攻擊力成功時，次回合射擊、斬擊、打突類的攻擊力1.5倍
);

skill(844)(
  ClassEffect(['斬擊', '打擊', '射擊'], 2),
  ClassEffect('射擊', 1.5)
  // ISSUE: 無法選擇下回合加乘的類型，預設一律採用射擊類角色的攻擊力1.5倍
  // 必殺技：1回合間，射擊類角色的攻擊力1.5倍，敵全體攻擊力15倍力屬性傷害
  // 此回合全員PERFECT攻擊力成功時，次回合射擊、斬擊、打突類的攻擊力1.5倍
);

// TODO: 845, 846 根據 combo 總和數給予加乘

skill(847)(
  () => 1.5,
  ({ bead }) => BeadEffect(1.1)({ bead }) * 1.05
);

skill(848)(
  () => 2,
  ({ bead }) => BeadEffect(1.1)({ bead }) * 1.05
);

skill(849)(ClassEffect('射擊', 1.75));
skill(850)(ClassEffect(['打擊', '博識'], 1.5));


export default {
  CaptainEffect,
  SpecialAbility
}
