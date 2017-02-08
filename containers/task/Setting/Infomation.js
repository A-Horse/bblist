import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import Infomation from 'page/task/Setting/Infomation';
import {browserHistory, hashHistory} from 'react-router';
import {createSelector} from 'reselect';


const mapDispatchToProps = (dispatch) => {
  return {
    uploadCover(id, data) {
      return dispatch(uploadFile(`/task-board/${id}/cover`, data));
    }
  };
};

function getCurrentBoard(normalizedBoard, params) {
  return normalizedBoard.entities[params.id];
}

const mapStateToProps = (state, props) => {
  return {
    normalizedBoard: state.task.board,
    board: getCurrentBoard(state.task.board, props.params)
  };
};

const InfomationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Infomation);

export default InfomationContainer;
