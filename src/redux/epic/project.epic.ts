import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { FSAction } from '../actions/actions';
import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  createProjectFailure,
  createProjectSuccess,
  GET_PROJECT_DETAIL_REQUEST,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_REQUEST,
  getProjectDetailFailure,
  getProjectDetailRequest,
  getProjectDetailSuccess,
  getProjectsFailure,
  getProjectsRequest,
  getProjectsSuccess,
  UPDATE_PROJECT_REQUEST,
  updateProjectsFailure,
  updateProjectsRequest,
  updateProjectsSuccess,
  UPLOAD_PROJECT_COVER_REQUEST,
  UPLOAD_PROJECT_COVER_SUCCESS,
  uploadProjectCoverFailure,
  uploadProjectCoverSuccess,
} from '../actions/project.action';
import {
  IProject,
  ProjectId,
  UploadProjectCoverInput,
} from '../../typings/project.typing';
import { makeApiUrl } from '../../utils/api';
import { getProjectKanbansRequest } from '../actions/kanban.action';

export const GET_PROJECTS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_REQUEST),
    mergeMap(() => {
      return axios
        .get(makeApiUrl(`/projects`))
        .then((result: AxiosResponse<IProject[]>) =>
          getProjectsSuccess(result.data)
        )
        .catch(getProjectsFailure);
    })
  );

export const UPDATE_PROJECT_REQUEST_FN = (
  action$: Observable<ReturnType<typeof updateProjectsRequest>>
) =>
  action$.pipe(
    ofType(UPDATE_PROJECT_REQUEST),
    mergeMap((action) => {
      return axios
        .patch(
          makeApiUrl(`/project/${action.payload.projectID}`),
          action.payload
        )
        .then(() => updateProjectsSuccess())
        .catch(() => updateProjectsFailure());
    })
  );

export const GET_PROJECT_DETAIL_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload}`))
        .then((result: AxiosResponse<IProject>) =>
          getProjectDetailSuccess(result.data)
        )
        .catch(getProjectDetailFailure);
    })
  );

export const GET_PROJECT_DETAIL_SUCCESS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_DETAIL_SUCCESS),
    map((action) => getProjectKanbansRequest({ projectId: action.payload.id }))
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

export const UPLOAD_PROJECT_COVER_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(UPLOAD_PROJECT_COVER_REQUEST),
    mergeMap((action: FSAction) => {
      const uploadProjectCoverInput: UploadProjectCoverInput = action.payload;
      return axios
        .post(
          makeApiUrl(`/project/${uploadProjectCoverInput.projectId}/cover`),
          {
            projectId: uploadProjectCoverInput.projectId,
            coverCode: uploadProjectCoverInput.coverBase64,
          }
        )
        .then(() => {
          action.meta.callback && action.meta.callback();
          return uploadProjectCoverSuccess(uploadProjectCoverInput.projectId);
        })
        .catch((error) => {
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
    map((action) => getProjectDetailRequest(action.payload.projectID))
  );
