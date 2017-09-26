import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOM from 'react-dom-factories';
import R from 'ramda';
import { timeout } from 'utils/timeout';

import './DropList.scss';

export class DropList extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any.isRequired,
    toggle: PropTypes.bool.isRequired
  };

  state = {
    openAfter: false,
    closeBefore: false
  };

  async componentWillReceiveProps(newProps) {
    if (newProps.toggle === true && newProps.toggle !== this.props.toggle) {
      this.setState({ openAfter: false });
      await timeout();
      this.setState({ openAfter: true });
      await timeout(200);
    }
    if (newProps.toggle === false && newProps.toggle !== this.props.toggle) {
      this.setState({ closeBefore: true });
      await timeout(200);
      this.setState({ closeBefore: false });
    }
  }

  buildClassName() {
    let className = 'drop-list';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    if (this.state.openAfter) {
      className += ' open-after';
    }
    if (this.state.closeBefore) {
      className += ' close-before';
    }
    return className;
  }

  render() {
    if (this.props.toggle || this.state.closeBefore) {
      return (
        <ul className={this.buildClassName()} {...R.omit(['toggle', 'className'], this.props)}>
          {this.props.children}
        </ul>
      );
    } else {
      return DOM.noscript();
    }
  }
}

export default DropList;
