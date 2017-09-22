import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StarCheckbox.scss';

// TODO 下次改的时候直接抽离
export class StarCheckBox extends Component {
  static propTypes = {
    defaultChecked: PropTypes.bool,
    defaultChecked: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.checked = props.defaultChecked;
    this.state = { checked: props.defaultChecked };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {}

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
