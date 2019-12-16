import React, { Component } from 'react';
import { DatetimePicker } from 'rc-datetime-picker';
import { Moment } from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface InputProps {
  onChange: Function;
  value: any;
}

export class AppDateTimePicker extends Component<InputProps> {
  render() {
    return <DatePicker selected={this.props.value} onChange={this.props.onChange} />;
  }
}
