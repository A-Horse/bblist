import { CreateKanbanInput, IKanban } from '../../typings/kanban.typing';
import { FSAction } from './actions';

export const GET_PROJECT_KANBANS_REQUEST = 'GET_PROJECT_KANBANS_REQUEST';
export const GET_PROJECT_KANBANS_SUCCESS = 'GET_PROJECT_KANBANS_SUCCESS';
export const GET_PROJECT_KANBANS_FAILURE = 'GET_PROJECT_KANBANS_FAILURE';

export function getProjectKanbansRequest(payload: {
  projectId: string;
}): FSAction {
  return {
    type: GET_PROJECT_KANBANS_REQUEST,
    payload,
  };
}

export function getProjectKanbansSuccess(payload: {
  projectId: string;
  kanbans: IKanban[];
}): FSAction {
  return {
    type: GET_PROJECT_KANBANS_SUCCESS,
    payload,
  };
}

export function getProjectKanbansFailure(): FSAction {
  return {
    type: GET_PROJECT_KANBANS_FAILURE,
    error: true,
  };
}

export function getProjectKanbanDetailRequest(payload: {
  kanbanId: string;
}): FSAction {
  return {
    type: 'GET_PROJECT_KANBAN_DETAIL',
    payload: {
      request: {
        url: `/kanban/${payload.kanbanId}`,
        data: payload,
      },
    },
  };
}

export const CREATE_KANBAN_REQUEST = 'CREATE_KANBAN_REQUEST';
export const CREATE_KANBAN_SUCCESS = 'CREATE_KANBAN_SUCCESS';
export const CREATE_KANBAN_FAILURE = 'CREATE_KANBAN_FAILURE';

export function createKanbanRequest(
  createKanbanInput: CreateKanbanInput,
  meta: {
    noKanbanExist?: boolean;
  }
) {
  return {
    type: CREATE_KANBAN_REQUEST,
    payload: createKanbanInput,
    meta,
  };
}

export function createKanbanSuccess(
  id: string,
  projectID: string,
  noKanbanExist: boolean
): FSAction {
  return {
    type: CREATE_KANBAN_SUCCESS,
    payload: id,
    meta: {
      projectID,
      noKanbanExist,
    },
  };
}

export function createKanbanFailure(): FSAction {
  return {
    type: CREATE_KANBAN_FAILURE,
    error: true,
  };
}

export function queryKanbanRecentlyIssues(kanbanId: string) {
  return {
    type: 'QUERY_KANBAN_RECENTLY_ISSUES',
    payload: {
      request: {
        url: `/kanban/${kanbanId}/recently-issues`,
      }
    },
    meta: {
      kanbanId
    }
  }
}
