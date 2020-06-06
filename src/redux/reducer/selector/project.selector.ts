import { ProjectRecord } from '../../../typings/project.typing';
import { RootState } from '../index';

export function selectProject(
  rootState: RootState,
  projectID: string
): ProjectRecord | undefined {
  return rootState.project.projectMap.get(projectID);
}
