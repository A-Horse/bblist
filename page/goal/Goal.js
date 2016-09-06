import React, {Component} from 'react';
import {PageContainer} from '../../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from '../../services/gravatar';
import {receiveGoalList, createGoal} from '../../actions/goal/goal';
import GoalCreater from './GoalCreater';
import GoalCard from './GoalCard';

const styles = {
  
};

class Goal extends Component {
  componentWillMount() {
    this.state = {
      
    };
    this.getGoals();
  }

  getGoals() {
    const {dispatch, user} = this.props;
    return dispatch(receiveGoalList(user));
  }

  componentDidUpdate() {
    const {dispatch, user} = this.props;
    if (user) {

    }

  }

  renderGoals() {
    const {goalList} = this.props;
    return goalList.map(goal => (
      <GoalCard goal={goal} />
    ));
  }

  render() {
    return (
      <PageContainer>
        <p>Goal</p>
        {this.renderGoals()}
        <GoalCreater />
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    goalList: state.goal.goalList || [],
    user: state.login.state.loginUser
  };
};

export default connect(mapStateToProps)(Goal);
