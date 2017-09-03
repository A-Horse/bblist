import React, { Component } from 'react';
import 'style/component/widget/checkbox.scss';

export class CheckBox extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.checked = this.props.defaultChecked;
    this.state = { checked: this.props.defaultChecked };
  }

  componentDidMount() {
    // this.instance = this.refs.instance;
  }

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
