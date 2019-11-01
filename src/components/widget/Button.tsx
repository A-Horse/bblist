import React, { Component, ButtonHTMLAttributes, DetailedHTMLProps, PureComponent } from 'react';

import './Button.scss';

export class AppButton extends PureComponent<{
  htmlType?: 'submit' | 'reset' | 'button';
  type?: 'primary' | 'dashed' | 'danger' | 'link';
  backgroundColor?: string;
  className?: string;
  onClick?: any;
}> {
  buildClassName() {
    return `AppButton ${this.props.type || ''} ${this.props.className || ''}`;
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
