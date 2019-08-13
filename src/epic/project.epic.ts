import { FSAction } from './../actions/actions';
import { Project, ProjectId } from '../typings/project.typing';
import { mergeMap } from 'rxjs/operators';
import {
  getProjectsSuccess,
  getProjectsFailure,
  GET_PROJCETS_REQUEST,
  CREATE_PROJCET_REQUEST,
  createProjectSuccess,
  createProjectFailure,
  getProjectDetailSuccess,
  getProjectDetailFailure,
  GET_PROJCET_DETAIL_REQUEST
} from './../actions/project/project.action';

import { ofType } from 'redux-observable';
import { makeApiUrl } from '../utils/api';
import axios, { AxiosResponse } from 'axios';

export const GET_PROJCETS_REQUEST_FN = (action$: any) =>
  action$.pipe(
    ofType(GET_PROJCETS_REQUEST),
    mergeMap(() => {
      return axios
        .get(makeApiUrl(`/projects`))
        .then((result: AxiosResponse<Project[]>) => getProjectsSuccess(result.data))
        .catch(getProjectsFailure);
    })
  );

export const GET_PROJCET_DETAIL_REQUEST_FN = (action$: any) =>
  action$.pipe(
    ofType(GET_PROJCET_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload}`))
        .then((result: AxiosResponse<Project>) => getProjectDetailSuccess(result.data))
        .catch(getProjectDetailFailure);
    })
  );

export const CREATE_PROJCET_REQUEST_FN = (action$: any) =>
  action$.pipe(
    ofType(CREATE_PROJCET_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project`), action.payload)
        .then((result: AxiosResponse<ProjectId>) => createProjectSuccess(result.data))
        .catch(createProjectFailure);
    })
  );
