import { Card } from './../typings/kanban-card.typing';
import { FSAction } from './../actions/actions';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import {
  GET_COLUMN_CARDS_REQUEST,
  getColumnCardsSuccess,
  getColumnCardsFailure,
  CREATAE_PROJECT_CARD_REQUEST,
  createProjectCardFailure,
  createProjectCardSuccess
} from './../actions/project/kanban-card.action';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { makeApiUrl } from '../utils/api';

export const GET_COLUMN_CARDS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_COLUMN_CARDS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(
          makeApiUrl(`/kanban/${action.payload.kanbanId}/column/${action.payload.columnId}/cards`)
        )
        .then((result: AxiosResponse<Card[]>) => {
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

export const CREATAE_PROJECT_CARD_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_PROJECT_CARD_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project/${action.payload.projectId}/card`), action.payload)
        .then((result: AxiosResponse<string>) => createProjectCardSuccess(result.data))
        .catch(createProjectCardFailure);
    })
  );
