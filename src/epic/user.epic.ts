import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { FSAction } from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { Observable } from 'rxjs';
import { GET_ALL_USERS_REQUEST, getAllUsersSuccess, getAllUsersFailure } from '../actions/user/user.action';
import {AppUserInfo} from "../typings/user/user.typing";

export const GET_ALL_USERS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_ALL_USERS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/users`), action.payload)
        .then((result: AxiosResponse<AppUserInfo[]>) => getAllUsersSuccess(action.payload.projectID, result.data))
        .catch(getAllUsersFailure);
    })
  );
