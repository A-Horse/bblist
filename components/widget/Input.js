import React, {Component} from 'react';
import 'style/component/widget/input.scss';

export class Input extends Component {
  componentDidMount() {
    this.instance = this.refs.instance;
  }

  get value() {
    return this.instance.value;
  }

  onChange() {
    this.props.onChange && this.props.onChange(this.value);
  }
  
  render() {
    return (
      <input {...this.props} onChange={this.onChange.bind(this)} ref='instance'/>
    );
  }
}

export default Input;
