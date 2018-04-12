import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export class Button extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'middle', 'large']),
    type: PropTypes.any,
    styleType: PropTypes.oneOf(['default', 'primary', 'disable', 'dangerous']),
    disable: PropTypes.bool,
    borderType: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.any
  };

  buildClassName() {
    const { size = 'middle', styleType = 'default', borderType = 'default' } = this.props;
    return `button ${size} ${styleType} border-${borderType} ${this.props.className
      ? ' ' + this.props.className
      : ''}`;
  }

  render() {
    return (
      <button
        disabled={this.props.disable}
        className={this.buildClassName()}
        onClick={this.props.onClick}
        type={this.props.type}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;