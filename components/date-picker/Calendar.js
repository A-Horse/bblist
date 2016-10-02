import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {weekFirstDay, weekDayName} from './constant';
import {daysInMonth, firstDayInMonthOffset} from './util';
import Week from './Week';

class Calendar extends Component {

  constructor() {
    super();
    
  }

  onClick() {
    
  }

  onClose() {
    
  }

  renderWeekText() {
    const {firstDayOfweekOffset = 0} = this.props;
    return (<tr>{weekDayName.map(name => (<td>{name}</td>))}</tr>);
  }

  renderWeeks() {
    const {year, month, day} = this.props;
    const monthDays = daysInMonth(month, year);
    const lastMonthDays = daysInMonth(month - 1, year);
    const firstDayOffset = firstDayInMonthOffset(month, year);

    let start = - firstDayOffset;
    let result = [];
    while(true) {
      let a = new Array();
      for(let i = 0; i < 7; i++) {
        if (start < 0) {
          a.push({
            number: start + lastMonthDays + 1,
            isOutRange: true
          });
        } else if (start > monthDays - 1) {
          a.push({
            number: start - monthDays + 1,
            isOutRange: true
          });
        } else {
          a.push({
            number: start + 1,
            isOutRange: false
          });
        }
        ++start;
      }
      result.push(a);
      if (start >= monthDays - 1) {
        break;
      }
    }
    return result.map((days, i) => <Week key={i} days={days}/>);
  }

  renderHeader() {

    return (
      <div>
        
      </div>
    );
  }
  
  render() {
    return (
      <div>
        <table>
          <tbody>
            {this.renderWeekText()}
            {this.renderWeeks()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;
