import { RootState } from '../index';
import { IProject } from '../../../typings/project.typing';

export function selectProject(rootState: RootState, projectID: string): IProject | undefined {
  return rootState.project.projectMap[projectID];
}

export function selectAllProject(rootState: RootState): IProject[] {
  return Object.values(rootState.project.projectMap)
}