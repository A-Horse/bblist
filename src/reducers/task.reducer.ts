import { GET_PROJCETS_SUCCESS } from './../actions/project/project.action';
import { normalize } from 'normalizr';
import { fromJS, Record, Map } from 'immutable';
import * as R from 'ramda';
import Actions from '../actions/actions';
import { TaskBoards, TaskBoard, TaskCard, TaskTrack } from '../schema';
import { ITaskBoard, ITaskBoardSetting } from '../typings/task/task-board.typing';

export interface TaskBoard {
  id: string;
  name: string;
  status: string;
}

export interface TaskStateProp {
  currentBoard: Record<ITaskBoard> | null;
  boardFetching: boolean;
  trackMap: Map<string, any>;
  boardSettingMap: Map<string, Record<ITaskBoardSetting>>;
  cardMap: Map<string, any>;
  boardParticipants: any;
  boardParticipant: any;
}

export function task2(
  state: Record<TaskStateProp> = fromJS({
    currentBoard: null,
    boardMap: {},
    trackMap: {},
    cardMap: {},
    boardSettingMap: {}
  }),
  action: any
) {
  switch (action.type) {
    case Actions.GET_TASK_BOARD.REQUEST:
      if (action.meta && action.meta.isRefresh) {
        return state;
      }
      return state.update('currentBoard', () => null).update('boardFetching', R.T);

    case Actions.GET_TASK_BOARD.SUCCESS:
      const normalizedBoard = normalize(action.payload, TaskBoard);
      // TODO 同时设置board 里面的 setting
      // TODO 把 card 和 track 用 board id 索引
      return state
        .update('boardFetching', R.F)
        .update('currentBoard', () =>
          fromJS(normalizedBoard.entities.TaskBoard[normalizedBoard.result])
        )
        .update('trackMap', () =>
          fromJS(normalizedBoard.entities.TaskTrack || {}).sort((a: any, b: any) => {
            return a.get('order') < b.get('order') ? -1 : 1;
          })
        )
        .update('cardMap', () => fromJS(normalizedBoard.entities.TaskCard || {}));

    case Actions.GET_TASK_BOARD.FAILURE:
      return state.update('currentBoard', () => null).update('boardFetching', R.F);

  

    case Actions.GET_TASK_BOARD_SETTING.REQUEST:
      return state;
    case Actions.GET_TASK_BOARD_SETTING.SUCCESS:
      return state.setIn(['boardSettingMap', action.meta.boardId], fromJS(action.payload));

    case Actions.TASKBOARD_SETTING_UPDATE.REQUEST:
      return state.updateIn(['boardSettingMap', action.meta.taskBoardId], setting => {
        return setting.merge(fromJS(action.payload));
      });

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

    case Actions.UPDATE_TASK_BOARD.SUCCESS:
      return state.update('currentBoard', board => {
        if (!board) {
          return null;
        }
        return board.merge(fromJS(R.omit(['id'], action.payload)));
      });

    case Actions.UPLOAD_TASK_BOARD_COVER.SUCCESS:
      return state.update('currentBoard', board => {
        if (!board) {
          return null;
        }
        return board.merge(fromJS(R.omit(['id'], action.payload)));
      });

    case Actions.DESTORY_TASK_BOARD.SUCCESS:
      return state.delete('currentBoard').deleteIn(['boardMap', String(action.meta.id)]);

    case Actions.ADD_TASK_CARD.SUCCESS:
      const normalizedAddedCard = normalize(action.payload, TaskCard);

      return state
        .update('cardMap', cardMap => {
          return cardMap
            ? cardMap.merge(fromJS(normalizedAddedCard.entities.TaskCard))
            : fromJS(normalizedAddedCard.entities.TaskCard);
        })
        .updateIn(['trackMap', action.meta.trackId], trackMap =>
          trackMap.update(
            'cards',
            (cards: any) => cards.push(action.payload.id) // TODO 考虑卡片排序的问题，理应是 push 到最后一个的，但是以后可能会优先级的情况会弹到第一个，所以暂时考虑以后在后端返回index
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

    case Actions.DESTORY_TASK_CARD.SUCCESS:
    case Actions.ARCHIVE_TASK_CARD.SUCCESS:
      return state.update('cardMap', cardMap => {
        return cardMap.delete(String(action.payload.id));
      });

    default:
      return state;
  }
}
