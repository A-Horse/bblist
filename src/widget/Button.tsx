import './Button.scss';

import React, { PureComponent, CSSProperties } from 'react';

export type ButtonType = 'primary' | 'dashed' | 'danger' | 'link';

export class AppButton extends PureComponent<{
  htmlType?: 'submit' | 'reset' | 'button';
  type?: ButtonType;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  backgroundColor?: string;
  disabled?: boolean;
  noOpacity?: boolean;
  className?: string;
  onClick?: any;
}> {
  buildClassName() {
    return `AppButton ${this.props.type || ''} ${this.props.className || ''} ${
      this.props.disabled ? 'disabled' : ''
    } ${this.props.size || 'md'} ${this.props.noOpacity ? 'no-opacity' : ''}`;
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        style={{
          backgroundColor: this.props.backgroundColor,
          ...this.props.style,
        }}
        className={this.buildClassName()}
        type={this.props.htmlType}
      >
        {this.props.children}
      </button>
    );
  }
}
