import React    from 'react';
import ShipInfo from '../data/ShipInfo';

export default class Ship extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    ship: React.PropTypes.shape({
      no: React.PropTypes.number.isRequired,
      level: React.PropTypes.number.isRequired
    }),
    onChange: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.changeShip = this.changeShip.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeShip(event) {
    const no = parseInt(event.target.value);
    const { ship } = this.props;
    this.props.onChange({ ...ship, no });
  }

  changeLevel(event) {
    const level = parseInt(event.target.value);
    const { ship } = this.props;
    this.props.onChange({ ...ship, level });
  }

  render() {
    const { no, level } = this.props.ship;
    const Ships = ShipInfo.slice(0, 4);

    const shipOptions = Ships.map((ship, index) => {
      return <option key={index} value={index}>{ship.name}</option>;
    });

    const levelOptions = Ships[no].level.map((ship, index) => {
      const level = index + 1;
      return <option key={level} value={level}>{'Lv' + level}</option>;
    });

    return (
      <div className={this.props.className}>
        <div className='name'>
          <span>船隻：</span>
          <select value={no} onChange={this.changeShip}>{shipOptions}</select>
        </div>
        <div className='level'>
          <span>等級：</span>
          <select value={level} onChange={this.changeLevel}>{levelOptions}</select>
        </div>
      </div>
    );
  }
}
