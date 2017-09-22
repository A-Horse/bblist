import { connect } from 'react-redux';
import { uploadFile } from 'actions/common/file';
import { deleteTaskBoard } from 'actions/task/task-wall';
import BoardSetting from 'page/task/BoardSetting';

const mapDispatchToProps = dispatch => {
  return {
    uploadCover(id, data) {
      return dispatch(uploadFile(`/task-board/${id}/cover`, data));
    },
    deleteBoard(id) {
      return dispatch(deleteTaskBoard(id)).then(() => browserHistory.push('/task-wall'));
    }
  };
};

const mapStateToProps = state => {
  return {
    normalizedBoard: state.task.board
  };
};

const BoardSettingContainer = connect(mapStateToProps, mapDispatchToProps)(BoardSetting);

export default BoardSettingContainer;
