import React, {Component} from 'react';
import {PageContainer} from '../../components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from '../../services/gravatar';

const styles = {
  
};


class GoalCard extends Component {
  componentWillMount() {
    this.state = {
      
    };
  }

  render() {
    const {goal} = this.props;
    return (
      <div>
        {goal.title}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(GoalCard);
