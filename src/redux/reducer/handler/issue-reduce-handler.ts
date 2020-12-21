import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';
import { queryProjectIssueDetailRequest } from '../../actions/project-issue-detail.action';
import { IIssue } from '../../../typings/project-issue.typing';
import uniq from 'lodash/uniq';
import { getProjectIssuesRequest, rankIssue } from '../../actions/issue.action';
import { normalize } from 'normalizr';
import remove from 'lodash/remove';
import { IssueList } from '../../schema';
import get from 'lodash/get';
import { reduceNormalizeMap } from '../util/util';

export function reduceUpdateProjectIssue(state: ProjectState, action: FSAction): ProjectState {
  const issueId = action.payload.id;

  let newColumnMap = state.columnMap;
  const columnId = action.payload.columnId;
  const oldColumnId = (state.issueMap[issueId] || {}).columnId;
  // change column issues ex.[1,2,3,4]
  if (columnId && newColumnMap[columnId]) {
    try {
      newColumnMap = {
        ...newColumnMap,
        [columnId]: {
          ...newColumnMap[columnId],
          issues: [...(newColumnMap[columnId].issues || []), action.payload.id],
        },
        [oldColumnId]: {
          ...newColumnMap[oldColumnId],
          issues: (() => {
            const issueIds = Array.from(newColumnMap[oldColumnId].issues || []);
            remove(issueIds, (id) => id === issueId);
            return issueIds;
          })(),
        },
      };
    } catch (e) {}
  }
  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [issueId]: {
        ...state.issueMap[issueId],
        ...action.payload,
      },
    },
    columnMap: newColumnMap,
  };
}

export function reduceIssueDetailSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof queryProjectIssueDetailRequest>>
): ProjectState {
  const issue: IIssue = action.payload.data;
  let columnMap = state.columnMap;
  if (issue.columnId) {
    columnMap = {
      ...columnMap,
      [issue.columnId]: {
        ...columnMap[issue.columnId],
        issues: uniq([...(get(columnMap[issue.columnId], 'issues') || ([] as any[])), issue.id]),
      },
    };
  }

  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [issue.id]: {
        ...state.issueMap[issue.id],
        ...issue,
      },
    },
    columnMap: columnMap,
  };
}

export function reduceProjectIssuesSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof getProjectIssuesRequest>>
): ProjectState {
  const normalizedData: {
    entities: {
      Issue: {
        [id: string]: IIssue;
      };
    };
    result: string[];
  } = normalize(action.payload.data, IssueList);
  return {
    ...state,
    issueMap: reduceNormalizeMap(state.issueMap, normalizedData.entities.Issue),
    allIssueId: normalizedData.result,
  };
}

export function reduceRankIssue(state: ProjectState, action: ReturnType<typeof rankIssue>): ProjectState {
  const payload = action.payload;
  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [payload.issue.id]: {
        ...state.issueMap[payload.issue.id],
        order: payload.targetIssue.order + (payload.isBefore ? -1 : 1),
      },
    },
  };
}

export function reduceRankIssueSuccess(state: ProjectState, action: AxiosSuccessAction): ProjectState {
  const changedIssueMap = (action.payload.data as Array<{
    id: string;
    order: number;
  }>).reduce((result, cur) => {
    return {
      ...result,
      [cur.id]: {
        ...state.issueMap[cur.id],
        order: cur.order,
      },
    };
  }, {});
  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      ...changedIssueMap,
    },
  };
}

export function reduceDeleteIssue(state: ProjectState, action: AxiosSuccessAction) {
  const issue = action.meta.previousAction.payload.issue;
  let updateColumnMap = {};
  if (issue.columnId && state.columnMap[issue.columnId]) {
    updateColumnMap[issue.columnId] = {
      ...state.columnMap[issue.columnId],
      issues: (() => {
        const newAllId = Array.from(state.columnMap[issue.columnId].issues!);
        remove(newAllId, (id) => id === issue.id);
        return newAllId;
      })(),
    };
  }

  return {
    ...state,
    columnMap: {
      ...state.columnMap,
      ...updateColumnMap,
    },
    allIssueId: (() => {
      const newAllId = Array.from(state.allIssueId);
      remove(newAllId, (id) => id === issue.id);
      return newAllId;
    })(),
  };
}
