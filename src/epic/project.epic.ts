import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
    CREATE_PROJCET_REQUEST, createProjectFailure, createProjectSuccess, GET_PROJCET_DETAIL_REQUEST,
    GET_PROJCETS_REQUEST, getProjectDetailFailure, getProjectDetailSuccess, getProjectsFailure,
    getProjectsSuccess
} from '../actions/project/project.action';
import { Project, ProjectId } from '../typings/project.typing';
import { makeApiUrl } from '../utils/api';

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
