//
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Storage } from '../services/storage';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { saveAuthData } from '../utils/auth';
import { setupAxiosJwtHeader } from '../helper/http-intercetor';
import axios from 'axios';

export const LOGIN_REQUEST = action$ =>
  action$.ofType(Actions.LOGIN.REQUEST).mergeMap(action =>
    axios
      .post(makeApiUrl('/user/signin'), action.payload)
      .then(response => {
        saveAuthData(response.data);
        setupAxiosJwtHeader(response.data.jwt);
        return Actions.LOGIN.success(response);
      })
      .catch(error => {
        if (error.response && error.response.code === 401) {
          return Actions.LOGIN.failure('email and password not matched');
        }
        return Actions.LOGIN.failure('Login fail');
      })
  );

export const SIGNUP_REQUEST = action$ =>
  action$.ofType(Actions.SIGNUP.REQUEST).mergeMap(action =>
    http
      .post(makeApiUrl('/user/signup'), null, action.payload)
      .then(Actions.SIGNUP.success)
      .catch(Actions.SIGNUP.failure)
  );

export const LOGOUT_REQUEST = action$ =>
  action$.ofType(Actions.LOGOUT.REQUEST).mergeMap(() =>
    http
      .post(makeApiUrl('/user/logout'))
      .then(Actions.LOGOUT.success)
      .catch(Actions.LOGOUT.failure)
  );

export const LOGOUT_SUCCESS = action$ =>
  action$.ofType(Actions.LOGOUT.SUCCESS).mergeMap(() => {
    Storage.clear();
    window.location.pathname = '/';
    return Observable.of(Actions.LOGOUT.finish);
  });
