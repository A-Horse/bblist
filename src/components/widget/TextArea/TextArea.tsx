import React, { ChangeEvent, Component } from 'react';

import './TextArea.scss';

export class AppTextArea extends Component<{
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  type?: string;
}> {
  onChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  buildClassName() {
    return `app-textarea`;
  }

  render() {
    return (
      <textarea
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
