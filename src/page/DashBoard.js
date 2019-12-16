import React, { Component } from 'react';
import { connect } from 'react-redux';

import Building from 'page/Building';

class DashBoard extends Component {
  render() {
    return <Building />;
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DashBoard);
