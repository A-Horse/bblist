import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {weekFirstDay, weekDayName, monthNames} from './constant';
import {daysInMonth, firstDayInMonthOffset} from './util';
import Week from './Week';
import {Select} from 'components/widget/Select';
import {Button} from 'components/widget/Button';
import Month from './Month';

import 'style/component/date-picker/calendar.scss';

class Calendar extends Component {

  constructor() {
    super();
  }

  componentWillMount() {
    this.selectYearItems = this.buildYears();
    this.selectMonthItems = this.buildMonths();
  }

  onYearSelect(item) {
    this.props.selectYear(item.value);
  }

  onMonthSelect(item) {
    this.props.selectMonth(item.value);
  }

  buildYears() {
    const currentYear = new Date().getFullYear();
    let years = [];
    // TODO 可配置化
    for (let i = currentYear - 10; i < currentYear + 10; i++) {
      years.push(i);
    }
    return years.map(year => ({value: year, name: year}));
  }

  buildDefaultYear() {
    return {value: this.props.year, name: this.props.year};
  }

  buildDefaultMonth() {
    return {value: this.props.month, name: monthNames[this.props.month - 1]};
  }

  buildMonths() {
    return monthNames.map((monthName, i) => ({value: ++i, name: monthName}));
  }

  renderHeader() {
    return (
      <div className='calendar-header'>
        <Button key='next' onClick={this.props.nextMonth.bind(this)}>next</Button>
        <Select key='year-select' onSelect={this.onYearSelect.bind(this)} items={this.selectYearItems} defaultItem={this.buildDefaultYear()}></Select>
        <Select key='month-select' onSelect={this.onMonthSelect.bind(this)} items={this.selectMonthItems} defaultItem={this.buildDefaultMonth()}></Select>
        <Button key='last' onClick={this.props.lastMonth.bind(this)}>Last</Button>
      </div>
    );
  }
  
  render() {
    return (
      <div className='calendar'>
        {this.renderHeader()}
        <Month {...this.props}></Month>
      </div>
    );
  }
}

export default Calendar;
