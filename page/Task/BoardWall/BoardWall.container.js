import { connect } from 'react-redux';
import BoardWall from './BoardWall';
import R from 'ramda';
import { wrapDispathToAction } from 'utils/wrap-props';
import { createTaskBoard, getAllTaskBoard } from 'actions/task/task-wall';
import { createSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

const actions = {
  getAllTaskBoard,
  createTaskBoard
};

const mapStateToProps = (state, props) => {
  return {
    boards: createSelector([state => R.values(state.task.board.entities.board)], R.identity)(
      state,
      props
    ),
    isFetching: state.task.board.isTaskBoardsFetching
  };
};

const BoardsContainer = withRouter(
  connect(mapStateToProps, wrapDispathToAction(actions))(BoardWall)
);

export default BoardsContainer;
