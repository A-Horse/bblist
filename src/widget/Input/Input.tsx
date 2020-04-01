import './Input.scss';

import React, { ChangeEvent, Component, DetailedHTMLProps } from 'react';

export class Input extends Component<any> {
  componentDidMount(): void {}

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChangeEvent && this.props.onChangeEvent(event);
    this.props.onChange && this.props.onChange(event.target.value);
  };

  onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onBlur && this.props.onBlur(event.target.value);
  };

  buildClassName() {
    const { size = 'middle' } = this.props;
    return `app-input ${size}${
      this.props.className ? ' ' + this.props.className : ''
    }${this.props.borderLess ? ' border-less' : ''}`;
  }

  render() {
    return (
      <input
        {...this.props}
        className={this.buildClassName()}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    );
  }
}
