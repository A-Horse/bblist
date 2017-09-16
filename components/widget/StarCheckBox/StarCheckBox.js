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
      <div className="star-checkbox" onClick={this.props.onClick}>
        <label className="star-checkbox--mock">
          <input
            type="checkbox"
            defaultChecked={this.props.defaultChecked}
            ref="instance"
            onChange={this.onChange}
          />
          {this.state.checked ? (
            <i className="fa fa-star" aria-hidden="true" />
          ) : (
            <i className="fa fa-star-o" aria-hidden="true" />
          )}
        </label>
      </div>
    );
  }
}
