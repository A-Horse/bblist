import axios, { AxiosResponse } from 'axios';
import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import Actions, { FSAction } from '../actions/actions';
import { makeApiUrl } from '../utils/api';
import { Observable } from 'rxjs';
import { CREATE_PROJCET_REQUEST, createProjectFailure, createProjectSuccess } from '../actions/project/project.action';
import { ProjectId } from '../typings/project.typing';
import { GET_ALL_USERS_REQUEST, getAllUsersSuccess } from '../actions/user/user.action';
import {UserShow} from "../typings/user/user.typing";

export const GET_ALL_USERS_FN = (action$: Observable<FSAction>) =>
  action$.pipe(
    ofType(GET_ALL_USERS_REQUEST),
    mergeMap((action: FSAction) => {
      return axios
        .get(makeApiUrl(`/project`), action.payload)
        .then((result: AxiosResponse<UserShow[]>) => getAllUsersSuccess(result.data))
        .catch(getAllUsersSuccess);
    })
  );
