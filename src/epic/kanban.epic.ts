import {
  GET_PROJCET_KANBANS_REQUEST,
  getProjectKanbansFailure,
  getProjectKanbansSuccess,
  CREATAE_KANBAN_REQUEST,
  createKanbanFailure,
  createKanbanSuccess
} from './../actions/project/kanban.action';
import { Kanban } from './../typings/kanban.typing';
import { FSAction } from './../actions/actions';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { makeApiUrl } from '../utils/api';
import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

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
