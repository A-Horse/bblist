import React, { Component } from 'react';

import './StarCheckbox.scss';

export class StarCheckBox extends Component {
  constructor(props) {
    super(props);
    this.checked = props.defaultChecked;
    this.state = { checked: props.defaultChecked };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {}

  // componentDidMount() {
  //   this.instance = this.refs.instance;
  // }

  onChange() {
    const checked = this.refs.instance.checked;
    this.checked = checked;
    this.setState({ checked: checked });
    this.props.onChange && this.props.onChange(checked);
  }

  render() {
    return (
      <div className="checkbox" onClick={this.props.onClick}>
        <label className="checkbox--mock">
          <input
            type="checkbox"
            checked={this.state.checked}
            ref="instance"
            onChange={this.onChange}
          />
          {this.state.checked
            ? <i className="fa fa-check-square-o" aria-hidden="true" />
            : <i className="fa fa-square-o" aria-hidden="true" />}
        </label>
      </div>
    );
  }
}
