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
      <input className='checkbox' type='checkbox' {...this.props} ref='instance' onChange={this.onChange.bind(this)}/>
    );
  }
}
