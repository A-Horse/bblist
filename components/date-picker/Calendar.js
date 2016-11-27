import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {weekFirstDay, weekDayName} from './constant';
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

  onClick() {
    
  }

  onClose() {
    
  }

  onSelect() {
    
  }

  buildYears() {
    let years = [];
    for (let i = this.props.year - 10; i < this.props.year + 10; i++) {
      years.push(i);
    }
    return years.map(year => ({key: year, name: year}));
  }

  buildDefaultYear() {
    return {key: this.props.year, name: this.props.year};
  }

  renderHeader() {
    return (
      <div className='calendar-header'>
        <Button key='next' onClick={this.props.nextMonth.bind(this)}>next</Button>
        <Select year={this.props.year} items={this.buildYears()} defaultItem={this.buildDefaultYear()}></Select>
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
