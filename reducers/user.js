import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_USERINFO_REQUEST,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILURE
} from 'actions/user';

function user(
  state = {
    isFetching: false
  },
  action
) {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case UPDATE_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false
      });
      break;
    case UPDATE_PASSWORD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      });
      break;

    default:
      return state;
  }
}

export default user;
