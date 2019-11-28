import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
    SET_PROJECT_DEFAULT_KANBAN_REQUEST, setProjectDefaultKanbanFailure,
    setProjectDefaultKanbanSuccess
} from '../actions/project/project-setting.action';
import {
    CREATE_PROJCET_REQUEST, createProjectFailure, createProjectSuccess, GET_PROJCET_DETAIL_REQUEST,
    GET_PROJCETS_REQUEST, getProjectDetailFailure, getProjectDetailSuccess, getProjectsFailure,
    getProjectsSuccess, UPLOAD_PROJCET_COVER_REQUEST, uploadProjectCoverFailure,
    uploadProjectCoverSuccess
} from '../actions/project/project.action';
import { Project, ProjectId, UploadProjectCoverInput } from '../typings/project.typing';
import { makeApiUrl } from '../utils/api';

export const GET_PROJCETS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJCETS_REQUEST),
    mergeMap(() => {
      return axios
        .get(makeApiUrl(`/projects`))
        .then((result: AxiosResponse<Project[]>) => getProjectsSuccess(result.data))
        .catch(getProjectsFailure);
    })
  );

export const GET_PROJCET_DETAIL_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJCET_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload}`))
        .then((result: AxiosResponse<Project>) => getProjectDetailSuccess(result.data))
        .catch(getProjectDetailFailure);
    })
  );

export const CREATE_PROJCET_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATE_PROJCET_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project`), action.payload)
        .then((result: AxiosResponse<ProjectId>) => createProjectSuccess(result.data))
        .catch(createProjectFailure);
    })
  );

export const SET_PROJECT_DEFAULT_KANBAN_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(SET_PROJECT_DEFAULT_KANBAN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project/${action.payload.projectId}/setting/default-kanban/${action.payload.kanbanId}`))
        .then(() => setProjectDefaultKanbanSuccess())
        .catch(setProjectDefaultKanbanFailure);
    })
  );

export const UPLOAD_PROJCET_COVER_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(UPLOAD_PROJCET_COVER_REQUEST),
    mergeMap((action: FSAction) => {
      const uploadProjectCoverInput: UploadProjectCoverInput = action.payload;

      const data = new FormData();
      data.append('cover', uploadProjectCoverInput.coverBase64);

      return axios
        .post(makeApiUrl(`/project/${uploadProjectCoverInput.projectId}/cover`), data)
        .then(() => uploadProjectCoverSuccess())
        .catch(uploadProjectCoverFailure);
    })
  );
