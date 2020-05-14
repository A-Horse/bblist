import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable, from } from 'rxjs';
import { map, mergeMap, timeout } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
  CREATE_KANBAN_COLUMN_REQUEST,
  CREATE_KANBAN_COLUMN_SUCCESS,
  CREATE_KANBAN_REQUEST,
  createKanbanColumnFailure,
  createKanbanColumnSuccess,
  createKanbanFailure,
  createKanbanSuccess,
  GET_PROJECT_KANBAN_DETAIL_REQUEST,
  GET_PROJECT_KANBANS_REQUEST,
  getProjectKanbanDetailFailure,
  getProjectKanbanDetailRequest,
  getProjectKanbanDetailSuccess,
  getProjectKanbansFailure,
  getProjectKanbansSuccess,
  CREATE_KANBAN_SUCCESS,
  getProjectKanbansRequest,
} from '../actions/project/kanban.action';
import { Kanban } from '../typings/kanban.typing';
import { makeApiUrl } from '../utils/api';
import { setProjectDefaultKanbanRequest } from '../actions/project/project-setting.action';
import { getProjectDetailRequest } from '../actions/project/project.action';

export const GET_PROJECT_KANBANS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_KANBANS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload.projectId}/kanbans`))
        .then((result: AxiosResponse<Kanban[]>) =>
          getProjectKanbansSuccess({
            projectId: action.payload.projectId,
            kanbans: result.data,
          })
        )
        .catch(getProjectKanbansFailure);
    })
  );

export const GET_PROJECT_KANBAN_DETAIL_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(GET_PROJECT_KANBAN_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/kanban/${action.payload.kanbanId}/detail`))
        .then((result: AxiosResponse<Kanban>) =>
          getProjectKanbanDetailSuccess({
            kanban: result.data,
          })
        )
        .catch(getProjectKanbanDetailFailure);
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
        // ...(action.meta.noKanbanExist
        //   ? [
        //       setProjectDefaultKanbanRequest({
        //         projectId: action.meta.projectID,
        //         kanbanId: action.payload,
        //       }),
        //       getProjectDetailRequest(action.meta.projectID),
        //     ]
        //   : []),
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
        .post(
          makeApiUrl(`/kanban/${action.payload.kanbanId}/column`),
          action.payload
        )
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
