import React                from 'react';
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';
import Character            from './Character';

@DragDropContext(HTML5Backend)
export default class CharacterList extends React.Component {
    static propTypes = {
        characters: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string.isRequired,
                no: React.PropTypes.number.isRequired,
                attack: React.PropTypes.number.isRequired,
                bead: React.PropTypes.number.isRequired,
                timing: React.PropTypes.string.isRequired,
                captainEffect: React.PropTypes.bool,
                specialAbility: React.PropTypes.bool
            })
        ),

        // callback
        onChange: React.PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);

        this.reorderCharacters = this.reorderCharacters.bind(this);
        this.updateCharacterData = this.updateCharacterData.bind(this);
    }

    reorderCharacters(dragIndex, hoverIndex) {
        const { characters } = this.props;
        const dragCharacter = characters[dragIndex];

        // reoder character list
        characters.splice(dragIndex, 1);
        characters.splice(hoverIndex, 0, dragCharacter);

        this.props.onChange(characters);
    }

    updateCharacterData(index, character) {
        const { characters } = this.props;
        const old = characters[index];

        characters[index] = character;

        // check the mount of captain
        // It might not have more than two captains
        const captains = characters.reduce(function (sum, character, index) {
            return character.captainEffect === true ? sum + 1 : sum;
        }, 0);

        if (captains > 2) {
            console.warn('Your team might not have more than 2 captains');
            console.warn('Please disable the other captain at first');
            characters[index] = old;   // set back to original character
            return;
        }

        this.props.onChange(characters);
    }

    render () {
        const characters = this.props.characters.map((character, index) => {
            return (
                <Character
                    key={character.id}
                    index={index}
                    character={character}
                    onMove={this.reorderCharacters}
                    onChange={this.updateCharacterData}
                />
            );
        });

        return <div>{characters}</div>;
    }
}
