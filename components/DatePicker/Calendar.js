import React, { Component } from 'react';
import { Modal } from 'components/widget/Modal/Modal';
import { KeyBoardArrowLeftIcon, KeyBoardArrowRightIcon } from 'services/svg-icons';
import { weekFirstDay, weekDayName, monthNames } from './constant';
import { daysInMonth, firstDayInMonthOffset } from './util';
import Week from './Week';
import { Select } from 'components/widget/Select';
import { Button } from 'components/widget/Button';
import Month from './Month';

import './Calendar.scss';

export default class Calendar extends Component {
  constructor() {
    super();
    this.onHeaderClick = this.onHeaderClick.bind(this);
  }

  componentWillMount() {
    // this.selectYearItems = this.buildYears();
    this.selectMonthItems = this.buildMonths();
  }

  onYearSelect(item) {
    this.props.selectYear(item.value);
  }

  onMonthSelect(item) {
    this.props.selectMonth(item.value);
  }

  // buildYears() {
  //   const currentYear = new Date().getFullYear();
  //   let years = [];
  //   // TODO 可配置化
  //   for (let i = currentYear - 10; i < currentYear + 10; i++) {
  //     years.push(i);
  //   }
  //   return years.map(year => ({value: year, name: year}));
  // }

  buildDefaultYear() {
    return { value: this.props.year, name: this.props.year };
  }

  buildDefaultMonth() {
    return { value: this.props.month, name: monthNames[this.props.month - 1] };
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
