import React, {Component} from 'react';
import {Modal} from 'components/widget/Modal';
import {DateIcon, CloseIcon} from 'services/svg-icons';
import {connect} from 'react-redux';
import Calendar from './Calendar';
import 'style/component/date-picker/date-picker.scss';
import {addBodyEventListenerOnce} from 'actions/event/body';
import Popup from 'components/Popup';
import moment from 'moment';

import 'style/component/date-picker/date-picker.scss';

class DatePicker extends Component {

  constructor() {
    super();
    this.state = {toggle: false};
    // TODO 状态不同步
    this.value = null;
  }

  componentDidMount() {
    this.init();
  }

  init() {
    const activeDay = this.props.defaultValue ? new Date(this.props.defaultValue) : new Date();
    this.setState({
      year: activeDay.getFullYear(),
      month: activeDay.getMonth() + 1,
      day: activeDay.getDate()
    });
    if (this.props.defaultValue) {
      this.value = this.props.defaultValue;
    }
  }

  getDate() {
    return this.value;
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

  selectYear(year) {
    this.setState({year: year});
  }

  selectMonth(month) {
    this.setState({month: month});
  }

  onSelected(date) {
    this.value = date;
    this.setState({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    });
    this.props.onSelected && this.props.onSelected(date);
    this.close();
  }

  buildClassName() {
    let className = 'date-picker';
    if (this.props.className) {
      className += ` ${this.props.className}`;
    }
    return className;
  }

  render() {
    const dateString = this.value ? moment(this.value).format('MMMM Do YYYY') : null;
    return (
      <div className={this.buildClassName()} ref='main'>
        <DateIcon className='date-picker--icon' onClick={this.onClick.bind(this)}/>
        <span className='date-picker--text' onClick={this.onClick.bind(this)}>{dateString}</span>

        <Popup className='date-picker-popup' parent={this.refs.main} toggle={this.state.toggle} onOverlayClick={this.close.bind(this)} close={this.close.bind(this)}>
          <Calendar year={this.state.year} month={this.state.month} day={this.state.day}
                    selectYear={this.selectYear.bind(this)}
                    selectMonth={this.selectMonth.bind(this)}
                    lastMonth={this.lastMonth.bind(this)} nextMonth={this.nextMonth.bind(this)}
                    onSelected={this.onSelected.bind(this)}/>
        </Popup>
      </div>
    );
  }
}

export default DatePicker;
