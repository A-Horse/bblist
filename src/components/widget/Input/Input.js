import React, { Component } from "react";
import PropTypes from "prop-types";

import "./Input.scss";

export class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    size: PropTypes.string,
    className: PropTypes.string
  };

  componentDidMount() {
    this.instance = this.refs.instance;
  }

  get value() {
    return this.instance.value;
  }

  onChange() {
    this.props.onChange && this.props.onChange(this.value);
  }

  buildClassName() {
    const { size = "middle" } = this.props;
    return `octopus-input ${size}  ${
      this.props.className ? " " + this.props.className : ""
    }`;
  }

  render() {
    return (
      <input
        {...this.props}
        className={this.buildClassName()}
        onChange={this.onChange.bind(this)}
        ref="instance"
      />
    );
  }
}

export default Input;
