import { MAX_CHAR_TW } from '../config';
import React           from 'react';
import ShortId         from 'shortid';
import AttackAnalysis  from '../lib/AttackAnalysis';
import Ship            from './Ship';
import CharacterList   from './CharacterList';
import './OnePiece.less';

export default class OnePiece extends React.Component {
  constructor (props) {
    super(props);
    this.changeShip = this.changeShip.bind(this);
    this.selectEnemyType = this.selectEnemyType.bind(this);
    this.updateDefense = this.updateDefense.bind(this);
    this.updateCharacters = this.updateCharacters.bind(this);
    this.updateDetailCheckbox = this.updateDetailCheckbox.bind(this);
    this.updateCustomCheckbox = this.updateCustomCheckbox.bind(this);
    this.maxDamageOrder = this.maxDamageOrder.bind(this);

    this.state = {
      enemy: { type: '知', defense: 699 }, // Z
      ship: { no: 1, level: 10 },
      characters: [
        { no: 223, attack: 669,  bead: 2, timing: 'perfect', custom: '1', specialAbility: true }, // 衝擊布
        { no: 208, attack: 709,  bead: 2, timing: 'perfect', custom: '1' },                       // Mr.2
        { no: 263, attack: 984,  bead: 2, timing: 'perfect', custom: '1', specialAbility: true }, // 克比
        { no: 251, attack: 1100, bead: 2, timing: 'perfect', custom: '1', captainEffect: true  }, // 馬可
        { no: 251, attack: 1100, bead: 2, timing: 'perfect', custom: '1', captainEffect: true  }, // 馬可
        { no: 306, attack: 1220, bead: 2, timing: 'perfect', custom: '1' },                       // 卡普
      ],
      showDetail: false,
      showCustom: false
    };

    // get the state from local storage
    const state = window.localStorage.getItem('state');
    if (state !== null) {
      this.state = JSON.parse(state);
    }

    // migration boat => ship
    if (typeof this.state.boat === 'number') {
      delete this.state.boat;
      this.state.ship = { no: 1, level: 10 };
    }

    // generate unique id for each character
    this.state.characters.forEach(character => { character.id = ShortId.generate() });
  }

  changeShip(ship) {
    this.setState({ ship });
  }

  selectEnemyType(event) {
    const type = event.target.value;
    this.setState({
      enemy: {
        type,
        defense: this.state.enemy.defense
      }
    });
  }

  updateDefense (event) {
    const { value } = event.target;
    const defense = value.length === 0 ? 0 : Number.parseInt(value, 10);  // parse into integer

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
      let report = AttackAnalysis({
        ...this.state,
        characters: characters.map(character => {
          return {
            ...character,
            custom: this.state.showCustom ? Number.parseFloat(character.custom) : 1
          };
        })
      });

      if (report.total.attack >= result.total) {
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
    const hide = { display: 'none' };

    // save the state to local storage
    window.localStorage.setItem('state', JSON.stringify(this.state));

    const types = ['力', '技', '速', '心', '知'];
    return (
      <div className='one-piece'>
        <div className='info'>
          <Ship className='ship'
            ship={this.state.ship}
            onChange={this.changeShip}/>

          <div className='enemy' >
            <div>
              <span>敵屬：</span>
              <select className='pointer-cursor' onChange={this.selectEnemyType} value={this.state.enemy.type}>
                {types.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
            <div className='defense'>
              <span>防禦：</span>
              <input type='number' min='0' value={this.state.enemy.defense} onChange={this.updateDefense}/>
            </div>
          </div>
        </div>

        <div className='container'>
          <CharacterList
            characters={this.state.characters}
            showCustom={this.state.showCustom}
            onChange={this.updateCharacters} />

          <div className='report'>{generateReport(this.state)}</div>
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
            <div className='baseline' style={MAX_CHAR_TW < 529 ? hide : {}}>
              <input type='checkbox' checked={this.state.showCustom} onChange={this.updateCustomCheckbox}/>
              <span>&nbsp;顯示自訂倍率</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function generateReport(state) {
  const { showDetail, showCustom } = state;
  const { captains, shipInfo, specialAbilities, analysis, total: Total } = AttackAnalysis({
    ...state,
    characters: state.characters.map(character => {
      return {
        ...character,
        custom: state.showCustom ? Number.parseFloat(character.custom) : 1
      };
    })
  });

  function proportion(attack) {
    return Math.floor(attack / Total.attack * 1000) / 10;
  }

  function detail(damage, showDetail) {
    if (showDetail === false) return '';
    return `\n傷害分析：\n${damage.history.join('\n')} => ${damage.total}\n`
  }

  // 1. Ship Effect
  const shipEffectContent = `船隻效果：\n${shipInfo.text}\n`;

  // 2. Captain Effect
  const captainEffectContent = captains.reduce((text, character, index) => {
    const name = character.name.tw ? character.name.tw : character.name.jp;
    const content = character.captainEffect.tw.content ? character.captainEffect.tw.content : character.captainEffect.jp.content;
    return text + `${index + 1}. ${content}\n`;
  }, captains.length === 0 ? '' : '\n船長效果：\n');


  // 3. Special Ability
  const specialAbilityContent = specialAbilities.reduce((text, character, index) => {
    const name = character.name.tw ? character.name.tw : character.name.jp;
    const content = character.specialAbility.tw.content ? character.specialAbility.tw.content : character.specialAbility.jp.content;
    return text + `${index + 1}. ${content}\n`;
  }, specialAbilities.length === 0 ? '' : '\n必殺技效果：\n');


  // 4. Attack Analysis
  const analysisContent = analysis.reduce((text, { character, magnification: magni, attack, damage, total }, index) => {
    return text +
`\n----------------------------------\n
第 ${index + 1} 位：${character.name.tw || character.name.jp} (No.${character.no})

類型：${character.classes.join('/')}, 攻擊：${attack.original} (+${attack.add}), 連擊：${character.combo}
船隻：${magni.ship}, 船長：${magni.captain}, 剋屬：${magni.type}
特殊：${magni.special}, 屬珠：${magni.bead}, Chain：${magni.chain}${showCustom ? ', 自訂：' + magni.custom : ''}
加成後攻擊力 = ${attack.basic}

每單一擊傷害 = ${damage.singal}（共 ${attack.combo - 1} 擊）
最後一擊傷害 = ${damage.final} (${attack.timing.toUpperCase()})
造成總共傷害 = ${damage.total} (${proportion(damage.total)}％)
${detail(damage, showDetail)}
Combo = ${total.combo}
Total = ${total.attack}\n`
  }, '');

  return shipEffectContent + captainEffectContent + specialAbilityContent + analysisContent;
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
