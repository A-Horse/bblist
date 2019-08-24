import axios from 'axios';
import { ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import Actions from '../actions/actions';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import { http } from '../services/http';
import { Storage } from '../services/storage';
import { makeApiUrl } from '../utils/api';
import { saveAuthData } from '../utils/auth';

export const LOGIN_REQUEST = (action$: Observable<any>) =>
  action$.pipe(
    ofType(Actions.LOGIN.REQUEST),
    mergeMap(action =>
      axios
        .post(makeApiUrl('/user/signin'), action.payload)
        .then(response => {
          saveAuthData(response.data);
          setupAxiosJwtHeader(response.data.token);
          return Actions.LOGIN.success(response);
        })
        .catch(error => {
          if (error.response && error.response.code === 401) {
            return Actions.LOGIN.failure('email and password not matched');
          }
          return Actions.LOGIN.failure('Login fail');
        })
    )
  );

export const SIGNUP_REQUEST = (action$: Observable<any>) =>
  action$.pipe(
    ofType(Actions.SIGNUP.REQUEST),
    mergeMap(action =>
      http
        .post(makeApiUrl('/user/signup'), null, action.payload)
        .then(Actions.SIGNUP.success)
        .catch(Actions.SIGNUP.failure)
    )
  );

export const LOGOUT_REQUEST = (action$: Observable<any>) =>
  action$.pipe(
    ofType(Actions.LOGOUT.REQUEST),
    mergeMap(() =>
      http
        .post(makeApiUrl('/user/logout'))
        .then(Actions.LOGOUT.success)
        .catch(Actions.LOGOUT.failure)
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
