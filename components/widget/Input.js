import React, {Component} from 'react';
import 'style/component/widget/input.scss';

export class Input extends Component {
  componentDidMount() {
    this.instance = this.refs.instance;
  }
  
  render() {
    return (
      <input type='text' {...this.props} ref='instance' autoComplete='off'/>
    );
  }
}
