import React, {Component} from 'react';

import 'style/component/widget/radio-group.scss';

export class RadioGroup extends Component {
  static propTypes = {
    radioArray: React.PropTypes.array
  };

  renderRadios() {
    return this.props.radioArray.map(radio => {
      return (
        <div key={radio.value}>
          <input onChange={this.onChange.bind(this)} type='radio' name={this.props.name} value={radio.value}/>
          <span>{radio.text}</span>
        </div>
      );
    });
  }

  render() {
    return (
      <div className='radio-group' ref='main'>
        {this.renderRadios()}
      </div>
    );
  }

  onChange() {
    this.props.onChange && this.props.onChange(this.value);
  }

  get value() {
    return this.refs.main.querySelector('input:checked').value;
  }
}

export default RadioGroup;