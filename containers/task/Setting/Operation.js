import {connect} from 'react-redux';
import {deleteTaskBoard} from 'actions/task/task-wall';
import {browserHistory, hashHistory} from 'react-router';
import {createSelector} from 'reselect';

import Operation from 'page/task/Setting/Operation';

const mapDispatchToProps = (dispatch) => {
  return {
    deleteBoard(id) {
      return dispatch(deleteTaskBoard(id))
        .then(() => browserHistory.push('/task-wall'));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    normalizedBoard: state.task.board
  };
};

const OperationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Operation);

export default OperationContainer;
