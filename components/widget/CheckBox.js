import React, {Component} from 'react';

import 'style/component/widget/checkbox.scss';

export class CheckBox extends Component {
  componentDidMount() {
    this.instance = this.refs.instance;
  }

  onChange() {
    this.checked = this.refs.instance.checked;
  }
  
  render() {
    return (
        <div className='checkbox' onClick={this.props.onClick}>
          <input id={this._reactInternalInstance._rootNodeID} type='checkbox' {...this.props} ref='instance' onChange={this.onChange.bind(this)}/>
          <label htmlFor={this._reactInternalInstance._rootNodeID} className='checkbox--mock'></label>
        </div>
    );
  }
}
