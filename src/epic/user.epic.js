// @flow
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { getCachedUserId, saveJWT } from '../utils/auth';
import { ofType } from 'redux-observable';
import { mergeMap, tap, ignoreElements } from 'rxjs/operators';
import axios from 'axios';

export const UPDATE_USER_REQUEST = action$ =>
  action$.ofType(Actions.UPDATE_USER.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    return http
      .patch(makeApiUrl(`/user/${userId}`), null, action.payload, {
        withHeader: true
      })
      .then(responseAndHeader => {
        saveJWT(responseAndHeader.header.get('jwt-token'));
        return Actions.UPDATE_USER.success(responseAndHeader.body);
      })
      .catch(Actions.UPDATE_USER.failure);
  });

export const QUERY_USER_INFOMATION_WITH_EMAIL_REQUEST = action$ =>
  action$
    .ofType(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.REQUEST)
    .distinctUntilChanged()
    .debounceTime(500)
    .mergeMap(action => {
      return http
        .get(makeApiUrl(`/user/search`), action.payload)
        .then(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.success)
        .catch(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.failure);
    });

export const CHANGE_PASSWORD_REQUEST = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(Actions.CHANGE_PASSWORD.REQUEST),
    mergeMap(action => {
      return axios
        .post(makeApiUrl(`/user/update-password`), action.payload)
        .then(resp => Actions.CHANGE_PASSWORD.success(resp.data))
        .catch(Actions.CHANGE_PASSWORD.failure);
    })
  );
