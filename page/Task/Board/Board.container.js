import { connect } from 'react-redux';
import Board from './Board';
import { bindActionCreators } from 'redux';
import { getTaskAllCards } from 'actions/task/task-wall';
import { clearBoard } from 'actions/task/task';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.GET_TASK_BOARD, Actions.ADD_TASK_CARD]),
      dispatch
    ),

    clearBoard() {
      return dispatch(clearBoard());
    }
    /* getBoardData(id) {
     *   // TODO rename get wall all info
     *   return dispatch(getTaskAllCards(id));
     * },
     * clearBoard() {
     *   return dispatch(clearBoard());
     * }*/
  };
};

const mapStateToProps = state => {
  return {
    board: state.task2.get('board'),
    trackMap: state.task2.get('trackMap'),
    loginedUser: state.auth.get('loginedUser')
    // user: state.w
  };
};

export const BoardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));

export default BoardContainer;
