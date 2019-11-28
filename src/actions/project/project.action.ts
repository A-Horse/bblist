import {
    CreateProjectInput, Project, ProjectId, UploadProjectCoverInput
} from '../../typings/project.typing';
import { FSAction } from '../actions';

export const GET_PROJCETS_REQUEST = 'GET_PROJCETS_REQUEST';
export const GET_PROJCETS_SUCCESS = 'GET_PROJCETS_SUCCESS';
export const GET_PROJCETS_FAILURE = 'GET_PROJCETS_FAILURE';

export function getProjectsRequest(): FSAction {
  return {
    type: GET_PROJCETS_REQUEST
  };
}

export function getProjectsSuccess(projects: Project[]): FSAction {
  return {
    type: GET_PROJCETS_SUCCESS,
    payload: projects
  };
}

export function getProjectsFailure(): FSAction {
  return {
    type: GET_PROJCETS_FAILURE,
    error: true
  };
}

export const GET_PROJCET_DETAIL_REQUEST = 'GET_PROJCET_DETAIL_REQUEST';
export const GET_PROJCET_DETAIL_SUCCESS = 'GET_PROJCET_DETAIL_SUCCESS';
export const GET_PROJCET_DETAIL_FAILURE = 'GET_PROJCET_DETAIL_FAILURE';

export function getProjectDetailRequest(projectId: string): FSAction {
  return {
    type: GET_PROJCET_DETAIL_REQUEST,
    payload: projectId
  };
}

export function getProjectDetailSuccess(project: Project): FSAction {
  return {
    type: GET_PROJCET_DETAIL_SUCCESS,
    payload: project
  };
}

export function getProjectDetailFailure(): FSAction {
  return {
    type: GET_PROJCET_DETAIL_FAILURE,
    error: true
  };
}

export const CREATE_PROJCET_REQUEST = 'CREATE_PROJCETS_REQUEST';
export const CREATE_PROJCET_SUCCESS = 'CREATE_PROJCETS_SUCCESS';
export const CREATE_PROJCET_FAILURE = 'CREATE_PROJCETS_FAILURE';

export function createProjectRequest(createProjectInput: CreateProjectInput): FSAction {
  return {
    type: CREATE_PROJCET_REQUEST,
    payload: createProjectInput
  };
}

export function createProjectSuccess(projectId: ProjectId): FSAction {
  return {
    type: CREATE_PROJCET_SUCCESS,
    payload: {
      projectId
    }
  };
}

export function createProjectFailure(): FSAction {
  return {
    type: CREATE_PROJCET_FAILURE,
    error: true
  };
}

export const UPLOAD_PROJCET_COVER_REQUEST = 'UPLOAD_PROJCET_COVER_REQUEST';
export const UPLOAD_PROJCET_COVER_SUCCESS = 'UPLOAD_PROJCET_COVER_SUCCESS';
export const UPLOAD_PROJCET_COVER_FAILURE = 'UPLOAD_PROJCET_COVER_FAILURE';

export function uploadProjectCoverRequest(uploadProjectCoverInput: UploadProjectCoverInput): FSAction {
  return {
    type: UPLOAD_PROJCET_COVER_REQUEST,
    payload: uploadProjectCoverInput
  };
}

export function uploadProjectCoverSuccess(): FSAction {
  return {
    type: UPLOAD_PROJCET_COVER_SUCCESS
  };
}

export function uploadProjectCoverFailure(): FSAction {
  return {
    type: UPLOAD_PROJCET_COVER_FAILURE,
    error: true
  };
}
