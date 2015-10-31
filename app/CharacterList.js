import React                from 'react';
import ShortId              from 'shortid';
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';
import Character            from './Character';

@DragDropContext(HTML5Backend)
export default class CharacterList extends React.Component {

    constructor (props) {
        super(props);
        this.reorderCharacters = this.reorderCharacters.bind(this);

        this.state = {
            characters: [
                { no: 8,   attack: 1250, bead: 1, timing: 'perfect' },                       // 索隆 Lv.87
                { no: 227, attack: 1285, bead: 1, timing: 'perfect', captainEffect: true },  // 鷹眼 Lv.99
                { no: 227, attack: 1285, bead: 1, timing: 'perfect', captainEffect: true },  // 鷹眼 Lv.99
                { no: 39,  attack: 702,  bead: 1, timing: 'perfect' },                       // 巴其 Lv.61
                { no: 66,  attack: 1491, bead: 1, timing: 'perfect' },                       // 惡龍 Lv.99
                { no: 255, attack: 1155, bead: 1, timing: 'perfect' },                       // 花劍 Lv.71
            ]
        };

        // generate unique id for each list item
        this.state.characters.forEach(character => { character.id = ShortId.generate() });
    }

    reorderCharacters(dragIndex, hoverIndex) {
        const { characters } = this.state;
        const dragCharacter = characters[dragIndex];

        // reoder character list
        characters.splice(dragIndex, 1);
        characters.splice(hoverIndex, 0, dragCharacter);

        this.setState(this.state);
    }

    render () {
        const characters = this.state.characters.map((character, index) => {
            return (
                <Character
                    key={character.id}
                    index={index}
                    character={character}
                    onMove={this.reorderCharacters}
                />
            );
        });

        return <div>{characters}</div>;
    }
}
