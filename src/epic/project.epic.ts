import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
  SET_PROJECT_DEFAULT_KANBAN_REQUEST,
  setProjectDefaultKanbanFailure,
  setProjectDefaultKanbanSuccess
} from '../actions/project/project-setting.action';
import {
  CREATE_PROJECT_REQUEST,
  createProjectFailure,
  createProjectSuccess,
  GET_PROJECT_DETAIL_REQUEST,
  GET_PROJECT_REQUEST,
  getProjectDetailFailure,
  getProjectDetailSuccess,
  getProjectsFailure,
  getProjectsSuccess,
  UPLOAD_PROJECT_COVER_REQUEST,
  uploadProjectCoverFailure,
  uploadProjectCoverSuccess
} from '../actions/project/project.action';
import {
  Project,
  ProjectId,
  UploadProjectCoverInput
} from '../typings/project.typing';
import { makeApiUrl } from '../utils/api';
import {
  GET_PROJECT_DETAIL_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  getProjectsRequest
} from '../actions/project/project.action';
import { getProjectKanbansRequest } from '../actions/project/kanban.action';
import {
  UPLOAD_PROJECT_COVER_SUCCESS,
  getProjectDetailRequest
} from '../actions/project/project.action';

export const GET_PROJECTS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_REQUEST),
    mergeMap(() => {
      return axios
        .get(makeApiUrl(`/projects`))
        .then((result: AxiosResponse<Project[]>) =>
          getProjectsSuccess(result.data)
        )
        .catch(getProjectsFailure);
    })
  );

export const GET_PROJECT_DETAIL_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload}`))
        .then((result: AxiosResponse<Project>) =>
          getProjectDetailSuccess(result.data)
        )
        .catch(getProjectDetailFailure);
    })
  );

export const GET_PROJECT_DETAIL_SUCCESS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_DETAIL_SUCCESS),
    map(action => getProjectKanbansRequest({ projectId: action.payload.id }))
  );

export const CREATE_PROJECT_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATE_PROJECT_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project`), action.payload)
        .then((result: AxiosResponse<ProjectId>) =>
          createProjectSuccess(result.data)
        )
        .catch(createProjectFailure);
    })
  );

export const CREATE_PROJECT_SUCCESS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATE_PROJECT_SUCCESS),
    map(() => getProjectsRequest())
  );

export const SET_PROJECT_DEFAULT_KANBAN_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(SET_PROJECT_DEFAULT_KANBAN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(
          makeApiUrl(
            `/project/${action.payload.projectId}/setting/default-kanban/${action.payload.kanbanId}`
          )
        )
        .then(() => setProjectDefaultKanbanSuccess())
        .catch(setProjectDefaultKanbanFailure);
    })
  );

export const UPLOAD_PROJECT_COVER_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(UPLOAD_PROJECT_COVER_REQUEST),
    mergeMap((action: FSAction) => {
      const uploadProjectCoverInput: UploadProjectCoverInput = action.payload;
      const data = new FormData();
      data.append('cover', uploadProjectCoverInput.coverBase64);
      return axios
        .post(
          makeApiUrl(`/project/${uploadProjectCoverInput.projectId}/cover`),
          data
        )
        .then(() => {
          action.meta.callback && action.meta.callback();
          return uploadProjectCoverSuccess(uploadProjectCoverInput.projectId);
        })
        .catch(error => {
          action.meta.callback && action.meta.callback(error);
          return uploadProjectCoverFailure(error);
        });
    })
  );

export const UPLOAD_PROJECT_COVER_SUCCESS_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(UPLOAD_PROJECT_COVER_SUCCESS),
    map(action => getProjectDetailRequest(action.payload.projectID))
  );
