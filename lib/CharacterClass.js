import { autobind }  from 'core-decorators';

const isInteger = function (num) {
  return typeof num === 'number' && num % 1 === 0;
}

const isWord = function (str) {
  return typeof str === 'string' && str.length > 0;
}

const isEmpty = function (str) {
  return typeof str !== 'string' || str.length === 0 || str === 'なし' || str === '無';
}

const IMG_HOST = 'http://onepiece-treasurecruise.com/wp-content/uploads/';

export default class Character {
  static compact (character) {
    const c = character;
    return [
      c.no,                           // 0
      [c.name.jp, c.name.tw],         // 1
      c.imgUrl.replace(IMG_HOST, ''), // 2
      c.type,                         // 3
      c.classes,                      // 4
      c.star,                         // 5
      c.cost,                         // 6
      c.combo,                        // 7
      [c.min.lv, c.min.hp, c.min.atk, c.min.rcv], // 8
      [c.max.lv, c.max.hp, c.max.atk, c.max.rcv], // 9
      [
        [c.specialAbility.jp.name, c.specialAbility.jp.content],
        [c.specialAbility.tw.name, c.specialAbility.tw.content]
      ],
      [
        [c.captainEffect.jp.name, c.captainEffect.jp.content],
        [c.captainEffect.tw.name, c.captainEffect.tw.content]
      ]
    ];
  }

  static parse (data) {
    if (Array.isArray(data) === false) {
      return null;
    }

    const c = new Character();
    c.no = data[0];
    c.name = {
      jp: data[1][0],
      tw: data[1][1]
    };
    c.imgUrl  = IMG_HOST + data[2];
    c.type    = data[3];
    c.classes = data[4];
    c.star    = data[5];
    c.cost    = data[6];
    c.combo   = data[7];
    c.min = {
      lv:  data[8][0],
      hp:  data[8][1],
      atk: data[8][2],
      rcv: data[8][3]
    };
    c.max = {
      lv:  data[9][0],
      hp:  data[9][1],
      atk: data[9][2],
      rcv: data[9][3]
    };
    c.specialAbility = {
      jp: { name: data[10][0][0], content: data[10][0][1] },
      tw: { name: data[10][1][0], content: data[10][1][1] }
    };
    c.captainEffect = {
      jp: { name: data[11][0][0], content: data[11][0][1] },
      tw: { name: data[11][1][0], content: data[11][1][1] }
    };
    return c;
  }

  constructor () {
    this.no = 0;
    this.name = { jp: null, tw: null };
    this.imgUrl = 'http://onepiece-treasurecruise.com/wp-content/themes/onepiece-treasurecruise/images/noimage.png';
    this.type = null;
    this.classes = [];
    this.star = 0;
    this.cost = 0;
    this.combo = 1;
    this.min = { lv: 0, hp: 0, atk: 0, rcv: 0 };
    this.max = { lv: 0, hp: 0, atk: 0, rcv: 0 };
    this.specialAbility = {
      jp: { name: null, content: null },
      tw: { name: null, content: null }
    };
    this.captainEffect = {
      jp: { name: null, content: null },
      tw: { name: null, content: null }
    };
  }

  @autobind
  setNo (no) {
    if (!isInteger(no) || no < 1) {
      throw new Error('Invalid parameter: no = ' + no);
    }

    this.no = no;
    return this;
  }

  @autobind
  setName (lang, name) {
    if (isWord(lang) === false) {
      throw new Error('Invalid parameter: lang = ' + lang);
    }

    if (!isWord(name)) {
      throw new Error('Invalid parameter: name = ' + name);
    }

    this.name[lang] = name.trim();
    return this;
  }

  @autobind
  setImgUrl (url) {
    this.imgUrl = url;
    return this;
  }

  @autobind
  setType (type) {
    if (!isWord(type)) {
      throw new Error('Invalid parameter: type = ' + type);
    }
    type = type.trim();

    // translate into chinese
    switch (type) {
      case '力属性': type = '力'; break;
      case '技属性': type = '技'; break;
      case '速属性': type = '速'; break;
      case '心属性': type = '心'; break;
      case '知属性': type = '知'; break;
      default:
        type = type.charAt(0);
        break;
    }

    // check types
    const validTypes = ['力', '技', '速', '心', '知'];
    if (validTypes.indexOf(type) < 0) {
      throw new TypeError('Unknown type ' + type);
    }

    this.type = type;
    return this;
  }

