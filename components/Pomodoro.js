import React, {Component} from 'react';
import {Button} from 'components/widget/Button';
import CountDownTimer from 'components/CountDownTimer';

export class Pomodoro extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    
  }
  
  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  startCountDown() {

  }

  render() {
    return (
      <div>
        <Button onClick={this.startCountDown.bind(this)}>Start Pomodoro</Button>
        <CountDownTimer/>
      </div>
    );
  }
}

