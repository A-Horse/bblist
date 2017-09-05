import React, { Component } from 'react';
import { Modal } from 'components/widget/Modal/Modal';
import Calendar from './Calendar';
import moment from 'moment';
import { IconRemove } from 'services/image-icon';

import './DatePicker.scss';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false, value: null };
    this.clear = this.clear.bind(this);
    this.close = this.close.bind(this);
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
      this.setState({ value: this.props.defaultValue });
    }
  }

  getDate() {
    return this.state.value;
  }

  onClick() {
    this.setState({ toggle: !this.state.toggle });
  }

  clear() {
    // TODO CHECK will bugs? (not set year m d?)
    this.setState({ value: null });
    this.props.onSelected && this.props.onSelected(null);
    this.state.toggle && this.close();
  }

  close() {
    console.log('close');

    this.setState({ toggle: false });
  }

  nextMonth() {
    this.state.month === 12
      ? this.setState({ month: 1, year: this.state.year + 1 })
      : this.setState({ month: this.state.month + 1 });
  }

  lastMonth() {
    this.state.month === 1
      ? this.setState({ month: 12, year: this.state.year - 1 })
      : this.setState({ month: this.state.month - 1 });
  }

  selectYear(year) {
    this.setState({ year: year });
  }

  selectMonth(month) {
    this.setState({ month: month });
  }

  onSelected(date) {
    this.setState({ value: date });
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
    const dateString = this.state.value
      ? moment(this.state.value).format('MMMM Do YYYY')
      : this.props.placeholder ? this.props.placeholder : '';
    return (
      <div className={this.buildClassName()} ref="main">
        {!this.props.hideIcon &&
          <i
            className="fa fa-calendar-check-o date-picker--icon"
            aria-hidden="true"
            onClick={this.onClick.bind(this)}
          />}

        <span
          className={`date-picker--text${!this.state.value && this.props.placeholder
            ? ' placeholder'
            : ''}`}
          onClick={this.onClick.bind(this)}
        >
          {dateString}
        </span>

        {this.state.value && <IconRemove onClick={this.clear} />}

        <Modal className="date-picker-modal" toggle={this.state.toggle} close={this.close}>
          <Calendar
            year={this.state.year}
            month={this.state.month}
            day={this.state.day}
            selectYear={this.selectYear.bind(this)}
            selectMonth={this.selectMonth.bind(this)}
            lastMonth={this.lastMonth.bind(this)}
            nextMonth={this.nextMonth.bind(this)}
            onSelected={this.onSelected.bind(this)}
          />
        </Modal>
      </div>
    );
  }
}

export default DatePicker;
