import React, { Component, ReactInstance, ChangeEvent } from 'react';

import './Input.scss';

export class Input extends Component<{
  onChange: (value: string) => void;
  size: string;
  className: string;
}> {

  componentDidMount(): void {}

  onChange(event: ChangeEvent<HTMLInputElement>): void {
    this.props.onChange && this.props.onChange(event.target.value);
  }

  buildClassName() {
    const { size = 'middle' } = this.props;
    return `octopus-input ${size}  ${this.props.className ? ' ' + this.props.className : ''}`;
  }

  render() {
    return (
      <input
        className={this.buildClassName()}
        onChange={this.onChange}
      />
    );
  }
}

export default Input;
