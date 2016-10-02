import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';

import Calendar from './Calendar';

class DatePicker extends Component {

  constructor() {
    super();
    this.state = {toggle: false};
  }

  onClick() {
    this.setState({toggle: !this.state.toggle});
  }

  onClose() {
    this.setState({toggle: false});
  }
  
  render() {
    return (
      <div>
        <DateIcon onClick={this.onClick.bind(this)}/>
        <Modal toggle={this.state.toggle}>
          <CloseIcon onClick={this.onClose.bind(this)}/>

          <Calendar year={'2016'} month={'10'} day={'2'} />
        </Modal>
      </div>
    );
  }
}

export default DatePicker;
