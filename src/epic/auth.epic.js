import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Storage } from '../services/storage';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { saveAuthData, getJWT } from 'utils/auth';

export const IDENTIFY_REQUEST = action$ =>
  action$.ofType(Actions.IDENTIFY.REQUEST).mergeMap(action => {
    if (!getJWT()) {
      return Observable.of(Actions.IDENTIFY.failure(new Error('Not auth data.')));
    }
    return http
      .get(makeApiUrl('/user/identify'))
      .then(Actions.IDENTIFY.success)
      .catch(Actions.IDENTIFY.failure);
  });

export const LOGIN_REQUEST = action$ =>
  action$.ofType(Actions.LOGIN.REQUEST).mergeMap(action =>
    http
      .post(makeApiUrl('/user/signin'), null, action.playload)
      .then(response => {
        // TODO 从 header 拿
        saveAuthData(response);
        return Actions.LOGIN.success(response);
      })
      .catch(error => {
        if (error.name === 'NotAuthError') {
          return Actions.LOGIN.failure('Email or password not match!');
        }
        return Actions.LOGIN.failure(error.message);
      })
  );

export const SIGNUP_REQUEST = action$ =>
  action$.ofType(Actions.SIGNUP.REQUEST).mergeMap(action =>
    http
      .post(makeApiUrl('/user/signup'), null, action.playload)
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