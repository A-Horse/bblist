import React, {Component} from 'react';

import 'style/component/widget/star-checkbox.scss';

export class StarCheckBox extends Component {
  componentDidMount() {
    this.instance = this.refs.instance;
  }

  onChange() {
    this.checked = this.refs.instance.checked;
    this.props.onChange && this.props.onChange(this.checked);
  }

  render() {
    return (
      <div className='star-checkbox' onClick={this.props.onClick}>
        <input id={this._reactInternalInstance._rootNodeID}
          type='checkbox'
          checked={this.props.checked}
          defaultChecked={this.props.defaultChecked}
          ref='instance'
          onChange={this.onChange.bind(this)}/>
        <label htmlFor={this._reactInternalInstance._rootNodeID} className='star-checkbox--mock'></label>
      </div>
    );
  }
}
