import React, {Component} from 'react';
import {connect} from 'react-redux';


import 'style/page/todo/pomodora-dial.scss';

class PomodoraDial extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {

    };
  }

  onClick() {

  }

  render() {
    return (
      <div className='pomodora-dial'>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(PomodoraDial);
