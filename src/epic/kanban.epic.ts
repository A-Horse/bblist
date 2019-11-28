import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
    CREATAE_KANBAN_COLUMN_REQUEST, CREATAE_KANBAN_COLUMN_SUCCESS, CREATAE_KANBAN_REQUEST,
    createKanbanColumnFailure, createKanbanColumnSuccess, createKanbanFailure, createKanbanSuccess,
    GET_PROJCET_KANBAN_DETAIL_REQUEST, GET_PROJCET_KANBANS_REQUEST, getProjectKanbanDetailFailure,
    getProjectKanbanDetailRequest, getProjectKanbanDetailSuccess, getProjectKanbansFailure,
    getProjectKanbansSuccess
} from '../actions/project/kanban.action';
import { Kanban } from '../typings/kanban.typing';
import { makeApiUrl } from '../utils/api';

export const GET_PROJCET_KANBANS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJCET_KANBANS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload.projectId}/kanbans`))
        .then((result: AxiosResponse<Kanban[]>) =>
          getProjectKanbansSuccess({
            projectId: action.payload.projectId,
            kanbans: result.data
          })
        )
        .catch(getProjectKanbansFailure);
    })
  );

export const GET_PROJCET_KANBAN_DETAIL_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJCET_KANBAN_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/kanban/${action.payload.kanbanId}/detail`))
        .then((result: AxiosResponse<Kanban>) =>
          getProjectKanbanDetailSuccess({
            kanban: result.data
          })
        )
        .catch(getProjectKanbanDetailFailure);
    })
  );

export const CREATAE_KANBAN_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_KANBAN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project/${action.payload.projectId}/kanban`), action.payload)
        .then((result: AxiosResponse<string>) => createKanbanSuccess(result.data))
        .catch(createKanbanFailure);
    })
  );

export const CREATAE_KANBAN_COLUMN_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_KANBAN_COLUMN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/kanban/${action.payload.kanbanId}/column`), action.payload)
        .then((result: AxiosResponse<string>) =>
          createKanbanColumnSuccess(result.data, {
            kanbanId: action.payload.kanbanId
          })
        )
        .catch(createKanbanColumnFailure);
    })
  );

export const CREATAE_KANBAN_COLUMN_SUCCESS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_KANBAN_COLUMN_SUCCESS),
    map((action: FSAction) => {
      return getProjectKanbanDetailRequest({
        kanbanId: action.meta.kanbanId
      });
    })
  );
