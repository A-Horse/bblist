import React, {Component} from 'react';
import {PageContainer} from '../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from '../services/gravatar';

const styles = {
  
};


class Goal extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }

  render() {
    return (
      <PageContainer>
        <p>Goal</p>
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(Goal);
