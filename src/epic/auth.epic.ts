import axios from 'axios';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import Actions from '../actions/actions';
import { setupAxiosJwtHeader } from '../helper/http-interceptor';
import { Storage } from '../services/storage';
import { makeApiUrl } from '../utils/api';
import { saveAuthData } from '../utils/auth';
import {
  ActionLoginRequest,
  LOGIN_REQUEST,
  loginFailure,
  loginSuccess
} from '../actions/login.action';

export const LOGIN_REQUEST_FN = (action$: Observable<any>) =>
  action$.pipe(
    ofType(LOGIN_REQUEST),
    mergeMap((action: ActionLoginRequest) => {
      return axios
        .post(makeApiUrl('/user/signin'), action.payload)
        .then(response => {
          saveAuthData(response.data);
          setupAxiosJwtHeader(response.data.token);
          action.meta.onSuccess();
          return loginSuccess();
        })
        .catch(error => {
          console.log(error);
          action.meta.onError(error.response);
          return loginFailure(error.response);
        });
    })
  );

export const SIGNUP_REQUEST = (action$: Observable<any>) =>
  action$.pipe(
    ofType(Actions.SIGNUP.REQUEST),
    mergeMap(action =>
      axios
        .post(makeApiUrl('/user/signup'), action.payload)
        .then(Actions.SIGNUP.success)
        .catch(Actions.SIGNUP.failure)
    )
  );

export const LOGOUT_SUCCESS = (action$: Observable<any>) =>
  action$.pipe(
    ofType(Actions.LOGOUT.SUCCESS),
    mergeMap(() => {
      Storage.clear();
      window.location.pathname = '/';
      return of(Actions.LOGOUT.finish);
    })
  );
