import React, {Component} from 'react';
import R from 'ramda';

import 'style/component/active-calendar.scss';

function getRandom(){
  var num=Math.random();
  if (num < 0.1) return 0;  //probability 0.1
  else if(num < 0.6) return 1; // probability 0.5
  else if(num < 0.9) return 2; //probability 0.3
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

  renderWeek(data, wi) {
    return (
      <div key={wi} className="ac-week">
        {data.map((n, di) => {
           return <div key={di} className={`ac-day ac-day-${n}`}></div>
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
        <div className="ac-year">
          {weekColumns.map(::this.renderWeek)}
        </div>

      </div>
    );
  }
}

export default ActiveCalendar;