  @autobind
  addClass (classes) {
    if (!isWord(classes)) {
      throw new Error('Invalid parameter: classes = ' + classes);
    }
    classes = classes.trim()

    // ignore classes '-'
    if (classes.length === 1 || classes === '-') {
      return this;
    }

    // translate into chinese
    switch (classes) {
      case '格闘': classes = '格鬥'; break;
      case '斬撃': classes = '斬擊'; break;
      case '打突': classes = '打擊'; break;
      case '射撃': classes = '射擊'; break;
      case '自由': classes = '自由'; break;
      case '野心': classes = '野心'; break;
      case '博識': classes = '博識'; break;
      case '強靱': classes = '強韌'; break;
      case '強化用': classes = '強化用'; break;
      case '進化用': classes = '進化用'; break;
    }

    // check classes
    const validClasses = ['格鬥', '斬擊', '打擊', '射擊', '強化用', '進化用', '自由', '野心', '博識', '強韌'];
    if (validClasses.indexOf(classes) < 0) {
      throw new TypeError('Unknown class ' + classes);
    }

    this.classes.push(classes);
    return this;
  }

  @autobind
  setStar (star) {
    if (!isInteger(star) || star < 1) {
      throw new Error('Invalid parameter: star = ' + star);
    }

    this.star = star;
    return this;
  }

  @autobind
  setCost(cost) {
    if (!isInteger(cost) || cost < 1) {
      throw new Error('Invalid parameter: cost = ' + cost);
    }

    this.cost = cost;
    return this;
  }

  @autobind
  setCombo(combo) {
    if (!isInteger(combo) || combo < 1) {
      throw new Error('Invalid parameter: combo = ' + combo);
    }

    this.combo = combo;
    return this;
  }

  @autobind
  setMin(lv, hp, atk, rcv) {
    if (!isInteger(lv) || lv < 1 || lv > 99) {
      throw new Error('Invalid parameter: lv = ' + lv);
    }

    if (!isInteger(hp)) {
      throw new Error('Invalid parameter: hp = ' + hp);
    }

    if (!isInteger(atk)) {
      throw new Error('Invalid parameter: atk = ' + atk);
    }

    if (!isInteger(rcv)) {
      throw new Error('Invalid parameter: rcv = ' + rcv);
    }

    this.min.lv = lv;
    this.min.hp = hp;
    this.min.atk = atk;
    this.min.rcv = rcv;
    return this;
  }

  @autobind
  setMax(lv, hp, atk, rcv) {
    if (!isInteger(lv) || lv < 1 || lv > 99) {
      throw new Error('Invalid parameter: lv = ' + lv);
    }

    if (!isInteger(hp)) {
      throw new Error('Invalid parameter: hp = ' + hp);
    }

    if (!isInteger(atk)) {
      throw new Error('Invalid parameter: atk = ' + atk);
    }

    if (!isInteger(rcv)) {
      throw new Error('Invalid parameter: rcv = ' + rcv);
    }

    this.max.lv = lv;
    this.max.hp = hp;
    this.max.atk = atk;
    this.max.rcv = rcv;
    return this;
  }

  @autobind
  setSpecialAbility(lang, name, content) {
    if (isWord(lang) === false) {
      throw new Error('Invalid parameter: lang = ' + lang);
    }

    this.specialAbility[lang].name    = isEmpty(name) ? null : name.trim();
    this.specialAbility[lang].content = isEmpty(content) ? null : content.trim();
    return this;
  }

  @autobind
  setCaptainEffect(lang, name, content) {
    if (isWord(lang) === false) {
      throw new Error('Invalid parameter: lang = ' + lang);
    }

    this.captainEffect[lang].name    = isEmpty(name) ? null : name.trim();
    this.captainEffect[lang].content = isEmpty(content) ? null : content.trim();
    return this;
  }
}
