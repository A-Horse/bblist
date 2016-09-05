import React, {Component} from 'react';
import {PageContainer} from '../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from '../services/gravatar';
import {receiveGoalList, createGoal} from '../actions/goal/goal';

const styles = {
  
};


class Goal extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }

  getGoals() {
    const {dispatch} = this.props;
    return dispatch()
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
