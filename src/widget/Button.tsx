import './Button.scss';

import React, { CSSProperties, PureComponent } from 'react';

export type ButtonType = 'primary' | 'dashed' | 'danger' | 'link' | 'ghost';

export class AppButton extends PureComponent<{
  htmlType?: 'submit' | 'reset' | 'button';
  type?: ButtonType;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
  title?: string;
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
        title={this.props.title}
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
