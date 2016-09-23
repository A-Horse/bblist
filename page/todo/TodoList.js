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

class TodoList extends Component {
  componentWillMount() {
    this.state = {
      
    };
    this.getGoals();
  }

  componentDidUpdate() {
    
  }

  render() {
    return (
      <PageContainer>
        
      </PageContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.todos
  };
};

export default connect(mapStateToProps)(TodoList);
