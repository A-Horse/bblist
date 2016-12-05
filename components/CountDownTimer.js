import React, {Component} from 'react';

class CountDownTimer extends Component {
  constructor() {
    super();
    this.state = {residualTimeString: null};
  }

  componentWillMount() {
    
  }
  
  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  start(endtime) {
    this.endtime = endtime;
    setInterval(() => {
      this.getTimeRemaining(endtime);
    }, 1000);
  }

  pause() {
    
  }

  resume() {

  }

  getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );

    const residual = {
      toal: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };

    return this.setState({residualTimeString: t});
  }

  render() {
    return (
      <div>
        {this.state.residualTimeString}
      </div>
    );
  }
}

export default CountDownTimer;

