import React, { Component } from 'react';
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
