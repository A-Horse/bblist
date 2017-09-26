import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { weekDayName } from './constant';
import { daysInMonth /* firstDayInMonthOffset*/ } from './util';
import { getDay, getDaysInMonth } from 'date-fns';

import Week from './Week';

class Month extends Component {
  static propTypes = {
    year: PropTypes.any.isRequired,
    month: PropTypes.any.isRequired,
    selectedDate: PropTypes.any
  };

  constructor(props) {
    super(props);
  }

  onClick() {}

  onClose() {}

  onSelect() {}

  renderWeekText() {
    // const { firstDayOfweekOffset = 0 } = this.props;
    return (
      <tr className="week-text">
        {weekDayName.map(name => (
          <td className="week-day-name" key={name}>
            {name}
          </td>
        ))}
      </tr>
    );
  }

  renderWeeks() {
    const { year, month /* day*/ } = this.props;
    const { selectedDate } = this.props;
    const monthDays = getDaysInMonth(month - 1, year);
    const lastMonthDays = getDaysInMonth(month - 1 - 1, year);

    const firstDayOffset = getDay(new Date(year, month - 1, 1));

    const today = new Date();
    const cYear = today.getFullYear();
    const cMonth = today.getMonth() + 1;
    const cDay = today.getDate();

    let start = -firstDayOffset;
    let result = [];
    while (true) {
      let a = new Array();
      for (let i = 0; i < 7; i++) {
        if (start < 0) {
          const dayNumber = start + lastMonthDays + 1;
          a.push({
            number: dayNumber,
            isOutRange: true,
            active: true,
            selected:
              !!selectedDate &&
              year === selectedDate.year &&
              month === selectedDate.month &&
              dayNumber === selectedDate.day,
            isToday: year === cYear && month === cMonth - 1 && dayNumber === cDay
          });
        } else if (start > monthDays - 1) {
          const dayNumber = start - monthDays + 1;
          a.push({
            number: dayNumber,
            isOutRange: true,
            active: true,
            selected:
              !!selectedDate &&
              year === selectedDate.year &&
              month === selectedDate.month &&
              dayNumber === selectedDate.day,
            isToday: year === cYear && month === cMonth + 1 && dayNumber === cDay
          });
        } else {
          const dayNumber = start + 1;
          a.push({
            number: start + 1,
            isOutRange: false,
            active: true,
            selected:
              !!selectedDate &&
              year === selectedDate.year &&
              month === selectedDate.month &&
              dayNumber === selectedDate.day,
            isToday: year === cYear && month === cMonth && dayNumber === cDay
          });
        }
        ++start;
      }
      result.push(a);
      if (start >= monthDays - 1) {
        break;
      }
    }
    return result.map((days, i) => <Week key={i} days={days} {...this.props} />);
  }

  render() {
    return (
      <table className="month-table">
        <tbody>
          {this.renderWeekText()}
          {this.renderWeeks()}
        </tbody>
      </table>
    );
  }
}

export default Month;
