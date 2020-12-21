import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { AxiosSuccessAction } from '../actions/actions';
import { GET_PROJECT_KANBANS_SUCCESS } from '../actions/kanban.action';
import {
  CREATE_PROJECT_SUCCESS,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_SUCCESS,
  updateProjectRequest,
} from '../actions/project.action';
import { ProjectEntityList } from '../schema';
import { IColumn } from '../../typings/kanban-column.typing';
import { IKanban } from '../../typings/kanban.typing';
import { IIssue } from '../../typings/project-issue.typing';
import { IProject } from '../../typings/project.typing';
import {
  reduceGetKanbansSuccess,
  reduceKanbanDetailSuccess,
  reduceKanbanRecentlyIssuesSuccess,
  reduceProjectKanban,
  reduceProjectKanbanSuccess,
} from './handler/kanban-reduce-handler';
import { reduceKanbanColumnsSuccess } from './handler/column-reduce-handler';
import {
  reduceProjectDetailSuccess,
  reduceUpdateProject,
} from './handler/project-reduce-handler';
import {
  reduceDeleteIssue,
  reduceIssueDetailSuccess,
  reduceProjectIssuesSuccess,
  reduceRankIssue,
  reduceRankIssueSuccess,
  reduceUpdateProjectIssue,
} from './handler/issue-reduce-handler';

export type KanbanMap = { [id: string]: IKanban };
export type ColumnMap = { [id: string]: IColumn };
export type IssueMap = { [id: string]: IIssue };
export type ProjectMap = { [id: string]: IProject };

export interface ProjectState {
  projectMap: ProjectMap;
  kanbanMap: KanbanMap;
  columnMap: ColumnMap;
  issueMap: IssueMap;
  allIssueId: string[];
  loadingKanbans: boolean;
  loadingKanban: boolean;
}

export function project(
  state: ProjectState = {
    projectMap: {},
    kanbanMap: {},
    columnMap: {},
    issueMap: fromJS({}),
    allIssueId: [],
    loadingKanbans: false,
    loadingKanban: false,
  },
  action
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

    case 'GET_PROJECT_KANBANS_REQUEST': {
      return reduceProjectKanban(state, action);
    }

    case GET_PROJECT_KANBANS_SUCCESS: {
      return reduceProjectKanbanSuccess(state, action);
    }

    case 'GET_PROJECT_KANBAN_DETAIL': {
      return { ...state, loadingKanban: true };
    }

    case 'GET_PROJECT_KANBAN_DETAIL_SUCCESS': {
      return reduceKanbanDetailSuccess(state, action as AxiosSuccessAction);
    }

    case 'GET_PROJECT_KANBAN_DETAIL_FAILURE': {
      return { ...state, loadingKanban: false };
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
      return reduceRankIssue(state, action);
    }

    case 'DELETE_ISSUE_SUCCESS': {
      return reduceDeleteIssue(state, action);
    }

    case 'RANK_ISSUE_SUCCESS': {
      return reduceRankIssueSuccess(state, action);
    }

    case 'QUERY_KANBAN_RECENTLY_ISSUES_SUCCESS': {
      return reduceKanbanRecentlyIssuesSuccess(state, action);
    }

    case 'GET_USER_KANBANS_SUCCESS': {
      return reduceGetKanbansSuccess(state, action);
    }

    default:
      return state;
  }
}
