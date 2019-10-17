import { Issue } from '../typings/kanban-card.typing';
import { FSAction } from '../actions/actions';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  GET_PROJECT_ISSUES_REQUEST,
  getProjectIssuesSuccess,
  getProjectIssuesFailure,
  getColumnCardsSuccess,
  getColumnCardsFailure,
  GET_COLUMN_CARDS_REQUEST
} from '../actions/project/project-issue.action';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { makeApiUrl } from '../utils/api';
import { PagtiationList } from '../typings/pagtiation.typing';

export const GET_COLUMN_CARDS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_COLUMN_CARDS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(
          makeApiUrl(`/kanban/${action.payload.kanbanId}/column/${action.payload.columnId}/cards`)
        )
        .then((result: AxiosResponse<Issue[]>) => {
          action.meta.requestDoneCallback();
          return getColumnCardsSuccess({
            kanbanId: action.payload.kanbanId,
            columnId: action.payload.columnId,
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
        .then((result: AxiosResponse<PagtiationList<Issue>>) => {
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
