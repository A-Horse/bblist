import './Input.scss';

import React, { ChangeEvent, Component, ReactInstance } from 'react';

export class Input extends Component<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
  onBlur?: (value: any) => void;
  size?: 'middle' | 'large' | 'small';
  whiteHover?: boolean;
  className?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
}> {
  componentDidMount(): void {}

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  onBlur = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onBlur && this.props.onBlur(event.target.value)
  }

  buildClassName() {
    const { size = 'middle' } = this.props;
    return `app-input ${size}  ${this.props.className ? ' ' + this.props.className : ''} ${
      this.props.whiteHover ? 'white-hover' : ''
    }`;
  }

  render() {
    return (
      <input
        onBlur={this.onBlur}
        value={this.props.value}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        required={this.props.required}
        name={this.props.name}
        type={this.props.type || 'text'}
        className={this.buildClassName()}
        onChange={this.onChange}
      />
    );
  }
}

export default Input;
