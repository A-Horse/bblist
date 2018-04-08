import React, { Component } from 'react';
import { connect } from 'react-redux';

class ToastBox extends Component {
  renderToasts() {}

  render() {
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    error: state.error.list
  };
};

export default connect(mapStateToProps)(ToastBox);
