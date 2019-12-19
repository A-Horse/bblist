import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

import Actions, { FSAction } from '../actions/actions';
import { http } from '../services/http';
import { makeApiUrl } from '../utils/api';
import { getCachedUserId, saveJWT } from '../utils/auth';
import { Observable } from 'rxjs';
import { CREATE_PROJCET_REQUEST, createProjectFailure, createProjectSuccess } from '../actions/project/project.action';
import { ProjectId } from '../typings/project.typing';
import { GET_ALL_USERS_REQUEST, getAllUsersSuccess } from '../actions/user/user.action';

export const GET_ALL_USERS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_ALL_USERS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project`), action.payload)
        .then((result: AxiosResponse<ProjectId>) => getAllUsersSuccess(result.data))
        .catch(getAllUsersSuccess);
    })
  );
