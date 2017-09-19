import { connect } from 'react-redux';
import BoardWall from './BoardWall';
import R from 'ramda';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../../actions/actions';

const mapStateToProps = (state, props) => {
  return {
    boardMap: state.task2.get('boardMap')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection([Actions.GET_TASK_ALL_BOARD]), dispatch)
  };
};

const BoardsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardWall));

export default BoardsContainer;
