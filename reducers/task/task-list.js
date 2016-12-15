import {
  TASKLIST_PATCH_REQUEST, TASKLIST_PATCH_SUCCESS, TASKLIST_PATCH_FAILURE,
  TASKLIST_POST_REQUEST, TASKLIST_POST_SUCCESS, TASKLIST_POST_FAILURE,
  TASKTRACK_CHANGE_INDEX_SUCCESS
} from '../../actions/task/task-list';

import {
  TASKCARD_LEAVE_START, TASKCARD_LEAVE_DONE,
  TASKCARD_ENTER_START, TASKCARD_ENTER_DONE,
  TASKCARD_MOVE_REQUEST, TASKCARD_MOVE_SUCCESS, TASKCARD_MOVE_FAILURE,
  TASKCARD_PATCH_REQUEST, TASKCARD_PATCH_SUCCESS, TASKCARD_PATCH_FAILURE,
  INSERT_VIRTUAL_CARD
} from '../../actions/task/task-card';

import {
  TASKWALL_GET_REQUEST, TASKWALL_GET_SUCCESS, TASKWALL_GET_FAILURE,
  TASKWALL_DELETE_REQUEST, TASKWALL_DELETE_SUCCESS, TASKWALL_DELETE_FAILURE,
  ALL_TASKCARD_GET_REQUEST, ALL_TASKCARD_GET_SUCCESS, ALL_TASKCARD_GET_FAILURE
} from '../../actions/task/task-wall';

import {CLEAR_BOARD} from 'actions/task/task';

import R from 'fw-ramda';

function taskList(state = {
  virtualIndex: -1,
  isFetching: false,
  movingCard: null,
  lists: []
}, action) {
  switch (action.type) {
  case TASKLIST_POST_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
    break;
  case TASKLIST_POST_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false
    });
    break;
  case TASKLIST_POST_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;
    
  case TASKLIST_PATCH_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      taskCard: action.taskCard
    })
    break;
  case TASKLIST_PATCH_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      taskList: action.taskList
    });
    break;
  case TASKLIST_PATCH_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      message: action.message
    });
    break;

  case TASKCARD_LEAVE_START:
    {
      // const {fromListId} = action.info;
      // const {lists} = state;
      // const listIndex = R.findIndex(R.propEq('id', fromListId))(lists);
      // const cardIndex = lists[listIndex].cards.indexOf(action.card);
      // lists[listIndex].cards.splice(cardIndex, 1);
      // lists[listIndex].cards.splice(cardIndex, 1);
      // TODO delete it
      action.card.moving = true;
      return Object.assign({}, state, {
        movingCard: action.card,
        movingCardInfo: action.info,
        // lists: R.clone(lists, true)
      });
    }
    break;
  case TASKCARD_LEAVE_DONE:
  case TASKCARD_ENTER_START:
  case TASKCARD_ENTER_DONE:
    return Object.assign({}, state);
    
  case ALL_TASKCARD_GET_SUCCESS:
    return Object.assign({}, state, {
      entities: action.playload.entities.track
    });
    break;
  case CLEAR_BOARD:
    return Object.assign({}, state, {
      lists: []
    });
    break;

  case TASKCARD_PATCH_SUCCESS:
    const currentList = R.find(R.propEq('id', action.playload.taskListId))(state.lists);
    const index = R.findIndex(R.propEq('id', action.playload.id))(currentList.cards);
    currentList.cards.splice(index, 1, Object.assign({}, currentList.cards[index], action.playload));
    // currentList.cards = Array.of(...currentList.cards);
    currentList.cards[index] = Object.assign({}, currentList.cards[index]);
    
    return Object.assign({}, state, {
      lists: state.lists
    });
    break;

  case INSERT_VIRTUAL_CARD:
    {
    const {listId, virtualIndex} = action.playload;
    const {lists} = state;
    const {height, width} = state.movingCardInfo;
    const listIndex = R.findIndex(R.propEq('id', listId))(lists);
    if (~state.virtualIndex) {
      lists[listIndex].cards.splice(state.virtualIndex, 1);
    }
    lists[listIndex].cards.splice(virtualIndex, 0, {virtual: true, height, width});
    return Object.assign({}, state, {
      virtualIndex,
      lists: R.clone(lists, true)
    });
    }
    break;
    
  default:
    return state;
  }
}

export default taskList;
