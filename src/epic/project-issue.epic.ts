import { RankProjectCardInKanbanInput, ProjectIssueRecord, ProjectIssue } from '../typings/project-issue.typing';
import { FSAction } from '../actions/actions';
import { mergeMap, filter, tap, distinctUntilChanged, catchError, take } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  GET_COLUMN_CARDS_REQUEST,
  getColumnCardsSuccess,
  getColumnCardsFailure,
  CREATAE_PROJECT_CARD_REQUEST,
  createProjectCardFailure,
  createProjectCardSuccess,
  RANK_PROJECT_CARD_IN_KANBAN_REQUEST,
  rankProjectCardInKanbanSuccess,
  rankProjectCardInKanbanFailure
} from '../actions/project/project-issue.action';
import axios, { AxiosResponse } from 'axios';
import { Observable, of } from 'rxjs';
import { makeApiUrl } from '../utils/api';
import equals from 'ramda/es/equals';
import {
  GET_PROJECT_ISSUE_DETAIL_DEQUEST,
  getProjectIssueDetailSuccess,
  getProjectIssueDetailFailure,
  UPDATE_PROJECT_ISSUE_DETAIL_DEQUEST,
  updateProjectIssueDetailSuccess,
  updateProjectIssueDetailFailure
} from '../actions/project/project-issue-detail.aciton';
import { RootState } from '../reducers';
import { findIssuePositionInColumn } from '../reducers/util/issue.util';

export const CREATAE_PROJECT_CARD_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_PROJECT_CARD_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project/${action.payload.projectId}/issue`), action.payload)
        .then((result: AxiosResponse<string>) => createProjectCardSuccess(result.data))
        .catch(createProjectCardFailure);
    })
  );

export const UPDATE_PROJECT_ISSUE_DETAIL_DEQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(UPDATE_PROJECT_ISSUE_DETAIL_DEQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .patch(makeApiUrl(`/issue/${action.payload.issueId}`), action.payload.partialIssue)
        .then((result: AxiosResponse<void>) => updateProjectIssueDetailSuccess())
        .catch(updateProjectIssueDetailFailure);
    })
  );

export const GET_PROJECT_ISSUE_DETAIL_DEQUEST_FN = (action$: Observable<FSAction>) => {
  return action$.pipe(
    ofType(GET_PROJECT_ISSUE_DETAIL_DEQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/issue/${action.payload.issueId}`))
        .then((result: AxiosResponse<ProjectIssue>) => getProjectIssueDetailSuccess(result.data))
        .catch(getProjectIssueDetailFailure);
    })
  );
};

export const RANK_PROJECT_CARD_IN_KANBAN_REQUEST_FN = (action$: Observable<FSAction>, state$: Observable<RootState>) =>
  action$.pipe(
    ofType(RANK_PROJECT_CARD_IN_KANBAN_REQUEST),
    distinctUntilChanged<FSAction>(equals),
    filter(action => !action.meta.temporary),
    mergeMap((action: FSAction) => {
      const payload: RankProjectCardInKanbanInput = action.payload;

      return state$.pipe(
        take(1),
        mergeMap((state: RootState) => {
          const freshSelectedIssue = state.project.get('cardMap').get(action.payload.selectCard.get('id'))!;
          
          const { targetIssue, isBefore } = findIssuePositionInColumn(state, freshSelectedIssue);
          return axios
            .post(makeApiUrl(`/kanban/${action.payload.kanbanId}/card-rank`), {
              cardId: payload.selectCard.get('id'),
              targetCardId: targetIssue.get('id'),
              isBefore: isBefore
            })
            .then((result: AxiosResponse<{ cardId: string; order: number }[]>) =>
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