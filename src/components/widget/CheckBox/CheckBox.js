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
    this.state = { checked: props.defaultChecked };

    this.domChecked = <i className="fa fa-check-square-o" aria-hidden="true" />;
    this.domUnchecked = <i className="fa fa-square-o" aria-hidden="true" />;

    this.className = 'checkbox';

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {}

  onClick(event) {
    this.checked = !this.state.checked;
    this.setState({ checked: !this.state.checked });
    this.props.onClick && this.props.onClick(event);
    this.props.onChange && this.props.onChange(this.checked);
  }

  render() {
    const className = this.className + (this.props.className ? ` ${this.props.className}` : '');
    return (
      <div className={className} onClick={this.onClick}>
        {this.state.checked ? this.domChecked : this.domUnchecked}
      </div>
    );
  }
}

export default CheckBox;
