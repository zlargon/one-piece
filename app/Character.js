import React                      from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import config                     from '../config';
import CharacterInfo              from '../lib/CharacterClass';
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
    this.switchTiming = this.switchTiming.bind(this);
    this.checkCaptainEffect = this.checkCaptainEffect.bind(this);
    this.checkSpecialAbility = this.checkSpecialAbility.bind(this);
    this.changeCustom = this.changeCustom.bind(this);
  }

  // return new no to parent
  changeNo(event) {
    const { value } = event.target;   // string

    let no = 0;
    if (value.length !== 0) {
      // parse into integer
      no = Number.parseInt(value, 10);

      // limit character no
      if (no > config.maxCharacterNumber.tw) {
        no = config.maxCharacterNumber.tw;
      }
    }

    this.props.onChange(
      this.props.index,
      Object.assign({}, this.props.character, {
        no,
        attack: CharacterInfo.get(no).max.atk
      }
    ));
  }

  changeAttack (event) {
    const { value } = event.target;   // string
    const attack = value.length === 0 ? 0 : Number.parseInt(value, 10);  // parse into integer

    this.props.onChange(
      this.props.index,
      Object.assign({}, this.props.character, { attack }
    ));
  }

  switchBead() {
    const { character } = this.props;

    function next(bead) {
      const beads = [ 0.5, 1, 2];
      const index = beads.indexOf(bead);
      const nextIndex = (index + 1) % beads.length;
      return beads[nextIndex];
    }

    this.props.onChange(
      this.props.index,
      Object.assign({}, character, { bead: next(character.bead) }
    ));
  }

  switchTiming() {
    const { character } = this.props;

    function next(timing) {
      const timings = [ 'bad', 'good', 'great', 'perfect', 'miss' ];
      const index = timings.indexOf(timing);
      const nextIndex = (index + 1) % timings.length;
      return timings[nextIndex];
    }

    this.props.onChange(
      this.props.index,
      Object.assign({}, character, { timing: next(character.timing) }
    ));
  }

  checkCaptainEffect(event) {
    const { checked } = event.target;
    this.props.onChange(
      this.props.index,
      Object.assign({}, this.props.character, { captainEffect: checked }
    ));
  }

  checkSpecialAbility(event) {
    const { checked } = event.target;
    this.props.onChange(
      this.props.index,
      Object.assign({}, this.props.character, { specialAbility: checked }
    ));
  }

  changeCustom(event) {
    let custom = event.target.value;  // string
    const isValid = event.target.validity.valid;

    if (custom.length === 0) {
      custom = '0';
    } else {
      // remove leading zero
      const [ integral, decimal ] = custom.split('.');
      custom = Number.parseInt(integral, 10) + (custom.indexOf('.') >= 0 ? '.' : '') + (decimal ? decimal : '');
    }

    this.props.onChange(
      this.props.index,
      Object.assign({}, this.props.character, isValid ? { custom } : {}
    ));
  }

  render() {
    const { isDragging, connectDragSource, connectDragPreview, connectDropTarget } = this.props;
    const { character, isCaptainFull, isMobileDevice, showCustom } = this.props;
    const invisible = {
      visibility: 'hidden'
    };

    const dragging = {
      opacity: isDragging && !isMobileDevice ? 0 : 1,
      backgroundColor: isDragging && isMobileDevice ? 'lightsteelblue' : 'white'
    };

    function beadText (bead) {
      if (bead === 0.5) return '暗珠';
      if (bead === 1)   return '正常';
      if (bead === 2)   return '亮珠';
    }

    function imageUrl(no) {
      const url = 'http://onepiece-treasurecruise.com/wp-content';
      const character = CharacterInfo.get(no);
      if (character.star === 0) {
        return url + '/themes/onepiece-treasurecruise/images/noimage.png';
      }

      // workaround for 574, 575
      if (no === 574 || no === 575) {
        return url + `/uploads/f00${no}.png`;
      }

      const number = (no + 10000).toString().substring(1);
      return url + `/uploads/f${number}.png`;
    }

    function hasSpecialAbility(no) {
      const character = CharacterInfo.get(no);
      if (character.specialAbility.magnification === null) {
        return false;
      }
      return true;
    }

    return connectDragPreview(connectDropTarget(
      <div className='one-piece-character' style={dragging}>

        <div>
          <div className='baseline'
            style={isCaptainFull && !character.captainEffect ? invisible : {}}>
            <span>船</span>
            <input type='checkbox'
                checked={character.captainEffect}
                onChange={this.checkCaptainEffect} />
          </div>
          <div className='baseline' style={hasSpecialAbility(character.no) ? {} : invisible}>
            <span>必</span>
            <input type='checkbox'
                checked={character.specialAbility}
                onChange={this.checkSpecialAbility} />
          </div>
        </div>

        {connectDragSource(<div className='icon'>
          <img src={imageUrl(character.no)} />
        </div>)}

        <div className='basis'>
          <div className='baseline'>
            <span className='space-right'>No.</span>
            <input type='number' min='0' value={character.no} onChange={this.changeNo} />
          </div>

          <div className='baseline'>
            <span className='space-right'>攻</span>
            <input type='number' min='0' value={character.attack} onChange={this.changeAttack} />
          </div>
        </div>

        <div className='basis'>
          <div className='point-cursor' onClick={this.switchBead}>
            {beadText(character.bead)}
          </div>
          <div className='bead point-cursor' onClick={this.switchTiming}>
            {character.timing}
          </div>
        </div>

        <div style={{ display: showCustom ? '' : 'none' }}>
          <div className='custom'>
            <input type='number' step='0.01' min='0' pattern='[0-9]+([\.|,][0-9]+)?'
              value={character.custom}
              onChange={this.changeCustom} />
          </div>
          <div style={invisible}>
            empty
          </div>
        </div>
      </div>
    ));
  }
}
