import React              from 'react';
import ShortId            from 'shortid';
import { attackAnalysis } from 'one-piece';
import Boat               from './Boat';
import CharacterList      from './CharacterList';
import Enemy              from './Enemy';

export default class OnePiece extends React.Component {

    constructor (props) {
        super(props);

        this.updateBoat = this.updateBoat.bind(this);
        this.updateEnemy = this.updateEnemy.bind(this);
        this.updateCharacters = this.updateCharacters.bind(this);

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
            ]
        };

        // get the data from local storage
        const data = window.localStorage.getItem('data');
        if (data !== null) {
            this.state = JSON.parse(data);
        }

        // generate unique id for each character
        this.state.characters.forEach(character => { character.id = ShortId.generate() });
    }

    updateBoat(boat) {
        this.setState({ boat });
    }

    updateEnemy (enemy) {
        this.setState({ enemy });
    }

    updateCharacters (characters) {
        this.setState({ characters });
    }

    componentWillUpdate(nextProps, nextState) {
        const { enemy, boat, characters } = nextState;
        const team = characters.map(character => {
            return {
                no: character.no,
                attack: character.attack,
                bead: character.bead,
                timing: character.timing,
                captain: character.captainEffect
            };
        });

        // save the data to local storage
        window.localStorage.setItem('data', JSON.stringify(nextState));

        attackAnalysis({ enemy, boat, team });
    }

    render () {
        return (
            <div>
                <h2>梅莉號</h2>
                <Boat boat={this.state.boat}
                    onChange={this.updateBoat}
                />

                <h2>敵人</h2>
                <Enemy enemy={this.state.enemy}
                    onChange={this.updateEnemy}
                />

                <h2>隊員</h2>
                <CharacterList
                    characters={this.state.characters}
                    onChange={this.updateCharacters}
                />
            </div>
        );
    }
}
