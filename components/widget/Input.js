import React, {Component} from 'react';
import './input.scss';

export class Input extends Component {
  componentDidMount() {
    this.instance = this.refs.instance;
  }
  
  render() {
    return (
      <input {...this.props} ref='instance' />
    );
  }
}
