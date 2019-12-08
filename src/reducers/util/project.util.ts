import { ProjectRecord } from './../../typings/project.typing';
import {RootState} from "../index";


export function getProject(rootState: RootState, projectID: string): ProjectRecord | undefined {
    return rootState.project.get('projectMap').get(projectID);
}