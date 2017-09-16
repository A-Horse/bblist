import React, { Component } from 'react';
import Day from './Day';

class Week extends Component {
  constructor(props) {
    super(props);
  }

  onClick() {}

  onClose() {}

  renderDays() {
    const { days } = this.props;
    return days.map((day, i) => <Day dday={day} key={i} {...this.props} />);
  }

  render() {
    return <tr>{this.renderDays()}</tr>;
  }
}

export default Week;
