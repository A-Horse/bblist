import React, {Component} from 'react';
import {PageContainer} from '../../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {receiveGoalList, createGoal} from '../../actions/goal/goal';
import {Button} from '../../components/widget/Button';

const styles = {
  
};


class GoalCreater extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }

  render() {
    return (
      <div>
        <div>
          <input type='text' ref='goalTitle'/>
        </div>
        <Button onClick={this.onClickCreateGoal.bind(this)}>Create Goal</Button>
      </div>
    )
  }

  onClickCreateGoal() {
    console.log('createGoal');
    const {dispatch} = this.props;
    const data = {
      title: this.refs.goalTitle.value.trim()
    };
    dispatch(createGoal(data)).then(() => {
      
    });
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

export default connect(mapStateToProps)(GoalCreater);
