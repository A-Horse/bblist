import './Button.scss';

import React, { PureComponent } from 'react';

export class AppButton extends PureComponent<{
  htmlType?: 'submit' | 'reset' | 'button';
  type?: 'primary' | 'dashed' | 'danger' | 'link';
  size?: 'sm' | 'md';
  backgroundColor?: string;
  disabled?: boolean;
  className?: string;
  onClick?: any;
}> {
  buildClassName() {
    return `AppButton ${this.props.type || ''} ${this.props.className || ''} ${
      this.props.disabled ? 'disabled' : ''
    } ${this.props.size || 'md'}`;
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        style={{
          backgroundColor: this.props.backgroundColor
        }}
        className={this.buildClassName()}
        type={this.props.htmlType}
      >
        {this.props.children}
      </button>
    );
  }
}
