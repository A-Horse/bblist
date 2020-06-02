import axios, { AxiosResponse } from 'axios';
import equals from 'ramda/es/equals';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  take,
} from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
  GET_PROJECT_ISSUE_DETAIL_REQUEST,
  getProjectIssueDetailFailure,
  getProjectIssueDetailRequest,
  getProjectIssueDetailSuccess,
  UPDATE_PROJECT_ISSUE_DETAIL_REQUEST,
  updateProjectIssueDetailFailure,
  updateProjectIssueDetailSuccess,
} from '../actions/project-issue-detail.action';
import {
  CREATE_PROJECT_ISSUE_REQUEST,
  CREATE_PROJECT_ISSUE_SUCCESS,
  createProjectCardFailure,
  createProjectCardSuccess,
  RANK_PROJECT_CARD_IN_KANBAN_REQUEST,
  rankProjectCardInKanbanFailure,
  rankProjectCardInKanbanSuccess,
} from '../actions/project-issue.action';
import { RootState } from '../reducer';
import {
  ProjectIssue,
  RankProjectCardInKanbanInput,
} from '../../typings/project-issue.typing';
import { makeApiUrl } from '../../utils/api';
import { findIssuePositionInColumn } from '../reducer/selector/card.selector';

export const CREATE_PROJECT_ISSUE_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(CREATE_PROJECT_ISSUE_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(
          makeApiUrl(`/project/${action.payload.projectId}/issue`),
          action.payload
        )
        .then((result: AxiosResponse<string>) => {
          action.meta.callback && action.meta.callback(null, result.data);
          return createProjectCardSuccess(result.data);
        })
        .catch((error) => {
          action.meta.callback && action.meta.callback(error);
          return createProjectCardFailure(error);
        });
    })
  );

export const CREATE_PROJECT_ISSUE_SUCCESS_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(CREATE_PROJECT_ISSUE_SUCCESS),
    map((action) => getProjectIssueDetailRequest({ issueId: action.payload }))
  );

export const UPDATE_PROJECT_ISSUE_DETAIL_REQUEST_FN = (
  action$: Observable<FSAction>
) =>
  action$.pipe(
    ofType(UPDATE_PROJECT_ISSUE_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .patch(
          makeApiUrl(`/issue/${action.payload.issueId}`),
          action.payload.partialIssue
        )
        .then((result: AxiosResponse<void>) => {
          action.meta.callback(null);
          return updateProjectIssueDetailSuccess({
            ...action.payload.partialIssue,
            id: action.payload.issueId,
          });
        })
        .catch((error) => {
          action.meta.callback(error);
          return updateProjectIssueDetailFailure();
        });
    })
  );

export const GET_PROJECT_ISSUE_DETAIL_REQUEST_FN = (
  action$: Observable<FSAction>
) => {
  return action$.pipe(
    ofType(GET_PROJECT_ISSUE_DETAIL_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/issue/${action.payload.issueId}`))
        .then((result: AxiosResponse<ProjectIssue>) =>
          getProjectIssueDetailSuccess(result.data)
        )
        .catch(getProjectIssueDetailFailure);
    })
  );
};

export const RANK_PROJECT_CARD_IN_KANBAN_REQUEST_FN = (
  action$: Observable<FSAction>,
  state$: Observable<RootState>
) =>
  action$.pipe(
    ofType(RANK_PROJECT_CARD_IN_KANBAN_REQUEST),
    distinctUntilChanged<FSAction>(equals),
    filter((action) => !action.meta.temporary),
    mergeMap((action: FSAction) => {
      const payload: RankProjectCardInKanbanInput = action.payload;

      return state$.pipe(
        take(1),
        mergeMap((state: RootState) => {
          const freshSelectedIssue = state.project
            .get('issueMap')
            .get(action.payload.selectCard.get('id'))!;

          const { targetIssue, isBefore } = findIssuePositionInColumn(
            state,
            freshSelectedIssue
          );
          return axios
            .post(makeApiUrl(`/kanban/${action.payload.kanbanId}/card-rank`), {
              cardId: payload.selectCard.get('id'),
              targetCardId: targetIssue.get('id'),
              isBefore: isBefore,
            })
            .then(
              (result: AxiosResponse<{ cardId: string; order: number }[]>) =>
                rankProjectCardInKanbanSuccess(result.data)
            )
            .catch(rankProjectCardInKanbanFailure);
        })
      );
    }),
    catchError((error: Error) => {
      return of(rankProjectCardInKanbanFailure(error));
    })
  );
