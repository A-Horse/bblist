import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { AxiosSuccessAction, FSAction } from '../actions/actions';
import { GET_PROJECT_KANBANS_SUCCESS } from '../actions/kanban.action';
import { getProjectIssueDetailRequest } from '../actions/project-issue-detail.action';
import {
  CREATE_PROJECT_SUCCESS,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_SUCCESS,
  updateProjectRequest,
} from '../actions/project.action';
import { ProjectEntityList } from '../schema';
import { IColumn } from '../../typings/kanban-column.typing';
import { IKanban } from '../../typings/kanban.typing';
import { IProjectIssue } from '../../typings/project-issue.typing';
import { IProject } from '../../typings/project.typing';
import {
  reduceKanbanDetailSuccess,
  reduceProjectKanban,
} from './handler/kanban-reduce-handler';
import { reduceKanbanColumnsSuccess } from './handler/column-reduce-handler';
import {
  reduceProjectDetailSuccess,
  reduceUpdateProject,
} from './handler/project-reduce-handler';
import {
  reduceIssueDetailSuccess,
  reduceProjectIssuesSuccess,
  reduceUpdateProjectIssue,
} from './handler/issue-reduce-handler';
import { rankIssue } from "../actions/issue.action";

export type KanbanMap = { [id: string]: IKanban };
export type ColumnMap = { [id: string]: IColumn };
export type IssueMap = { [id: string]: IProjectIssue };
export type ProjectMap = { [id: string]: IProject };

export interface ProjectState {
  projectMap: ProjectMap;
  kanbanMap: KanbanMap;
  columnMap: ColumnMap;
  issueMap: IssueMap;
  allIssueId: string[];
}

export function project(
  state: ProjectState = {
    projectMap: {},
    kanbanMap: {},
    columnMap: {},
    issueMap: fromJS({}),
    allIssueId: [],
  },
  action: FSAction | AxiosSuccessAction
) {
  switch (action.type) {
    case GET_PROJECT_SUCCESS: {
      const normalizedAllProject = normalize(action.payload, ProjectEntityList);
      return {
        ...state,
        projectMap: normalizedAllProject.entities.Project || {},
      };
    }

    case CREATE_PROJECT_SUCCESS:
      return state;

    case GET_PROJECT_DETAIL_SUCCESS: {
      return reduceProjectDetailSuccess(state, action);
    }

    case `UPDATE_PROJECT`: {
      return reduceUpdateProject(
        state,
        action as ReturnType<typeof updateProjectRequest>
      );
    }

    case 'UPDATE_ISSUE_DETAIL': {
      return reduceUpdateProjectIssue(state, action);
    }

    case GET_PROJECT_KANBANS_SUCCESS: {
      return reduceProjectKanban(state, action);
    }

    case 'GET_PROJECT_KANBAN_DETAIL_SUCCESS': {
      return reduceKanbanDetailSuccess(state, action as AxiosSuccessAction);
    }

    case 'QUERY_KANBAN_COLUMNS_SUCCESS': {
      return reduceKanbanColumnsSuccess(state, action as AxiosSuccessAction);
    }

    case 'GET_PROJECT_ISSUE_DETAIL_SUCCESS': {
      return reduceIssueDetailSuccess(state, action as AxiosSuccessAction);
    }

    case 'GET_PROJECT_ISSUES_SUCCESS': {
      return reduceProjectIssuesSuccess(state, action as AxiosSuccessAction);
    }

    case 'RANK_ISSUE': {
      const payload = (<ReturnType<typeof rankIssue>>action).payload
      return {
        ...state,
        issueMap: {
          ...state.issueMap,
          [payload.issue.id]: {
            ...state.issueMap[payload.issue.id],
            order: payload.targetIssue.order + (payload.isBefore ? -1 : 1)
          }
        }
      }
    }

    default:
      return state;
  }
}
