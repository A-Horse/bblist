import { makeApiUrl } from '../utils/api';
import { ofType } from 'redux-observable';
import Actions from '../actions/actions';
import { mergeMap } from 'rxjs/operators';
import axios from 'axios';
import http from '../services/http';

export const TASKBOARD_SETTING_UPDATE_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.TASKBOARD_SETTING_UPDATE.REQUEST),
    mergeMap((action: any) => {
      return axios
        .patch(`/api/task-board/${action.meta.taskBoardId}/setting`, action.payload)
        .then(resp => Actions.TASKBOARD_SETTING_UPDATE.success(resp.data, action.meta))
        .catch(Actions.TASKBOARD_SETTING_UPDATE.failure);
    })
  );

export const GET_TASK_BOARD_SETTING_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.GET_TASK_BOARD_SETTING.REQUEST),
    mergeMap((action: any) => {
      return axios
        .get(`/api/v2/task-board/${action.payload.taskBoardId}/setting`)
        .then(resp =>
          Actions.GET_TASK_BOARD_SETTING.success(resp.data, {
            boardId: action.payload.taskBoardId
          })
        )
        .catch(Actions.GET_TASK_BOARD_SETTING.failure);
    })
  );


export const UPLOAD_TASK_BOARD_COVER_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.UPLOAD_TASK_BOARD_COVER.REQUEST),
    mergeMap((action: any) => {
      return http
        .post(
          makeApiUrl(`/tk/v2/task-board/${action.payload.id}/cover`),
          null,
          action.payload.data,
          {
            formData: true
          }
        )
        .then(Actions.UPLOAD_TASK_BOARD_COVER.success)
        .catch(Actions.UPLOAD_TASK_BOARD_COVER.failure);
    })
  );
