import { MAX_CHAR_JP }            from '../config';
import React                      from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import CharacterInfo              from '../lib/CharacterInfo';
import CharacterDnD               from './CharacterDnD';
import './Character.less';

@DropTarget('CharacterItem', CharacterDnD.target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('CharacterItem', CharacterDnD.source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
export default class Character extends React.Component {
  static propTypes = {
    // drag and drop pros
    connectDragSource: React.PropTypes.func.isRequired,
    connectDragPreview: React.PropTypes.func.isRequired,
    connectDropTarget: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    index: React.PropTypes.number.isRequired,

    // character data
    character: React.PropTypes.shape({
      id: React.PropTypes.string.isRequired,
      no: React.PropTypes.number.isRequired,
      attack: React.PropTypes.number.isRequired,
      bead: React.PropTypes.number.isRequired,
      timing: React.PropTypes.string.isRequired,
      custom: React.PropTypes.string.isRequired,
      captainEffect: React.PropTypes.bool,
      specialAbility: React.PropTypes.bool
    }),

    isCaptainFull: React.PropTypes.bool.isRequired,
    isMobileDevice: React.PropTypes.bool.isRequired,
    showCustom: React.PropTypes.bool.isRequired,

    // callback
    onMove: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.changeNo = this.changeNo.bind(this);
    this.changeAttack = this.changeAttack.bind(this);
    this.switchBead = this.switchBead.bind(this);
    this.changeTiming = this.changeTiming.bind(this);
    this.checkCaptainEffect = this.checkCaptainEffect.bind(this);
    this.checkSpecialAbility = this.checkSpecialAbility.bind(this);
    this.changeCustom = this.changeCustom.bind(this);
  }

  // return new no to parent
  changeNo(event) {
    const { character, index } = this.props;
    const { value } = event.target;   // string

    let no = 0;
    if (value.length !== 0) {
      // parse into integer
      no = Number.parseInt(value, 10);

      // limit character no
      if (no > MAX_CHAR_JP) {
        no = MAX_CHAR_JP;
      }
    }

    this.props.onChange(index, {
      ...character, no,
      attack: CharacterInfo.get(no).max.atk
    });
  }

  changeAttack (event) {
    const { character, index } = this.props;
    const { value } = event.target;   // string

    this.props.onChange(index, {
      ...character,
      attack: value.length === 0 ? 0 : Number.parseInt(value, 10)
    });
  }

  switchBead() {
    const { character, index } = this.props;

    function next(bead) {
      const beads = [ 0.5, 1, 2];
      const index = beads.indexOf(bead);
      const nextIndex = (index + 1) % beads.length;
      return beads[nextIndex];
    }

    this.props.onChange(index, {
      ...character,
      bead: next(character.bead)
    });
  }

  changeTiming(event) {
    const { character, index } = this.props;

    this.props.onChange(index, {
      ...character,
      timing: event.target.value
    });
  }

  checkCaptainEffect(event) {
    const { character, index } = this.props;

    this.props.onChange(index, {
      ...character,
      captainEffect: event.target.checked
    });
  }

  checkSpecialAbility(event) {
    const { character, index } = this.props;

    this.props.onChange(index, {
      ...character,
      specialAbility: event.target.checked
    });
  }

  changeCustom(event) {
    const { character, index } = this.props;
    const isValid = event.target.validity.valid;

    let custom = event.target.value;  // string
    if (custom.length === 0) {
      custom = '0';
    } else {
      // remove leading zero
      const [ integral, decimal ] = custom.split('.');
      custom = Number.parseInt(integral, 10) + (custom.indexOf('.') >= 0 ? '.' : '') + (decimal ? decimal : '');
    }

    this.props.onChange(index, {
      ...character,
      custom: isValid ? custom : character.custom
    });
  }

  render() {
    const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;
    const { character, isCaptainFull, isMobileDevice, showCustom } = this.props;
    const characterInfo = CharacterInfo.get(character.no);

    // Styles
    const invisible = { visibility: 'hidden' };
    const dragging = {
      opacity: isDragging && !isMobileDevice ? 0 : 1,
      backgroundColor: isDragging && isMobileDevice ? 'lightsteelblue' : 'white'
    };

    // Image Title
    function imageTitle (info) {
      return `${info.name.tw ? info.name.tw : info.name.jp}\n
類型：${info.classes.join('/')}
Combo：${info.combo}
攻擊：${info.min.atk} - ${info.max.atk}
體力：${info.min.hp} - ${info.max.hp}
回復：${info.min.rcv} - ${info.max.rcv}
Cost：${info.cost}
\n船長技：\n${info.captainEffect.tw.content ? info.captainEffect.tw.content : info.captainEffect.jp.content}
\n必殺技：\n${info.specialAbility.tw.content ? info.specialAbility.tw.content : info.specialAbility.jp.content}`;
    }

    // Bead Text
    function beadText (bead) {
      if (bead === 0.5) return '暗珠';
      if (bead === 1)   return '正常';
      if (bead === 2)   return '亮珠';
    }

    // Timing Options
    function timingOptions () {
      const timings = ['bad', 'good', 'great', 'perfect', 'miss'];
      return timings.map(v => <option key={v} value={v}>{v}</option>);
    }

    return connectDragPreview(connectDropTarget(
      <div className='one-piece-character' style={dragging}>

        <div className='checkbox'>
          <div style={isCaptainFull && !character.captainEffect ? invisible : {}}>
            <span>船&nbsp;</span>
            <input type='checkbox' checked={character.captainEffect} onChange={this.checkCaptainEffect} />
          </div>
          <div style={characterInfo.specialAbility.hasSpecialAbility ? {} : invisible}>
            <span>必&nbsp;</span>
            <input type='checkbox' checked={character.specialAbility} onChange={this.checkSpecialAbility} />
          </div>
        </div>

        {connectDragSource(
          <img src={characterInfo.imgUrl}
            alt={imageTitle(characterInfo)}
            title={imageTitle(characterInfo)} />
        )}

        <div className='columns'>
          <div className='col-1'>
            <div>
              <div className='input-box'>
                <span>No.&nbsp;</span>
                <input type='number' min='0' value={character.no} onChange={this.changeNo} />
              </div>
            </div>

            <div>
              <div className='input-box'>
                <span>攻&nbsp;</span>
                <input type='number' min='0' value={character.attack} onChange={this.changeAttack} />
              </div>
            </div>
          </div>

          <div className='col-2'>
            <div className='bead'>
              <div onClick={this.switchBead}>
                {beadText(character.bead)}
              </div>
            </div>

            <div>
              <select value={character.timing} onChange={this.changeTiming}>
                {timingOptions()}
              </select>
            </div>
          </div>

          <div className='col-3' style={{ display: showCustom ? '' : 'none' }}>
            <div>{/* empty */}</div>
            <div>
              <input className='custom' type='number' step='0.01' min='0' pattern='[0-9]+([\.|,][0-9]+)?'
                value={character.custom}
                onChange={this.changeCustom} />
            </div>
          </div>
        </div>
      </div>
    ));
  }
}
