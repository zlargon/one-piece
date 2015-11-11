import React             from 'react';
import ShortId           from 'shortid';
import attackAnalysis    from '../lib/attackAnalysis';
import CharacterList     from './CharacterList';
import './OnePiece.less'

export default class OnePiece extends React.Component {
  constructor (props) {
    super(props);

    this.changeBoat = this.changeBoat.bind(this);
    this.switchEnemyType = this.switchEnemyType.bind(this);
    this.updateDefense = this.updateDefense.bind(this);
    this.updateCharacters = this.updateCharacters.bind(this);
    this.updateDetailCheckbox = this.updateDetailCheckbox.bind(this);
    this.updateCustomCheckbox = this.updateCustomCheckbox.bind(this);
    this.maxDamageOrder = this.maxDamageOrder.bind(this);

    this.state = {
      enemy: { type: '心', defense: 100 }, // 卡普
      boat: 1.5,
      characters: [
        { no: 8,   attack: 1250, bead: 1, timing: 'perfect' },                       // 索隆 Lv.87
        { no: 227, attack: 1285, bead: 1, timing: 'perfect', captainEffect: true },  // 鷹眼 Lv.99
        { no: 227, attack: 1285, bead: 1, timing: 'perfect', captainEffect: true },  // 鷹眼 Lv.99
        { no: 39,  attack: 702,  bead: 1, timing: 'perfect' },                       // 巴其 Lv.61
        { no: 66,  attack: 1491, bead: 1, timing: 'perfect' },                       // 惡龍 Lv.99
        { no: 255, attack: 1155, bead: 1, timing: 'perfect' },                       // 花劍 Lv.71
      ],
      showDetail: false,
      showCustom: false
    };

    // get the data from local storage
    const data = window.localStorage.getItem('data');
    if (data !== null) {
      this.state = JSON.parse(data);
    }

    // generate unique id for each character
    this.state.characters.forEach(character => { character.id = ShortId.generate() });
  }

  changeBoat () {
    function next(boat) {
      const boats = [ 1, 1.2, 1.5 ];
      const index = boats.indexOf(boat);
      const nextIndex = (index + 1) % boats.length;
      return boats[nextIndex];
    }

    this.setState({
      boat: next(this.state.boat)
    })
  }

  switchEnemyType () {
    function next(type) {
      const types = [ '力', '技', '速', '心', '知' ];
      const index = types.indexOf(type);
      const nextIndex = (index + 1) % types.length;
      return types[nextIndex];
    }

    this.setState({
      enemy: {
        type: next(this.state.enemy.type),
        defense: this.state.enemy.defense
      }
    });
  }

  updateDefense (event) {
    const { value } = event.target;

    let defense = 0;
    if (value.length !== 0) {
      // parse into integer
      defense = Number.parseInt(value, 10);

      // don't change the input value
      if (Number.isNaN(defense)) return;

      // defense is positive
      if (defense < 0) defense = 0;
    }

    this.setState({
      enemy: {
        type: this.state.enemy.type,
        defense
      }
    });
  }

  updateCharacters (characters) {
    this.setState({ characters });
  }

  updateDetailCheckbox (event) {
    this.setState({ showDetail: event.target.checked });
  }

  updateCustomCheckbox (event) {
    this.setState({ showCustom: event.target.checked });
  }

  maxDamageOrder () {
    const max = enumerate(this.state.characters).reduce((result, characters) => {
      let report = attackAnalysis({
        enemy: this.state.enemy,
        boat: this.state.boat,
        characters
      });

      if (report.total.attack > result.total) {
        return {
          total: report.total.attack,
          characters
        }
      }

      return result;
    }, {
      total: 0,
      characters: []
    });

    this.setState({ characters: max.characters });
  }

