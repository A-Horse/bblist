import React, {Component} from 'react';

import 'style/component/date-picker/day.scss';

class Day extends Component {

  constructor() {
    super();
    
  }

  onClick() {
    
  }

  onSelected() {
    const date = new Date(this.props.year, this.props.month, this.props.dday.number);
    this.props.onSelected(date);
  }

  buildClassName() {
    const {dday} = this.props;
    let className = 'date-picker--day';
    if (dday.isOutRange) {
      className += ' out-range';
    }
    if (!dday.active) {
      className += ' inactive';
    }
    return className;
  }
  
  render() {
    const {dday} = this.props;
    return (
      <td onClick={this.onSelected.bind(this)} className={this.buildClassName()}>
        {dday.number}
      </td>
    );
  }
}

export default Day;
