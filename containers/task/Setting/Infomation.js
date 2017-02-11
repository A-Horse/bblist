import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard, requestRenameTaskBoard} from 'actions/task/task-wall';
import Infomation from 'page/task/Setting/Infomation';
import {browserHistory, hashHistory} from 'react-router';
import {createSelector} from 'reselect';
import R from 'ramda';


const mapDispatchToProps = (dispatch, props) => {
  // TODO props
  return {
    uploadCover(id, data) {
      return dispatch(uploadFile(`/task-board/${id}/cover`, data));
    },
    modifyTaskBoardName(name) {
      return dispatch(requestRenameTaskBoard(props.params.id, name));
    }
  };
};

const mapStateToProps = (state, props) => {
  return {
    board: createSelector([(state, props) => state.task.board.entities[props.params.id]], R.identity)(state, props)
  };
};

const InfomationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Infomation);

export default InfomationContainer;
