import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import Board from 'page/task/Board';
import {browserHistory, hashHistory} from 'react-router';
import {deleteTaskWall, getTaskAllCards} from 'actions/task/task-wall';
import {createTaskList, deleteTaskList, updateTaskTrackIndex} from 'actions/task/task-list';
import {clearBoard} from 'actions/task/task';

const mapDispatchToProps = (dispatch) => {
  return {
    getBoardData(id) {
      // TODO rename get wall all info
      return dispatch(getTaskAllCards(id));
    },
    clearBoard() {
      return dispatch(clearBoard());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    normalizedBoard: state.task.board
  };
};

const BoardPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default BoardPage;
