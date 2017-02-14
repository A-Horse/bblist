import React, {Component, PropTypes} from 'react';

import 'style/component/widget/drop-list.scss';

export class DropList extends Component {
  componentDidMount() {
    
  }

  componentDidUpdate() {
    
  }

  openSelect() {
    
  }

  buildClassName() {
    let className = 'drop-list';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return className;
  }
  
  render() {
    if (this.props.toggle) {
      return <ul className={this.buildClassName()}>
        {this.props.children}
      </ul>;
    } else {
      return React.DOM.noscript();
    }
  }
}
