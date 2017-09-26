import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.scss';

export class CheckBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    defaultChecked: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.checked = props.defaultChecked || false;
    this.onChange = this.onChange.bind(this);
    this.state = { checked: props.defaultChecked };

    this.domChecked = <i className="fa fa-check-square-o" aria-hidden="true" />;
    this.domUnchecked = <i className="fa fa-square-o" aria-hidden="true" />;

    this.className = 'checkbox';
  }

  componentWillMount() {}

  onChange() {
    const checked = this.instance.checked;
    this.checked = checked;
    this.setState({ checked: checked });
    this.props.onChange && this.props.onChange(checked);
  }

  render() {
    const className = (this.className += this.props.className ? ` ${this.props.className}` : '');
    return (
      <div className={className} onClick={this.props.onClick}>
        <label className="checkbox--mock">
          <input
            type="checkbox"
            defaultChecked={this.props.defaultChecked}
            ref={ref => (this.instance = ref)}
            onChange={this.onChange}
          />
          {this.state.checked ? this.domChecked : this.domUnchecked}
        </label>
      </div>
    );
  }
}

export default CheckBox;
