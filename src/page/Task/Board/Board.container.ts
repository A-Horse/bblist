import { connect } from 'react-redux';
import { Board } from './Board';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../actions/actions';

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state: any) => {
  return {
    board: state.task2.get('currentBoard'),
    boardParticipants: state.task2.get('boardParticipants'),
    boardFetching: state.task2.get('boardFetching'),
    boardName: state.task2.get('board') ? state.task2.getIn(['board', 'name']) : '',
    trackMap: state.task2.get('trackMap'),
    cardMap: state.task2.get('cardMap'),
    loginedUser: state.auth.get('loginedUser'),
    inviteParticipant: state.user.get('inviteParticipant')
  };
};

export const BoardContainer = withRouter(
  (<any>connect)(mapStateToProps, mapDispatchToProps)(Board)
);

export default BoardContainer;
