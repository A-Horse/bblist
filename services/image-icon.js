import React, {Component} from 'react';
import 'style/component/image-icons.scss';

class Icon extends Component {
  buildClassName() {
    return `image-icon${this.props.className ? ' ' + this.props.className : ''}`;
  }
}

export class IconAdd extends Icon {
  render() {
    return <img className={this.buildClassName()} src="/assets/icons/add.png"/>;
  }
}
