import axios from 'axios';
import { ofType } from 'redux-observable';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

import Actions from '../actions/actions';
import { http } from '../services/http';
import { makeApiUrl } from '../utils/api';
import { getCachedUserId, saveJWT } from '../utils/auth';

export const UPDATE_USER_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.UPDATE_USER.REQUEST),
    mergeMap((action: any) => {
      const userId = getCachedUserId();
      return http
        .patch(makeApiUrl(`/user/${userId}`), null, action.payload, {
          withHeader: true
        })
        .then((responseAndHeader: any) => {
          saveJWT(responseAndHeader.header.get('jwt-token'));
          return Actions.UPDATE_USER.success(responseAndHeader.body);
        })
        .catch(Actions.UPDATE_USER.failure);
    })
  );

export const QUERY_USER_INFOMATION_WITH_EMAIL_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.REQUEST),
    distinctUntilChanged(),
    debounceTime(500),
    mergeMap((action: any) => {
      return http
        .get(makeApiUrl(`/user/search`), action.payload)
        .then(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.success)
        .catch(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.failure);
    })
  );

export const CHANGE_PASSWORD_REQUEST = (action$: any) =>
  action$.pipe(
    ofType(Actions.CHANGE_PASSWORD.REQUEST),
    mergeMap((action: any) => {
      return axios
        .post(makeApiUrl(`/user/update-password`), action.payload)
        .then(resp => Actions.CHANGE_PASSWORD.success(resp.data))
        .catch(Actions.CHANGE_PASSWORD.failure);
    })
  );
