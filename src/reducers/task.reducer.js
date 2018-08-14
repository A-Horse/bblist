// @flow
import { normalize } from 'normalizr';
import { fromJS } from 'immutable';
import R from 'ramda';
import Actions from '../actions/actions';
import { TaskBoards, TaskBoard, TaskCard, TaskTrack } from '../schema';

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

    case Actions.ADD_TASK_BOARD.SUCCESS:
      const normalizedAddBoard = normalize(action.payload, TaskBoard);
      return state.update('boardMap', boardMap =>
        boardMap.merge(fromJS(normalizedAddBoard.entities.TaskBoard))
      );

    case Actions.CARD_MOVE_HANDLE.REQUEST:
      return state.update('cardMap', cardMap => cardMap.merge(action.payload));

    case Actions.GET_TASK_TRACK_CARD.SUCCESS:
      const normalizedTrack = normalize(action.payload, TaskTrack);
      return state
        .updateIn(['trackMap'], trackMap => {
          return trackMap.merge(fromJS(normalizedTrack.entities.TaskTrack));
        })
        .updateIn(['cardMap'], cardMap => {
          return cardMap.merge(fromJS(normalizedTrack.entities.TaskCard));
        });

    case Actions.GET_TASK_BOARD.SUCCESS:
      const normalizedBoard = normalize(action.payload, TaskBoard);
      return state
        .update('boardFetching', R.F)
        .update('board', () => fromJS(normalizedBoard.entities.TaskBoard[normalizedBoard.result]))
        .update('trackMap', () =>
          fromJS(normalizedBoard.entities.TaskTrack || {}).sort((a, b) => {
            return a.get('index') < b.get('index') ? -1 : 1;
          })
        )
        .update('cardMap', () => fromJS(normalizedBoard.entities.TaskCard || {}));

    case Actions.GET_TASK_BOARD.FAILURE:
      return state.update('board', () => null).update('boardFetching', R.F);

    case Actions.GET_TASK_ALL_BOARD.SUCCESS:
      const normalizedAllBoard = normalize(action.payload, TaskBoards);
      return state.update('boardMap', () => fromJS(normalizedAllBoard.entities.TaskBoard));

    case Actions.UPDATE_TASK_BOARD.SUCCESS:
      return state.update('board', board => {
        return board.merge(fromJS(R.omit(['id'], action.payload)));
      });

    case Actions.UPLOAD_TASK_BOARD_COVER.SUCCESS:
      return state.update('board', board => board.merge(fromJS(R.omit(['id'], action.payload))));

    case Actions.DESTORY_TASK_BOARD.SUCCESS:
      return state.delete('board').deleteIn(['boardMap', String(action.meta.id)]);

    case Actions.ADD_TASK_CARD.SUCCESS:
      const normalizedAddedCard = normalize(action.payload, TaskCard);

      return state
        .update('cardMap', cardMap => {
          return cardMap
            ? cardMap.merge(fromJS(normalizedAddedCard.entities.TaskCard))
            : fromJS(normalizedAddedCard.entities.TaskCard);
          // TODO rename taskTrackId
        })
        .updateIn(['trackMap', String(action.payload.taskTrackId)], trackMap =>
          trackMap.update(
            'cards',
            cards => cards.push(action.payload.id) // TODO 考虑卡片排序的问题，理应是 push 到最后一个的，但是以后可能会优先级的情况会弹到第一个，所以暂时考虑以后在后端返回index
          )
        );

    case Actions.UPDATE_TASK_CARD.REQUEST:
    case Actions.UPDATE_TASK_CARD.SUCCESS:
      return state.updateIn(['cardMap', String(action.payload.id)], card =>
        card.merge(fromJS(action.payload))
      );

    case Actions.GET_CARD_DETAIL.SUCCESS:
      const normalizedCardDetail = normalize(action.payload, TaskCard);
      return state.update('cardMap', cardMap => {
        return cardMap.merge(fromJS(normalizedCardDetail.entities.TaskCard));
      });

    case Actions.ADD_TASK_TRACK.SUCCESS:
      const normalizedAddedTrack = normalize(action.payload, TaskTrack);
      return state.update('trackMap', trackMap =>
        trackMap.merge(fromJS(normalizedAddedTrack.entities.TaskTrack))
      );

    case Actions.DESTORY_TASK_TRACK.SUCCESS:
      return state.deleteIn(['trackMap', String(action.meta.trackId)]);

    case Actions.UPDATE_TASK_TRACK.SUCCESS:
      return state.updateIn(['trackMap', String(action.payload.id)], track =>
        track.merge(fromJS(action.payload))
      );

    case Actions.GET_TASK_BOARD_PARTICIPANT.REQUEST:
      return state.delete('boardParticipant');

    case Actions.GET_TASK_BOARD_PARTICIPANT.SUCCESS:
      return state.set('boardParticipants', fromJS(action.payload));

    default:
      return state;
  }
}
