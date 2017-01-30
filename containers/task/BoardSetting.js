import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import BoardSetting from 'page/task/BoardSetting';
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
    wall: state.task.board.wall,
    lists: state.task.list.lists
  };
};

const BoardSettingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardSetting);

export default BoardSettingPage;
