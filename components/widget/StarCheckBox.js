import React, {Component} from 'react';

import 'style/component/widget/star-checkbox.scss';

export class StarCheckBox extends Component {
  state = { checked: this.props.defaultChecked }

  componentDidMount() {
    this.instance = this.refs.instance;
  }

  onChange() {
    this.setState({checked: this.refs.instance.checked})
    this.props.onChange && this.props.onChange(this.refs.instance.checked);
  }

  render() {
    return (
      <div className={`star-checkbox${this.state.checked ? ' checked' : ''}`} onClick={this.props.onClick}>
        <input id={this._reactInternalInstance._rootNodeID}
          type='checkbox'
          defaultChecked={this.props.defaultChecked}
          ref='instance'
          onChange={this.onChange.bind(this)}/>
        <label htmlFor={this._reactInternalInstance._rootNodeID} className='star-checkbox--mock'></label>
      </div>
    );
  }
}
