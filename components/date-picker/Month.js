import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {weekFirstDay, weekDayName} from './constant';
import {daysInMonth, firstDayInMonthOffset} from './util';
import Week from './Week';
import {Button} from 'components/widget/Button';

class Month extends Component {

  constructor() {
    super();
    
  }

  onClick() {
    
  }

  onClose() {
    
  }

  onSelect() {
    
  }

  renderWeekText() {
    const {firstDayOfweekOffset = 0} = this.props;
    return (<tr>{weekDayName.map(name => (<td key={name}>{name}</td>))}</tr>);
  }

  renderWeeks() {
    const {year, month, day} = this.props;
    const monthDays = daysInMonth(month, year);
    const lastMonthDays = daysInMonth(month - 1, year);
    const firstDayOffset = firstDayInMonthOffset(month, year); // TODO 需要加上配置的偏移

    const today = new Date();
    const cYear = today.getFullYear(), cMonth = today.getMonth() + 1, cDay = today.getDate();
    console.log(cYear, cMonth, cDay);
    console.log(year, month, day);
    let start = - firstDayOffset;
    let result = [];
    while(true) {
      let a = new Array();
      for(let i = 0; i < 7; i++) {
        if (start < 0) {
          const dayNumber = start + lastMonthDays + 1;
          a.push({
            number: dayNumber,
            isOutRange: true,
            active: true,
            isToday: year === cYear && month === cMonth - 1 && dayNumber === cDay
          });
          console.log(year === cYear && month === cMonth - 1 && dayNumber === cDay);
        } else if (start > monthDays - 1) {
          const dayNumber = start - monthDays + 1;
          a.push({
            number: start - monthDays + 1,
            isOutRange: true,
            active: true,
            isToday: year === cYear && month === cMonth + 1 && dayNumber === cDay
          });
          console.log(year === cYear && month === cMonth && dayNumber === cDay);
        } else {
          const dayNumber = start - monthDays + 1;
          a.push({
            number: start + 1,
            isOutRange: false,
            active: true,
            isToday: year === cYear && month === cMonth && dayNumber === cDay
          });
          console.log(dayNumber);
          console.log(year === cYear && month === cMonth && dayNumber === cDay);
        }
        ++start;
      }
      result.push(a);
      console.log(a);
      if (start >= monthDays - 1) {
        break;
      }
    }
    return result.map((days, i) => <Week key={i} days={days} {...this.props}/>);
  }

  renderHeader() {
    return (
      <div>
        <Button key='next'>next</Button>
        <Button key='last'>Last</Button>
      </div>
    );
  }
  
  render() {
    return (
      <table>
        <tbody>
          {this.renderWeekText()}
          {this.renderWeeks()}
        </tbody>
      </table>
    );
  }
}

export default Month;
