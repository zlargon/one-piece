import React from 'react';
import './Boat.less'

export default class Boat extends React.Component {
  static propTypes = {
    boat: React.PropTypes.number.isRequired,

    // callback
    onChange: React.PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.changeBoat = this.changeBoat.bind(this);
  }

  changeBoat() {
    const { boat } = this.props;

    function next(boat) {
      const boats = [ 1, 1.2, 1.5 ];
      const index = boats.indexOf(boat);
      const nextIndex = (index + 1) % boats.length;
      return boats[nextIndex];
    }

    this.props.onChange(next(boat));
  }

  render () {
    return (
      <div className='op-boat'
        onClick={this.changeBoat}>
        倍率：{this.props.boat} 倍
      </div>
    );
  }
}
