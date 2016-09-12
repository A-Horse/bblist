import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageContainer} from '../components/widget/PageContainer';

class IndexPage extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <PageContainer>
        Welcome
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(IndexPage);
