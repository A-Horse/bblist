import './Button.scss';

import React, { ButtonHTMLAttributes, Component, DetailedHTMLProps, PureComponent } from 'react';

export class AppButton extends PureComponent<{
  htmlType?: 'submit' | 'reset' | 'button';
  type?: 'primary' | 'dashed' | 'danger' | 'link';
  backgroundColor?: string;
  disabled?: boolean;
  className?: string;
  onClick?: any;
}> {
  buildClassName() {
    return `AppButton ${this.props.type || ''} ${this.props.className || ''} ${this.props.disabled ? 'disabled' : ''}`;
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
