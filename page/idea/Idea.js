import React, { Component, PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import {PageContainer} from '../../components/widget/PageContainer';
import Building from 'page/Building';

class Ideas extends Component {

  getWalls() {

  }

  componentWillMount() {

  }

  render() {
    return (
      <PageContainer>
        <Building />
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(Ideas);
