import React, { Component } from 'react';
import './Checkbox.scss';

export class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.checked = props.defaultChecked || false;
    this.state = { checked: props.defaultChecked };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {}

  onChange(event) {
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
            defaultChecked={this.props.defaultChecked}
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
