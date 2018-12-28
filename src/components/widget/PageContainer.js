import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../style/component/widget/page-container.scss';

export class PageContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  buildClassName() {
    let className = 'page-container';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    return className;
  }

  render() {
    return <div className={this.buildClassName()}>{this.props.children}</div>;
  }
}
