import './TextArea.scss';

import React, {
  ChangeEvent,
  Component,
  CSSProperties,
  KeyboardEventHandler,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export class AppTextArea extends Component<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  className?: string;
  border?: boolean;
  required?: boolean;
  name?: string;
  placeholder?: string;
  rows?: number;
  type?: string;
  onKeyDown?: KeyboardEventHandler;
  style?: CSSProperties;
}> {
  onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  onBlur = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onBlur && this.props.onBlur(event.target.value);
  };

  buildClassName() {
    return `AppTextArea ${this.props.className || ''}${
      this.props.border ? ' border' : ''
    }`;
  }

  render() {
    return (
      <TextareaAutosize
        rows={this.props.rows || 3}
        onKeyDown={this.props.onKeyDown}
        onBlur={this.onBlur}
        value={this.props.value}
        defaultValue={this.props.defaultValue}
        placeholder={this.props.placeholder}
        required={this.props.required}
        name={this.props.name}
        className={this.buildClassName()}
        onChange={this.onChange}
        style={this.props.style}
      />
    );
  }
}
