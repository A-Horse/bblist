import {
  TODOLIST_GET_REQUEST, TODOLIST_GET_SUCCESS, TODOLIST_GET_FAILURE,
} from 'actions/todo/todos';

function todos(state = {
  isFetching: fasle
}, action) {
  switch (action.type) {
  case TODOLIST_GET_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TODOLIST_GET_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      ...action.todos
    });
    break;
  case TODOLIST_GET_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.playload.message
    });
    break;

  default:
    return state;
  }
}

export default todos;
