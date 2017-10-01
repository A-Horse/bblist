import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { getCachedUserId, saveJWT } from 'utils/auth';

export const UPDATE_USER_REQUEST = action$ =>
  action$.ofType(Actions.UPDATE_USER.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    return http
      .patch(makeApiUrl(`/user/${userId}`), null, action.playload, {
        withHeader: true
      })
      .then(responseAndHeader => {
        saveJWT(responseAndHeader.header.get('jwts-token'));
        return Actions.UPDATE_USER.success(responseAndHeader.body);
      })
      .catch(Actions.UPDATE_USER.failure);
  });

export const QUERY_USER_INFOMATION_WITH_EMAIL_REQUEST = action$ =>
  action$.ofType(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.REQUEST).mergeMap(action => {
    return http
      .patch(makeApiUrl(`/user/search`), action.playload)
      .then(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.success)
      .catch(Actions.QUERY_USER_INFOMATION_WITH_EMAIL.failure);
  });
