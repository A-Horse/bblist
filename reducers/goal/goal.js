import {
  GOALLIST_GET_REQUEST, GOALLIST_GET_SUCCESS, GOALLIST_GET_FAILURE,
  GOAL_POST_REQUEST, GOAL_POST_SUCCESS, GOAL_POST_FAILURE,
  GOAL_DELETE_REQUEST, GOAL_DELETE_SUCCESS, GOAL_DELETE_FAILURE
} from '../../actions/goal/goal';

function goal(state = {
  isFetching: false
}, action) {
  switch (action.type) {
  case GOALLIST_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case GOALLIST_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      goals: action.goals
    });
    break;
  case GOALLIST_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;
    
  case GOAL_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case GOAL_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      goal: action.goal
    });
    break;
  case GOAL_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;

  default:
    return state;
  }
}

export default goal;
