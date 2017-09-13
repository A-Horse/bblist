import { normalize } from 'normalizr';
import { Map, List, fromJS } from 'immutable';
import R from 'ramda';
import Actions from 'actions/actions';
import { TaskBoards, TaskBoard } from 'schema';

export function task2(
  state = fromJS({
    board: null,
    trackMap: {}
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
        );
      break;

    default:
      return state;
  }
}

export default task2;
