import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class CateLine extends Component {
  propTypes: {
    children: PropTypes.isRequired
  };
  render() {
    return (
      <div>
        <span>
          {this.props.children}
        </span>
        <span />
      </div>
    );
  }
}
