import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import Board from 'page/task/Board';
import {browserHistory, hashHistory} from 'react-router';

const mapDispatchToProps = (dispatch) => {
  return {
    uploadCover(id, data) {
      return dispatch(uploadFile(`/task-board/${id}/cover`, data));
    },
    deleteBoard(id) {
      return dispatch(deleteTaskBoard(id))
        .then(() => browserHistory.push('/task-wall'));
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
)(BoardSetting);

export default Board;
