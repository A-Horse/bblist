import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {weekFirstDay, weekDayName} from './constant';
import {daysInMonth, firstDayInMonthOffset} from './util';
import Week from './Week';
import {Button} from 'components/widget/Button';
import Month from './Month';

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
  
  renderHeader() {
    return (
      <div>  
        <Button key='next' onClick={this.props.nextMonth.bind(this)}>next</Button>
        <span>{this.props.year}</span>
        <Button key='last' onClick={this.props.lastMonth.bind(this)}>Last</Button>
      </div>
    );
  }
  
  render() {
    return (
      <div>
        {this.renderHeader()}
        <Month {...this.props}/>
      </div>
    );
  }
}

export default Calendar;
