import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageContainer} from '../components/widget/PageContainer';

class DashBoard extends Component {
  constructor() {
    super()
  }
  
  render() {
    return (
      <PageContainer>

        <div>
          <h2>Task</h2>
        </div>

        <div>
          <h2>Idea</h2>
        </div>

        <div>
          <h2>Chat</h2>
        </div>
        
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
};

export default connect(mapStateToProps)(DashBoard);
