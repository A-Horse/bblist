import { connect } from 'react-redux';
import { BoardWall } from './BoardWall';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

const mapStateToProps = state => {
  return {
    boardMap: state.task2.get('boardMap')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.GET_TASK_ALL_BOARD, Actions.ADD_TASK_BOARD]),
      dispatch
    )
  };
};

const BoardsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardWall));

export default BoardsContainer;
