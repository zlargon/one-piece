import React         from 'react';
import CharacterList from './CharacterList';

export default class OnePiece extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            enemy: { type: '心', defense: 100 }, // 卡普
            boat: 1.5,
            list: []
        };
    }

    render () {
        return (
            <div>
                <p>船加成：{this.state.boat}</p>
                <p>敵人屬性：{this.state.enemy.type}</p>
                <p>敵人防禦：{this.state.enemy.defense}</p>
                <CharacterList />
            </div>
        );
    }
}
