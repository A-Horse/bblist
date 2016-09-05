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
    return (
      <div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(GoalCard);
