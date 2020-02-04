import './TextArea.scss';

import React, { ChangeEvent, Component, KeyboardEventHandler } from 'react';

export class AppTextArea extends Component<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
  onKeyDown?: KeyboardEventHandler;
}> {
  onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  onBlur = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onBlur && this.props.onBlur(event.target.value);
  };

  buildClassName() {
    return `AppTextArea ${this.props.className || ''}`;
  }

  render() {
    return (
      <textarea
        onKeyDown={this.props.onKeyDown}
        onBlur={this.onBlur}
        value={this.props.value}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        required={this.props.required}
        name={this.props.name}
        className={this.buildClassName()}
        onChange={this.onChange}
      />
    );
  }
}
