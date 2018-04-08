import React, { Component } from 'react';
import { Button } from 'components/widget/Button/Button';
import CountDownTimer from 'components/CountDownTimer';

export class Pomodoro extends Component {
  constructor() {
    super();
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  buildEndTime() {
    const now = new Date();
  }

  startCountDown() {
    this.refs.countDownTimer.start();
  }

  render() {
    return (
      <div>
        <Button onClick={this.startCountDown.bind(this)}>Start Pomodoro</Button>
        <CountDownTimer ref="countDownTimer" />
      </div>
    );
  }
}
