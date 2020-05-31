import axios from 'axios';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { ignoreElements, mergeMap, tap } from 'rxjs/operators';

import { FSAction } from '../actions/actions';
import { setupAxiosJwtHeader } from '../../utils/http-interceptor';
import { Storage } from '../../services/storage';
import { makeApiUrl } from '../../utils/api';
import { saveAuthData } from '../../utils/auth';
import {
  ActionLoginRequest,
  LOGIN_REQUEST,
  loginFailure,
  loginSuccess,
} from '../actions/login.action';
import { AUTH_HEADER_KEY } from '../../constant/constants';

export const LOGIN_REQUEST_FN = (action$: Observable<any>) =>
  action$.pipe(
    ofType(LOGIN_REQUEST),
    mergeMap((action: ActionLoginRequest) => {
      return axios
        .post(makeApiUrl('/token'), action.payload)
        .then((response) => {
          saveAuthData(response);
          setupAxiosJwtHeader(response.headers[AUTH_HEADER_KEY]);
          action.meta.onSuccess();
          return loginSuccess();
        })
        .catch((error) => {
          action.meta.onError(error.response);
          return loginFailure(error.response);
        });
    })
  );

export const APP_LOGOUT_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType('APP_LOGOUT'),
    tap(() => {
      Storage.clear();
      window.location.pathname = '/';
    }),
    ignoreElements()
  );
