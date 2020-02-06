import React, { Component } from 'react';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import zh from 'date-fns/locale/zh-CN';

import './Datepicker.scss';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('zh', zh);
setDefaultLocale('zh');

interface InputProps {
  onChange: Function;
  placeholder?: string;
  value: any;
}

export class AppDateTimePicker extends Component<InputProps> {
  render() {
    return (
      <DatePicker
        isClearable
        className="AppDateTimePicker"
        placeholderText={this.props.placeholder || '请选择时间'}
        dateFormat="yyyy年MM月dd日"
        locale="zh"
        selected={this.props.value}
        onChange={this.props.onChange}
      />
    );
  }
}
