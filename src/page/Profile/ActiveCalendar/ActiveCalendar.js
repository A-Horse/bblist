import React, { Component } from 'react';
import R from 'ramda';
import moment from 'moment'; //TODO 干掉moment
import { differenceInDays, startOfWeek, subDays, format } from 'date-fns';

import './ActiveCalendar.scss';

function getRandom() {
  var num = Math.random();
  if (num < 0.1) return 0;
  else if (num < 0.6)
    //probability 0.1
    return 1;
  else if (num < 0.9)
    // probability 0.5
    return 2; //probability 0.3
  else return 3; //probability 0.1
}

export class ActiveCalendar extends Component {
  constructor(props) {
    super(props);
    this.renderWeek = this.renderWeek.bind(this);
  }
  generatorData() {
    const totalDays = 53 * 7 + differenceInDays(new Date(), startOfWeek(new Date()));
    let result = '';
    for (let i = 0; i < totalDays; i++) {
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
      const text = (
        <div key={i} className="ac-month-name">
          {result[i] ? result[i] : ''}
        </div>
      );
      domResult.push(text);
    }
    return <div>{domResult}</div>;
  }

  renderWeek(data, wi) {
    return (
      <div key={wi} className="ac-week">
        {data.map((n, di) => {
          const distance = 7 * (52 - wi) - ++di;
          const title = format(subDays(new Date(), distance), 'YYYY-MM-DD') + '  ' + n + ' events';
          return <div key={di} className={`ac-day ac-day-${n}`} title={title} />;
        })}
      </div>
    );
  }

  renderLongestStreak(data) {
    const n = R.compose(R.apply(R.max), R.map(R.length), R.split('0'))(data);
    return (
      <div key="longest">
        Longest Streak <span className="ac-spec-number">{n}</span> days.
      </div>
    );
  }

  renderCurrentStreak(data) {
    const n = R.compose(R.length, R.head, R.split('0'), R.reverse)(data);
    return (
      <div key="current">
        Current Streak <span className="ac-spec-number">{n}</span> days.
      </div>
    );
  }

  render() {
    const data = this.generatorData();
    const weekColumns = R.compose(R.splitEvery(7), R.split(''))(data);

    return (
      <div className="active-calendar">
        {this.renderMonText()}
        <div className="ac-year">{weekColumns.map(this.renderWeek)}</div>
        {this.renderLongestStreak(data)}
        {this.renderCurrentStreak(data)}
      </div>
    );
  }
}

export default ActiveCalendar;
