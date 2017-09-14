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

    case Actions.ADD_TASK_CARD.SUCCESS:
      const normalizedAddedCard = normalize(action.playload, TaskCard);
      return state
        .update('cardMap', cardMap => {
          return cardMap.merge(fromJS(normalizedAddedCard.entities.TaskCard));
          // TODO rename taskListId
        })
        .updateIn(['trackMap', String(action.playload.taskListId)], trackMap =>
          trackMap.update(
            'cards',
            cards => cards.push(action.playload.id) // TODO 考虑卡片排序的问题，理应是 push 到最后一个的，但是以后可能会优先级的情况会弹到第一个，所以暂时考虑以后在后端返回index
          )
        );
      break;

    case Actions.UPDATE_TASK_CARD.SUCCESS:
      return state.updateIn(['cardMap', String(action.playload.id)], () => fromJS(action.playload));
      break;

    default:
      return state;
  }
}

export default task2;
