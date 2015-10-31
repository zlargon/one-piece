import React                        from 'react';
import { DragSource, DropTarget }   from 'react-dnd';
import CharacterDnD                 from './CharacterDnD';


@DropTarget('CharacterItem', CharacterDnD.target, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('CharacterItem', CharacterDnD.source, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class Character extends React.Component {
    static propTypes = {
        // drag and drop pros
        connectDragSource: React.PropTypes.func.isRequired,
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
            captainEffect: React.PropTypes.bool,
            specialAbility: React.PropTypes.bool
        }),

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
        this.toggleCaptainEffect = this.toggleCaptainEffect.bind(this);
        this.toggleSpecialAbility = this.toggleSpecialAbility.bind(this);
    }

    // return new no to parent
    changeNo(event) {
        const { value } = event.target;   // string

        let no = 0;
        if (value.length !== 0) {
            // parse into integer
            no = Number.parseInt(value, 10);

            // don't change the input value
            if (Number.isNaN(no)) return;

            // no.0 ~ 316
            if (no < 0)   no = 0;
            if (no > 316) no = 316;
        }

        this.props.onChange(
            this.props.index,
            Object.assign({}, this.props.character, { no }
        ));
    }

    changeAttack (event) {
        const { value } = event.target;   // string

        let attack = 0;
        if (value.length !== 0) {
            // parse into integer
            attack = Number.parseInt(value, 10);

            // don't change the input value
            if (Number.isNaN(attack)) return;

            // attack must be positive integer
            if (attack < 0) attack = 0;
        }

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

    toggleCaptainEffect() {
        const { captainEffect } = this.props.character;

        this.props.onChange(
            this.props.index,
            Object.assign({}, this.props.character, { captainEffect: !captainEffect }
        ));
    }

    toggleSpecialAbility() {
        const { specialAbility } = this.props.character;

        this.props.onChange(
            this.props.index,
            Object.assign({}, this.props.character, { specialAbility: !specialAbility }
        ));
    }

    render() {
        const { character, isDragging, connectDragSource, connectDropTarget } = this.props;

        const style = {
            border: '1px dashed gray',
            padding: '0.5rem 1rem',
            marginBottom: '.5rem',
            backgroundColor: 'white',
            opacity: isDragging ? 0 : 1
        };

        function beadText (bead) {
            if (bead === 0.5) return '暗珠';
            if (bead === 1)   return '正常';
            if (bead === 2)   return '亮珠';
        }

        return connectDragSource(connectDropTarget(
            <div style={style}>
                <div>
                    No. <input type='number' value={character.no} onChange={this.changeNo} />
                </div>

                <div>
                    攻擊力 <input type='number' value={character.attack} onChange={this.changeAttack} />
                </div>

                <div onClick={this.switchBead}>
                    珠子：{beadText(character.bead)}
                </div>

                <div onClick={this.switchTiming}>
                    Timing：
                    <span style={{ textTransform: 'capitalize' }}>
                        {character.timing}
                    </span>
                </div>

                <div onClick={this.toggleCaptainEffect}>
                    船長效果：{character.captainEffect ? 'enable' : 'disable'}
                </div>

                <div onClick={this.toggleSpecialAbility}>
                    必殺技：{character.specialAbility ? 'enable' : 'disable'}
                </div>
            </div>
        ));
    }
}
