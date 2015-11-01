import React from 'react';

export default class Enemy extends React.Component {
    static propTypes = {
        enemy: React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            defense: React.PropTypes.number.isRequired
        }),

        // callback
        onChange: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.switchType = this.switchType.bind(this);
        this.changeDefense = this.changeDefense.bind(this);
    }

    switchType() {
        const { enemy } = this.props;

        function next(type) {
            const types = [ '力', '技', '速', '心', '知' ];
            const index = types.indexOf(type);
            const nextIndex = (index + 1) % types.length;
            return types[nextIndex];
        }

        this.props.onChange(
            Object.assign({}, enemy, { type: next(enemy.type) })
        );
    }

    changeDefense(event) {
        const { value } = event.target;   // string

        let defense = 0;
        if (value.length !== 0) {
            // parse into integer
            defense = Number.parseInt(value, 10);

            // don't change the input value
            if (Number.isNaN(defense)) return;

            // defense is positive
            if (defense < 0) defense = 0;
        }

        this.props.onChange(
            Object.assign({}, this.props.enemy, { defense }
        ));
    }

    render () {
        const { enemy } = this.props;

        const style = {
            border: '1px dashed gray',
            padding: '0.5rem 1rem',
            marginBottom: '.5rem',
            backgroundColor: 'white'
        };

        return (
            <div style={style}>
                <div onClick={this.switchType}>
                    敵人屬性：{enemy.type}
                </div>

                <div>
                    敵人防禦：
                    <input type='number'
                        value={enemy.defense}
                        onChange={this.changeDefense}
                    />
                </div>
            </div>
        );
    }
}
