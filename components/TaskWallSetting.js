import React, {Component} from 'react';
import {deleteTaskWall} from '../actions/task-wall';
import {browserHistory} from 'react-router';

export class TaskWallSetting extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      
    };
  }

  deleteWall() {
    const {dispatch} = this.props;
    const params = {id: this.props.params.id};
    
    dispatch(deleteTaskWall(params))
      .then(() => {
        browserHistory.push('/task-wall')
      }).catch(error => {
        console.log('error', error);
      });
  }

  
  render() {
    return (
        <div>
        <button onClick={this.deleteTaskWall}>Delete this wall</button>
        </div>
    )
  }
}
