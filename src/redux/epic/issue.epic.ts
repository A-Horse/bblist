import { Observable } from 'rxjs';
import { ofType } from 'redux-observable';

import { debounceTime, mergeMap } from 'rxjs/operators';
import axios from 'axios';
import { makeApiUrl } from '../../utils/api';
import { updateIssueDetailRequest } from '../actions/project-issue-detail.action';

export const UPDATE_ISSUE_DETAIL_EPIC = (action$: Observable<ReturnType<typeof updateIssueDetailRequest>>) =>
  action$.pipe(
    ofType('UPDATE_ISSUE_DETAIL'),
    debounceTime(1000),
    mergeMap((action: ReturnType<typeof updateIssueDetailRequest>) => {
      return axios
        .put(makeApiUrl(`/issue/${action.payload.id}`), action.payload)
        .then(() => ({ type: 'IGNORE' }))
        .catch(() => ({ type: 'IGNORE' }));
    })
  );
