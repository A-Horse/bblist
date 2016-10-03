import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';

import Calendar from './Calendar';
import 'style/component/date-picker/date-picker.scss';

class DatePicker extends Component {

  constructor() {
    super();
    // this.state = {toggle: false};
    this.state = {toggle: false, year: 2016, month: 10, day: 2};
  }

  onClick() {
    this.setState({toggle: !this.state.toggle});
  }

  close() {
    this.setState({toggle: false});
  }

  nextMonth() {
    this.state.month === 12 ? this.setState({month: 1, year: this.state.year + 1}) :
    this.setState({month: this.state.month + 1});
  }

  lastMonth() {
    this.state.month === 1 ? this.setState({month: 12, year: this.state.year - 1}) :
    this.setState({month: this.state.month - 1});
  }

  onSelected(date) {
    this.refs.input.value = date.toString();
    this.close();
  }

  buildClassName() {
    let className = 'date-picker';
    if (this.props.className) {
      className += ` this.props.className`;
    }
    return className;
  }
  
  render() {
    return (
      <div className={this.buildClassName()}>
        <DateIcon onClick={this.onClick.bind(this)}/>
        <input ref='input' onClick={this.onClick.bind(this)} />
        <Modal className='date-picker' toggle={this.state.toggle}>
          <CloseIcon onClick={this.close.bind(this)}/>
          
          <Calendar year={this.state.year} month={this.state.month} day={this.state.day}
                    lastMonth={this.lastMonth.bind(this)} nextMonth={this.nextMonth.bind(this)}
                    onSelected={this.onSelected.bind(this)}/>
        </Modal>
      </div>
    );
  }
}

export default DatePicker;