  render () {
    // save the data to local storage
    window.localStorage.setItem('data', JSON.stringify(this.state));

    return (
      <div className='one-piece'>
        <div className='info'>
          <div className='pointer-cursor' onClick={this.changeBoat}>
            梅莉號：{this.state.boat} 倍
          </div>
          <div className='enemy' >
            <div className='pointer-cursor' onClick={this.switchEnemyType}>
              敵屬性：{this.state.enemy.type} ,
            </div>
            <div className='defense'>
              防禦：<input type='number' value={this.state.enemy.defense} onChange={this.updateDefense}/>
            </div>
          </div>
        </div>
        <div className='container'>
          <CharacterList
            characters={this.state.characters}
            showCustom={this.state.showCustom}
            onChange={this.updateCharacters} />

          <div className='report'>
            {generateReport(attackAnalysis(this.state), this.state.showDetail)}
          </div>
        </div>

        <div className='option baseline'>
          <div>
            <button onClick={this.maxDamageOrder}>最大傷害排序</button>
          </div>
          <div>
            <div className='baseline'>
              <input type='checkbox' checked={this.state.showDetail} onChange={this.updateDetailCheckbox}/>
              <span>&nbsp;顯示傷害分析</span>
            </div>
            <div className='baseline'>
              <input type='checkbox' checked={this.state.showCustom} onChange={this.updateCustomCheckbox}/>
              <span>&nbsp;顯示自訂倍率</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function generateReport(data, showDetail) {
  const { captains, specialAbilities, analysis } = data;

  function proportion(attack) {
    return Math.floor(attack / data.total.attack * 1000) / 10;
  }

  function detail(damage, showDetail) {
    if (showDetail === false) return '';
    return `\n傷害分析：\n${damage.history.join('\n')} => ${damage.total}\n`
  }


  // 1. Captain Effect
  const captainEffectContent = captains.reduce((text, character, index) => {
    const name = character.name.tw ? character.name.tw : character.name.jp;
    const content = character.captainEffect.tw.content ? character.captainEffect.tw.content : character.captainEffect.jp.content;
    return text + `${index + 1}. ${content}\n`;
  }, captains.length === 0 ? '' : '船長效果：\n');


  // 2. Special Ability
  const specialAbilityContent = specialAbilities.reduce((text, character, index) => {
    const name = character.name.tw ? character.name.tw : character.name.jp;
    const content = character.specialAbility.tw.content ? character.specialAbility.tw.content : character.specialAbility.jp.content;
    return text + `${index + 1}. ${content}\n`;
  }, specialAbilities.length === 0 ? '' : '\n必殺技效果：\n');


  // 3. Attack Analysis
  const analysisContent = analysis.reduce((text, { character, magnification: magni, attack, damage, total }, index) => {
    return text +
`\n----------------------------------\n
第 ${index + 1} 位：${character.name.tw || character.name.jp} (No.${character.no})

類型：${character.classes.join('/')}, 攻擊：${attack.original}, 連擊：${character.combo}
梅莉號：${magni.boat}, 船長：${magni.captain}, 剋屬：${magni.type}
特殊：${magni.special}, 屬珠：${magni.bead}, Chain：${magni.chain}
加成後攻擊力 = ${attack.basic}

每單一擊傷害 = ${damage.singal}（共 ${attack.combo - 1} 擊）
最後一擊傷害 = ${damage.final} (${attack.timing.toUpperCase()})
造成總共傷害 = ${damage.total} (${proportion(damage.total)}％)
${detail(damage, showDetail)}
Combo = ${total.combo}
Total = ${total.attack}\n`
  }, '');


  return captainEffectContent + specialAbilityContent + analysisContent;
}

function enumerate (source) {
  let sourceCopy = source.slice();
  let target = [];
  let arr = [];
  function recursive(source) {
    for (let i = 0; i < source.length; i++) {
      arr.push(source[i]);
      source.splice(i, 1);
      if (source.length === 0) {
        target.push(arr.slice());
      } else {
        recursive(source);
      }
      source.splice(i, 0, arr.pop());
    }
  }
  recursive(sourceCopy);
  return target;
}
