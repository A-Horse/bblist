import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard, requestRenameTaskBoard} from 'actions/task/task-wall';
import Infomation from 'page/task/Setting/Infomation';
import {browserHistory, hashHistory} from 'react-router';
import {createSelector} from 'reselect';


const mapDispatchToProps = (dispatch, props) => {
  // TODO props
  return {
    uploadCover(id, data) {
      return dispatch(uploadFile(`/task-board/${id}/cover`, data));
    },
    modifyTaskBoardName(name) {
      console.log('-');
      return dispatch(requestRenameTaskBoard(props.params.id, name));
    }
  };
};

const getCurrentBoard = createSelector(
  [(state, props) => state.task.board.entities[props.params.id]],
  (board) => {
    return board;
  });

const mapStateToProps = (state, props) => {
  return {
    board: getCurrentBoard(state, props)
  };
};

const InfomationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Infomation);

export default InfomationContainer;
