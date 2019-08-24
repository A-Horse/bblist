import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import {
  CREATAE_KANBAN_COLUMN_REQUEST,
  CREATAE_KANBAN_REQUEST,
  createKanbanFailure,
  createKanbanSuccess,
  GET_PROJCET_KANBANS_REQUEST,
  getProjectKanbansFailure,
  getProjectKanbansSuccess,
  createKanbanColumnSuccess,
  createKanbanColumnFailure
} from '../actions/project/kanban.action';
import { Kanban } from '../typings/kanban.typing';
import { makeApiUrl } from '../utils/api';

export const GET_PROJCET_KANBANS_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_PROJCET_KANBANS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project/${action.payload.projectId}/kanbans`))
        .then((result: AxiosResponse<Kanban[]>) =>
          getProjectKanbansSuccess({
            projectId: action.payload.projectId,
            kanbans: result.data
          })
        )
        .catch(getProjectKanbansFailure);
    })
  );

export const CREATAE_KANBAN_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_KANBAN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project/${action.payload.projectId}/kanban`), action.payload)
        .then((result: AxiosResponse<string>) => createKanbanSuccess(result.data))
        .catch(createKanbanFailure);
    })
  );

export const CREATAE_KANBAN_COLUMN_REQUEST_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(CREATAE_KANBAN_COLUMN_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .post(makeApiUrl(`/project/${action.payload.projectId}/kanban/${action.payload.kanbanId}/column`), action.payload)
        .then((result: AxiosResponse<string>) => createKanbanColumnSuccess(result.data))
        .catch(createKanbanColumnFailure);
    })
  );
