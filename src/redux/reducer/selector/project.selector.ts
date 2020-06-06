import { RootState } from '../index';
import { IProject } from '../../../typings/project.typing';

export function selectProject(
  rootState: RootState,
  projectID: string
): IProject | undefined {
  return rootState.project.projectMap[projectID];
}
