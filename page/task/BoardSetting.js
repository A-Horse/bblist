import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import {deleteTaskBoard} from 'actions/task/task-wall';
import {Modal} from 'components/widget/Modal';

import 'style/page/task/board-setting.scss';

export class BoardSetting extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {

    };
  }

  componentDidMount() {

  }

  deleteTaskBoard() {
    const {dispatch} = this.props;
    return dispatch(deleteTaskBoard(this.props.params.id))
      .then(() => {
        browserHistory.push('/task-wall');
      });
  }

  close() {

  }
  
  render() {
    return (
      <div>
        <button onClick={this.deleteTaskBoard.bind(this)}>Delete this wall</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    lists: state.task.list.lists
  };
};

export default connect(mapStateToProps)(BoardSetting);
