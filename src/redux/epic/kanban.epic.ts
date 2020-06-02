import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
  CREATE_KANBAN_REQUEST,
  CREATE_KANBAN_SUCCESS,
  createKanbanFailure,
  createKanbanSuccess,
  GET_PROJECT_KANBANS_REQUEST,
  getProjectKanbanDetailRequest,
  getProjectKanbansFailure,
  getProjectKanbansRequest,
  getProjectKanbansSuccess,
} from '../actions/kanban.action';
import { IKanban } from '../../typings/kanban.typing';
import { makeApiUrl } from '../../utils/api';
import {
  CREATE_KANBAN_COLUMN_REQUEST,
  CREATE_KANBAN_COLUMN_SUCCESS,
  createKanbanColumnFailure,
  createKanbanColumnSuccess,
} from '../actions/column.action';

export const GET_PROJECT_KANBANS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_KANBANS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload.projectId}/kanbans`))
        .then((result: AxiosResponse<IKanban[]>) =>
          getProjectKanbansSuccess({
            projectId: action.payload.projectId,
            kanbans: result.data,
          })
        )
        .catch(getProjectKanbansFailure);
    })
  );

export const CREATE_KANBAN_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATE_KANBAN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(
          makeApiUrl(`/project/${action.payload.projectId}/kanban`),
          action.payload
        )
        .then((result: AxiosResponse<string>) =>
          createKanbanSuccess(
            result.data,
            action.payload.projectId,
            action.meta.noKanbanExist
          )
        )
        .catch(createKanbanFailure);
    })
  );

export const CREATE_KANBAN_SUCCESS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATE_KANBAN_SUCCESS),
    mergeMap((action: FSAction) =>
      from([
        getProjectKanbansRequest({
          projectId: action.meta.projectID,
        }),
      ])
    )
  );

export const CREATE_KANBAN_COLUMN_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(CREATE_KANBAN_COLUMN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/column`), action.payload)
        .then((result: AxiosResponse<string>) =>
          createKanbanColumnSuccess(result.data, {
            kanbanId: action.payload.kanbanId,
          })
        )
        .catch(createKanbanColumnFailure);
    })
  );

export const CREATE_KANBAN_COLUMN_SUCCESS_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(CREATE_KANBAN_COLUMN_SUCCESS),
    map((action: FSAction) => {
      return getProjectKanbanDetailRequest({
        kanbanId: action.meta.kanbanId,
      });
    })
  );
