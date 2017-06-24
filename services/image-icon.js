import React, {Component} from 'react';
import 'style/component/image-icons.scss';

class Icon extends Component {
  buildClassName(name) {
    return `image-icon${this.props.className ? ' ' + this.props.className : ''}${name ? ' ' + name : ''}`;
  }
}

export class IconAdd extends Icon {
  render() {
    return <img src="/assets/icons/add.png" {...this.props} className={this.buildClassName()}/>;
  }
}

export class IconDelete extends Icon {
  render() {
    return <img src="/assets/icons/remove-red.png" {...this.props} className={this.buildClassName('icon-delete')}/>;
  }
}

export class IconChart extends Icon {
  render() {
    return <img src="/assets/icons/chart.png" {...this.props} className={this.buildClassName()}/>;
  }
}

export class IconRemove extends Icon {
  render() {
    return <img src="/assets/icons/remove.png" {...this.props} className={this.buildClassName('icon-remove')}/>;
  }
}
