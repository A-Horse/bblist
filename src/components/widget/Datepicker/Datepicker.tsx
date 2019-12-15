import React, { Component } from 'react';
import DateTimePicker from 'react-datetime-picker';

interface InputProps {
  onChange: Function;
  value: any | null;
}

export class AppDateTimePicker extends Component<InputProps> {
  render() {
    return <DateTimePicker onChange={this.props.onChange} value={this.props.value} />;
  }
}
