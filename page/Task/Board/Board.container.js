import { connect } from 'react-redux';
import Board from './Board';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([
        Actions.GET_TASK_BOARD,
        Actions.ADD_TASK_CARD,
        Actions.UPDATE_TASK_CARD,
        Actions.ADD_TASK_TRACK
      ]),
      dispatch
    )
  };
};

const mapStateToProps = state => {
  return {
    board: state.task2.get('board'),
    trackMap: state.task2.get('trackMap'),
    cardMap: state.task2.get('cardMap'),
    loginedUser: state.auth.get('loginedUser')
  };
};

export const BoardContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Board));

export default BoardContainer;
