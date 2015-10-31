import React from 'react';

export default class Character extends React.Component {
    static propTypes = {
        character: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired,
            no: React.PropTypes.number.isRequired,
            attack: React.PropTypes.number.isRequired,
            bead: React.PropTypes.number.isRequired,
            timing: React.PropTypes.string.isRequired,
            captainEffect: React.PropTypes.bool,
            specialAbility: React.PropTypes.bool
        })
    };

    render() {
        const { character } = this.props;

        const style = {
            border: '1px dashed gray',
            padding: '0.5rem 1rem',
            marginBottom: '.5rem',
            backgroundColor: 'white'
        };

        function beadText (bead) {
            if (bead === 0.5) return '暗珠';
            if (bead === 1)   return '正常';
            if (bead === 2)   return '亮珠';
        }

        return (
            <div style={style}>
                <div>No.{character.no}</div>
                <div>攻擊力 {character.attack}</div>
                <div>珠子：{beadText(character.bead)}</div>
                <div>Timing：{character.timing}</div>
                <div>船長效果：{character.captainEffect ? 'enable' : 'disable'}</div>
                <div>必殺技：{character.specialAbility ? 'enable' : 'disable'}</div>
            </div>
        );
    }
}
