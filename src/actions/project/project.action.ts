import {
  CreateProjectInput,
  Project,
  ProjectId,
  UploadProjectCoverInput
} from '../../typings/project.typing';
import { FSAction } from '../actions';

export const GET_PROJECT_REQUEST = 'GET_PROJECT_REQUEST';
export const GET_PROJECT_SUCCESS = 'GET_PROJECT_SUCCESS';
export const GET_PROJECT_FAILURE = 'GET_PROJECT_FAILURE';

export function getProjectsRequest(): FSAction {
  return {
    type: GET_PROJECT_REQUEST
  };
}

export function getProjectsSuccess(projects: Project[]): FSAction {
  return {
    type: GET_PROJECT_SUCCESS,
    payload: projects
  };
}

export function getProjectsFailure(): FSAction {
  return {
    type: GET_PROJECT_FAILURE,
    error: true
  };
}

export const GET_PROJECT_DETAIL_REQUEST = 'GET_PROJECT_DETAIL_REQUEST';
export const GET_PROJECT_DETAIL_SUCCESS = 'GET_PROJECT_DETAIL_SUCCESS';
export const GET_PROJECT_DETAIL_FAILURE = 'GET_PROJECT_DETAIL_FAILURE';

export function getProjectDetailRequest(projectId: string): FSAction {
  return {
    type: GET_PROJECT_DETAIL_REQUEST,
    payload: projectId
  };
}

export function getProjectDetailSuccess(project: Project): FSAction {
  return {
    type: GET_PROJECT_DETAIL_SUCCESS,
    payload: project
  };
}

export function getProjectDetailFailure(): FSAction {
  return {
    type: GET_PROJECT_DETAIL_FAILURE,
    error: true
  };
}

export const CREATE_PROJECT_REQUEST = 'CREATE_PROJECTS_REQUEST';
export const CREATE_PROJECT_SUCCESS = 'CREATE_PROJECTS_SUCCESS';
export const CREATE_PROJECT_FAILURE = 'CREATE_PROJECTS_FAILURE';

export function createProjectRequest(
  createProjectInput: CreateProjectInput
): FSAction {
  return {
    type: CREATE_PROJECT_REQUEST,
    payload: createProjectInput
  };
}

export function createProjectSuccess(projectId: ProjectId): FSAction {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: {
      projectId
    }
  };
}

export function createProjectFailure(): FSAction {
  return {
    type: CREATE_PROJECT_FAILURE,
    error: true
  };
}

export const UPLOAD_PROJECT_COVER_REQUEST = 'UPLOAD_PROJECT_COVER_REQUEST';
export const UPLOAD_PROJECT_COVER_SUCCESS = 'UPLOAD_PROJECT_COVER_SUCCESS';
export const UPLOAD_PROJECT_COVER_FAILURE = 'UPLOAD_PROJECT_COVER_FAILURE';

export function uploadProjectCoverRequest(
  uploadProjectCoverInput: UploadProjectCoverInput,
  meta: { callback }
): FSAction {
  return {
    type: UPLOAD_PROJECT_COVER_REQUEST,
    payload: uploadProjectCoverInput,
    meta
  };
}

export function uploadProjectCoverSuccess(projectID: string): FSAction {
  return {
    type: UPLOAD_PROJECT_COVER_SUCCESS,
    payload: {
      projectID
    }
  };
}

export function uploadProjectCoverFailure(error): FSAction {
  return {
    type: UPLOAD_PROJECT_COVER_FAILURE,
    payload: error,
    error: true
  };
}
