import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PageContainer } from '../components/widget/PageContainer';

import Building from 'page/Building';

class DashBoard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <PageContainer>
        <Building />
      </PageContainer>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(DashBoard);
