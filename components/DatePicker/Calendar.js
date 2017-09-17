import React, { Component } from 'react';
import { KeyBoardArrowLeftIcon, KeyBoardArrowRightIcon } from 'services/svg-icons';
import { monthNames } from './constant';
import Month from './Month';

import './Calendar.scss';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  componentWillMount() {
    this.selectMonthItems = this.buildMonths();
  }

  onYearSelect(item) {
    this.props.selectYear(item.value);
  }

  onMonthSelect(item) {
    this.props.selectMonth(item.value);
  }

  buildMonths() {
    return monthNames.map((monthName, i) => ({ value: ++i, name: monthName }));
  }

  onHeaderClick() {}

  renderHeader() {
    return (
      <div className="calendar-header">
        <KeyBoardArrowLeftIcon onClick={this.props.lastMonth} />
        <span className="calendar-header--year-month" onClick={this.onHeaderClick}>{`${this.props
          .year} ${monthNames[this.props.month - 1]}`}</span>
        <KeyBoardArrowRightIcon onClick={this.props.nextMonth} />
      </div>
    );
  }

  render() {
    return (
      <div className="calendar">
        {this.renderHeader()}
        <Month {...this.props} />
      </div>
    );
  }
}
