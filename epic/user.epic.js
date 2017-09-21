import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/catch';
import Actions from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { http } from '../services/http';
import { getCachedUserId } from 'utils/auth';

export const UPDATE_USER_REQUEST = action$ =>
  action$.ofType(Actions.UPDATE_USER.REQUEST).mergeMap(action => {
    const userId = getCachedUserId();
    return http
      .patch(makeApiUrl(`/user/${userId}`), null, action.playload)
      .then(Actions.UPDATE_USER.success)
      .catch(Actions.UPDATE_USER.failure);
  });

/* export const UPDATE_USER_SUCCESS = action$ =>
 *   action$.ofType(Actions.UPDATE_USER.SUCCESS).mapTo(Actions.IDENTIFY.request());*/
