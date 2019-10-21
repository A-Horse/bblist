import './Input.scss';

import React, { ChangeEvent, Component, ReactInstance } from 'react';

export class Input extends Component<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: string;
  className?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
}> {

  componentDidMount(): void {
    
  }

  onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  buildClassName() {
    const { size = 'middle' } = this.props;
    return `app-input ${size}  ${this.props.className ? ' ' + this.props.className : ''}`;
  }

  render() {
    return (
      <input
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
