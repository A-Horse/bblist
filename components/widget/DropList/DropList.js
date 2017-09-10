import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';

import './DropList.scss';

export class DropList extends Component {
  componentDidMount() {}

  componentDidUpdate() {}

  openSelect() {}

  buildClassName() {
    let className = 'drop-list';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return className;
  }

  render() {
    if (this.props.toggle) {
      return (
        <ul className={this.buildClassName()}>
          {this.props.children}
        </ul>
      );
    } else {
      return DOM.noscript();
    }
  }
}

export default DropList;
