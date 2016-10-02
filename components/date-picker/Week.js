import React, {Component} from 'react';
import Day from './Day';

class Week extends Component {

  constructor() {
    super();
    
  }

  onClick() {
    
  }

  onClose() {

  }

  renderDays() {
    const {days} = this.props;
    return days.map((day, i) => <Day day={day} key={i} />);
  }
  
  render() {
    return (
      <tr>
        {this.renderDays()}
      </tr>
    );
  }
}

export default Week;
