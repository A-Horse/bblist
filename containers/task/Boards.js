import {connect} from 'react-redux';
import {uploadFile} from 'actions/common/file';
import {deleteTaskBoard} from 'actions/task/task-wall';
import Boards from 'page/task/Boards';
import {browserHistory, hashHistory} from 'react-router';
import {createSelector} from 'reselect';
import {wrapDispathToAction} from 'utils/wrap-props';
import {getAllTaskBoard} from 'actions/task/task-wall';

const actions = {
  getAllTaskBoard
};


const mapStateToProps = (state) => {
  return {
    normalizedBoard: state.task.board
  };
};

const BoardsPage = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(Boards);

export default BoardsPage;
