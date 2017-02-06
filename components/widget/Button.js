import React, {Component} from 'react';

import 'style/component/widget/button.scss';

export class Button extends Component {
  static propTypes = {
    size: React.PropTypes.oneOf(['small', 'middle', 'large']),
    styleType: React.PropTypes.oneOf(['default', 'primary', 'disable'])
  };

  buildClassName() {
    const {size = 'middle', styleType = 'default', borderType = 'default'} = this.props;
    return `button ${size} ${styleType} border-${borderType} ${this.props.className ? ' ' + this.props.className : ''}`;
  }

  click() {
    this.refs.main.click();
  }
  
  render() {
    return (
      <button ref='main' className={this.buildClassName()} onClick={this.props.onClick} type={this.props.type}>
          {this.props.children}
      </button>
    );
  }
}

export default Button;
