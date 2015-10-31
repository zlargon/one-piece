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
        onMove: React.PropTypes.func.isRequired
    };

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
                <div>No.{character.no}</div>
                <div>攻擊力 {character.attack}</div>
                <div>珠子：{beadText(character.bead)}</div>
                <div>Timing：{character.timing}</div>
                <div>船長效果：{character.captainEffect ? 'enable' : 'disable'}</div>
                <div>必殺技：{character.specialAbility ? 'enable' : 'disable'}</div>
            </div>
        ));
    }
}
