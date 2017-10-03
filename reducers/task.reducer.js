import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import R from 'ramda';
import Actions from 'actions/actions';
import { TaskBoards, TaskBoard, TaskCard, TaskTrack } from 'schema';

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
      if (action.meta && action.meta.isRefresh) {
        return state;
      }
      return state.update('board', () => null).update('boardFetching', R.T);
      break;

    case Actions.ADD_TASK_BOARD.SUCCESS:
      const normalizedAddBoard = normalize(action.playload, TaskBoard);
      return state.update('boardMap', boardMap =>
        boardMap.merge(fromJS(normalizedAddBoard.entities.TaskBoard))
      );
      break;

    case Actions.GET_TASK_BOARD.SUCCESS:
      const normalizedBoard = normalize(action.playload, TaskBoard);
      return state
        .update('boardFetching', R.F)
        .update('board', () => fromJS(normalizedBoard.entities.TaskBoard[normalizedBoard.result]))
        .update('trackMap', () =>
          fromJS(normalizedBoard.entities.TaskTrack || {}).sort((a, b) => {
            return a.get('index') < b.get('index') ? -1 : 1;
          })
        )
        .update('cardMap', () => fromJS(normalizedBoard.entities.TaskCard));
      break;

    case Actions.GET_TASK_BOARD.FAILURE:
      return state.update('board', () => null).update('boardFetching', R.F);
      break;

    case Actions.GET_TASK_ALL_BOARD.SUCCESS:
      const normalizedAllBoard = normalize(action.playload, TaskBoards);
      return state.update('boardMap', () => fromJS(normalizedAllBoard.entities.TaskBoard));
      break;

    case Actions.UPDATE_TASK_BOARD.SUCCESS:
      return state.update('board', board => {
        return board.merge(fromJS(R.omit(['id'], action.playload)));
      });
      break;

    case Actions.UPLOAD_TASK_BOARD_COVER.SUCCESS:
      return state.update('board', board => board.merge(fromJS(R.omit(['id'], action.playload))));
      break;

    case Actions.DESTORY_TASK_BOARD.SUCCESS:
      return state.delete('board').deleteIn(['boardMap', String(action.meta.id)]);
      break;

    case Actions.ADD_TASK_CARD.SUCCESS:
      const normalizedAddedCard = normalize(action.playload, TaskCard);

      return state
        .update('cardMap', cardMap => {
          return cardMap
            ? cardMap.merge(fromJS(normalizedAddedCard.entities.TaskCard))
            : fromJS(normalizedAddedCard.entities.TaskCard);
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

    case Actions.GET_CARD_DETAIL.SUCCESS:
      const normalizedCardDetail = normalize(action.playload, TaskCard);
      return state.update('cardMap', cardMap => {
        return cardMap.merge(fromJS(normalizedCardDetail.entities.TaskCard));
      });
      break;

    case Actions.ADD_TASK_TRACK.SUCCESS:
      const normalizedAddedTrack = normalize(action.playload, TaskTrack);
      return state.update('trackMap', trackMap =>
        trackMap.merge(fromJS(normalizedAddedTrack.entities.TaskTrack))
      );
      break;

    case Actions.DESTORY_TASK_TRACK.SUCCESS:
      return state.deleteIn(['trackMap', String(action.meta.trackId)]);
      break;

    case Actions.UPDATE_TASK_TRACK.SUCCESS:
      return state.updateIn(['trackMap', String(action.playload.id)], track =>
        track.merge(fromJS(action.playload))
      );
      break;

    case Actions.GET_TASK_BOARD_PARTICIPANT.REQUEST:
      return state.delete('boardParticipant');
      break;

    case Actions.GET_TASK_BOARD_PARTICIPANT.SUCCESS:
      return state.set('boardParticipants', fromJS(action.playload));
      break;

    default:
      return state;
  }
}

export default task2;
