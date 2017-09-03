import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Actions from '../actions/actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import fetch from 'isomorphic-fetch';
import { makeApiUrl } from '../utils/api';
import { http } from './helper';
import { handleResponse, handleResponseWithoutJson } from 'utils/http-handle';

export const IDENTIFY_REQUEST = action$ => {
  return action$.ofType(Actions.IDENTIFY.REQUEST).mergeMap(action => {
    return http
      .get(makeApiUrl('/user/identify'))
      .then(handleResponse)
      .then(Actions.IDENTIFY.success)
      .catch(Actions.IDENTIFY.failure);
  });
};
