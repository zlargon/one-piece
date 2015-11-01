import React         from 'react';
import CharacterList from './CharacterList';
import Enemy         from './Enemy';

export default class OnePiece extends React.Component {

    constructor (props) {
        super(props);

        this.updateEnemy = this.updateEnemy.bind(this);

        this.state = {
            enemy: { type: '心', defense: 100 }, // 卡普
            boat: 1.5,
            list: []
        };
    }

    updateEnemy (enemy) {
        this.setState({ enemy });
    }

    render () {
        return (
            <div>
                <p>船加成：{this.state.boat}</p>
                <Enemy enemy={this.state.enemy}
                    onChange={this.updateEnemy}
                />
                <CharacterList />
            </div>
        );
    }
}
