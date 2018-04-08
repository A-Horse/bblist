import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Day.scss';

class Day extends Component {
  static propTypes = {
    dday: PropTypes.any.isRequired,
    year: PropTypes.any,
    month: PropTypes.any,
    onSelected: PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  onClick() {}

  onSelected() {
    const date = new Date(this.props.year, this.props.month - 1, this.props.dday.number);
    this.props.onSelected(date);
  }

  buildClassName() {
    const { dday } = this.props;
    let className = 'date-picker--day';
    if (dday.isOutRange) {
      className += ' out-range';
    }
    if (!dday.active) {
      className += ' inactive';
    }
    if (dday.isToday) {
      className += ' today';
    }
    if (dday.selected) {
      className += ' selected';
    }
    return className;
  }

  render() {
    const { dday } = this.props;
    return (
      <td onClick={this.onSelected.bind(this)} className={this.buildClassName()}>
        {dday.number}
      </td>
    );
  }
}

export default Day;
