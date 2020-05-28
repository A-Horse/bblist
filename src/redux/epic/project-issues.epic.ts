import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
  GET_COLUMN_CARDS_REQUEST,
  GET_PROJECT_ISSUES_REQUEST,
  getColumnCardsFailure,
  getColumnCardsSuccess,
  getProjectIssuesFailure,
  getProjectIssuesSuccess
} from '../actions/project/project-issue.action';
import { PaginationList } from '../../typings/pagination.typing';
import { ProjectIssue } from '../../typings/project-issue.typing';
import { makeApiUrl } from '../../utils/api';

export const GET_COLUMN_CARDS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_COLUMN_CARDS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(
          makeApiUrl(
            `/kanban/${action.payload.kanbanId}/column/${action.payload.columnID}/issues`
          )
        )
        .then((result: AxiosResponse<ProjectIssue[]>) => {
          action.meta.requestDoneCallback();
          return getColumnCardsSuccess({
            kanbanId: action.payload.kanbanId,
            columnID: action.payload.columnID,
            cards: result.data
          });
        })
        .catch(error => {
          action.meta.requestDoneCallback();
          return getColumnCardsFailure(error);
        });
    })
  );

export const GET_PROJECT_ISSUES_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJECT_ISSUES_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(
          makeApiUrl(
            `/project/${action.payload.projectId}/issues?pageNumber=${action.payload.pageNumber}&pageSize=${action.payload.pageSize}`
          )
        )
        .then((result: AxiosResponse<PaginationList<ProjectIssue>>) => {
          return getProjectIssuesSuccess({
            cardPagtiton: result.data,
            projectId: action.payload.projectId
          });
        })
        .catch(error => {
          return getProjectIssuesFailure(error);
        });
    })
  );
