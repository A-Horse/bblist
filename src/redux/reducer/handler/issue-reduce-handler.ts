import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';
import { getProjectIssueDetailRequest } from '../../actions/project-issue-detail.action';
import { IProjectIssue } from '../../../typings/project-issue.typing';
import uniq from 'lodash/uniq';
import { getProjectIssuesRequest, rankIssue } from '../../actions/issue.action';
import { IColumn } from '../../../typings/kanban-column.typing';
import { normalize } from 'normalizr';
import { KanbanColumnEntityList, ProjectIssueList } from '../../schema';
import { reduceNormalizeMap } from '../util/util';

export function reduceUpdateProjectIssue(
  state: ProjectState,
  action: FSAction
): ProjectState {
  const issueId = action.payload.id;
  return {
    ...state,
    issueMap: {
      ...state.issueMap,
      [issueId]: {
        ...state.issueMap[issueId],
        ...action.payload,
      },
    },
  };
}

export function reduceIssueDetailSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof getProjectIssueDetailRequest>>
): ProjectState {
  const issue: IProjectIssue = action.payload.data;
  let columnMap = state.columnMap;
  if (issue.columnId) {
    columnMap = {
      ...columnMap,
      [issue.columnId]: {
        ...columnMap[issue.columnId],
        issues: uniq([...(columnMap[issue.columnId].issues as any), issue.id]),
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
      ProjectIssue: {
        [id: string]: IProjectIssue;
      };
    };
    result: string[];
  } = normalize(action.payload.data, ProjectIssueList);
  return {
    ...state,
    issueMap: reduceNormalizeMap(
      state.issueMap,
      normalizedData.entities.ProjectIssue
    ),
    allIssueId: normalizedData.result,
  };
}

export function reduceRankIssue(
  state: ProjectState,
  action: ReturnType<typeof rankIssue>
): ProjectState {
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

export function reduceRankIssueSuccess(
  state: ProjectState,
  action: AxiosSuccessAction
): ProjectState {
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
