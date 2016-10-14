import React, {Component} from 'react';

import 'style/component/widget/checkbox.scss';

export class CheckBox extends Component {
  componentDidMount() {
    this.instance = this.refs.instance;
  }

  onChange() {
    this.checked = this.refs.instance.checked;
    this.props.onChange && this.props.onChange(this.checked);
  }
  
  render() {
    return (
        <div className='checkbox' onClick={this.props.onClick}>
          <input id={this._reactInternalInstance._rootNodeID} type='checkbox' defaultChecked={this.props.defaultChecked} ref='instance' onChange={this.onChange.bind(this)}/>
          <label htmlFor={this._reactInternalInstance._rootNodeID} className='checkbox--mock'></label>
        </div>
    );
  }
}
