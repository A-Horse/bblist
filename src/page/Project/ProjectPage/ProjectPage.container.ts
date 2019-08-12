import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { getProjectDetailRequest } from '../../../actions/project/project.action';
import { Board } from './ProjectPage';

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators({
      getProjectDetailRequest
    }, dispatch)
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
