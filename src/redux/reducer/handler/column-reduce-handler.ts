import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction } from '../../actions/actions';
import { queryKanbanColumns } from '../../actions/column.action';
import { normalize } from 'normalizr';
import { KanbanColumnEntityList } from '../../schema';
import { IColumn } from '../../../typings/kanban-column.typing';
import { reduceNormalizeMap } from '../util/util';
import { IProjectIssue } from '../../../typings/project-issue.typing';

export function reduceKanbanColumnsSuccess(
  state: ProjectState,
  action: AxiosSuccessAction<ReturnType<typeof queryKanbanColumns>>
): ProjectState {
  const kanbanId = action.meta.previousAction.meta.kanbanId;
  const normalizedData: {
    entities: {
      KanbanColumn: {
        [id: string]: IColumn;
      };
      ProjectIssue: {
        [id: string]: IProjectIssue;
      };
    };
    result: string[];
  } = normalize(action.payload.data, KanbanColumnEntityList);
  return {
    ...state,
    kanbanMap: {
      ...state.kanbanMap,
      [kanbanId]: {
        ...state.kanbanMap[kanbanId],
        columnIds: normalizedData.result,
      },
    },
    issueMap: reduceNormalizeMap(
      state.issueMap,
      normalizedData.entities.ProjectIssue
    ),
    columnMap: reduceNormalizeMap(
      state.columnMap,
      normalizedData.entities.KanbanColumn
    ),
  };
}
