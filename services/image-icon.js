import React, {Component} from 'react';
import 'style/component/image-icons.scss';

class Icon extends Component {
  buildClassName() {
    return `image-icon${this.props.className ? ' ' + this.props.className : ''}`;
  }
}

export class IconAdd extends Icon {
  render() {
    return <img src="/assets/icons/add.png" {...this.props} className={this.buildClassName()}/>;
  }
}

export class IconDelete extends Icon {
  render() {
    return <img src="/assets/icons/trash.png" {...this.props} className={this.buildClassName()}/>;
  }
}

export class IconChart extends Icon {
  render() {
    return <img src="/assets/icons/add.png" {...this.props} className={this.buildClassName()}/>;
  }
}

export class IconRemove extends Icon {
  render() {
    return <img src="/assets/icons/remove.png" {...this.props} className={this.buildClassName()}/>;
  }
}
