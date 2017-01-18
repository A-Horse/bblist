import {
  TASKCARD_POST_REQUEST, TASKCARD_POST_SUCCESS, TASKCARD_POST_FAILURE,
  TASKCARD_PATCH_REQUEST, TASKCARD_PATCH_SUCCESS, TASKCARD_PATCH_FAILURE,
  ACTIVE_CARD_MODAL, UNACTIVE_CARD_MODAL,
  CARD_META_REQUEST, CARD_META_SUCCESS, CARD_META_FAILURE,
  INSERT_VIRTUAL_CARD,
} from 'actions/task/task-card';

import {ALL_TASKCARD_GET_SUCCESS} from 'actions/task/task-wall';

function taskCard(state = {
  isFetching: false,
  card: null,
  active: false,
  entities: []
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

  case ACTIVE_CARD_MODAL:
    return Object.assign({}, state, {
      active: true,
      card: action.card
    });
    break;

  case ALL_TASKCARD_GET_SUCCESS:
    return Object.assign({}, state, {
      entities: action.playload.entities.cards
    });
    break;
    
  case UNACTIVE_CARD_MODAL:
    return Object.assign({}, state, {
      active: false,
      card: null
    });
    break;
  
  default:
    return state;
  }
}

export default taskCard;
