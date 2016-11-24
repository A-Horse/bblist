import {
  TASKCARD_POST_REQUEST, TASKCARD_POST_SUCCESS, TASKCARD_POST_FAILURE,
  TASKCARD_PATCH_REQUEST, TASKCARD_PATCH_SUCCESS, TASKCARD_PATCH_FAILURE,
  SET_CURRENT_CARD, UNSET_CURRENT_CARD,
  CARD_META_REQUEST, CARD_META_SUCCESS, CARD_META_FAILURE,
  INSERT_VIRTUAL_CARD,
} from 'actions/task/task-card';

function taskCard(state = {
  isFetching: false,
  card: {},
  active: false
}, action) {
  switch (action.type) {
  case TASKCARD_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      taskCard: action.card
    });
    break;
  case TASKCARD_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      taskCard: action.card
    });
    break;
  case TASKCARD_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;

  case CARD_META_SUCCESS:
    return Object.assign({}, state, {
      card: action.playload
    });
    break;

  case TASKCARD_PATCH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TASKCARD_PATCH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false
    });
    break;
  case TASKCARD_PATCH_FAILURE:
    return Object.assign({}, state, {
      isFetching: false
    });
    break;

  case SET_CURRENT_CARD:
    return Object.assign({}, state, {
      active: true,
      card: action.card
    });
    break;
  case UNSET_CURRENT_CARD:
    return Object.assign({}, state, {
      active: false,
      card: {}
    });
    break;
  
  default:
    return state;
  }
}

export default taskCard;
