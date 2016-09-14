import React, {Component} from 'react';
import {PageContainer} from '../../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from '../../services/gravatar';
import {getGoalList, createGoal} from '../../actions/goal/goal';
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
    const {dispatch} = this.props;

    return dispatch(getGoalList());
  }

  componentDidUpdate() {
    
  }

  renderGoals() {
    const {goals} = this.props;
    return goals.map(goal => (
      <GoalCard key={goal.id} goal={goal} />
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
    goals: state.goal.goals || [],
    user: state.auth.loginedUser
  };
};

export default connect(mapStateToProps)(Goal);
