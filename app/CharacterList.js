import React                from 'react';
import { DragDropContext }  from 'react-dnd';
import HTML5Backend         from 'react-dnd-html5-backend';
import Character            from './Character';

function captainCounter(characters) {
    const counter = characters.reduce(function (counter, character, index) {
        return character.captainEffect === true ? counter + 1 : counter;
    }, 0);
    return counter;
}

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

        this.state = {
            isCaptainFull: captainCounter(props.characters)
        }
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
        const captains = captainCounter(characters);
        if (captains > 2) {
            console.warn('Your team might not have more than 2 captains');
            console.warn('Please disable the other captain at first');
            characters[index] = old;   // set back to original character
            return;
        }

        // setup this.state.isCaptainFull
        this.setState({ isCaptainFull: captains === 2 });

        this.props.onChange(characters);
    }

    render () {
        const characters = this.props.characters.map((character, index) => {
            return (
                <Character
                    key={character.id}
                    index={index}
                    isCaptainFull={this.state.isCaptainFull}
                    character={character}
                    onMove={this.reorderCharacters}
                    onChange={this.updateCharacterData}
                />
            );
        });

        return <div className='character-list'>{characters}</div>;
    }
}
