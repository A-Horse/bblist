import React, {Component} from 'react';
import R from 'ramda';
import moment from 'moment';

import 'style/component/active-calendar.scss';

function getRandom(){
  var num = Math.random();
  if (num < 0.1) return 0;  //probability 0.1
  else if (num < 0.6) return 1; // probability 0.5
  else if (num < 0.9) return 2; //probability 0.3
  else return 3;  //probability 0.1
}

export class ActiveCalendar extends Component {
  generatorData() {
    let result = '';
    for (let i = 0; i < 364; i++) {
      result += getRandom();
    }
    return result;
  }

  renderMonText() {
    const mon = moment().set('date', 1);
    const result = {};
    for (let i = 0; i < 13; i++) {
      const beforeMonth = mon.clone().subtract(i, 'months');
      const monthName = beforeMonth.format('MMM');
      const distance = Math.floor((moment() - beforeMonth) / (1000 * 60 * 60 * 24));
      const colNum = Math.ceil(distance / 7);
      result[52 - colNum] = monthName;
    }
    let domResult = [];
    for (let i = 0; i < 52; i++) {
      const text = <div className="ac-month-name">{result[i] ? result[i] : ''}</div>;
      domResult.push(text);
    }
    return <div>{domResult}</div>
  }


  renderWeek(data, wi) {
    return (
      <div key={wi} className="ac-week">
        {data.map((n, di) => {
           const distance = 7 * (52 - wi) - ++di;
           const title = moment().subtract(distance, 'days').format('YYYY-MM-DD') + '  ' + n + ' events';
           return <div key={di} className={`ac-day ac-day-${n}`} title={title}></div>
         })}
      </div>
    );
  }

  render() {
    const data = this.generatorData();
    const weekColumns = R.compose(
      R.splitEvery(7),
      R.split('')
    )(data);

    return (
      <div className="active-calendar">
        {this.renderMonText()}
        <div className="ac-year">
          {weekColumns.map(::this.renderWeek)}
        </div>
      </div>
    );
  }
}

export default ActiveCalendar;
