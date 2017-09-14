import { normalize } from 'normalizr';
import { Map, List, fromJS } from 'immutable';
import R from 'ramda';
import Actions from 'actions/actions';
import { TaskBoards, TaskBoard, TaskCard } from 'schema';

export function task2(
  state = fromJS({
    board: null,
    boardMap: {},
    trackMap: {},
    cardMap: {}
  }),
  action
) {
  switch (action.type) {
    case Actions.GET_TASK_BOARD.REQUEST:
      return state.update('board', () => null);
      break;

    case Actions.GET_TASK_BOARD.SUCCESS:
      const normalizedBoard = normalize(action.playload, TaskBoard);
      return state
        .update('board', () => fromJS(normalizedBoard.entities.TaskBoard[normalizedBoard.result]))
        .update('trackMap', () =>
          fromJS(normalizedBoard.entities.TaskTrack).sort((a, b) => {
            return a.get('index') < b.get('index') ? -1 : 1;
          })
        )
        .update('cardMap', () => fromJS(normalizedBoard.entities.TaskCard));
      break;

    case Actions.GET_TASK_ALL_BOARD.SUCCESS:
      const normalizedAllBoard = normalize(action.playload, TaskBoards);
      return state.update('boardMap', () => fromJS(normalizedAllBoard.entities.TaskBoard));
      break;

    case Actions.UPDATE_TASK_CARD.SUCCESS:
      return state.updateIn(['cardMap', String(action.playload.id)], () => fromJS(action.playload));
      break;

    default:
      return state;
  }
}

export default task2;
