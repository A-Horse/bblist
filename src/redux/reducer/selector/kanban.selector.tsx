import { RootState } from '../index';
import {
  IColumn,
  IColumnNormalized,
} from '../../../typings/kanban-column.typing';
import { IKanban } from '../../../typings/kanban.typing';
import { SelectOption } from '../../../typings/select.typing';

export function selectKanbanOptions(
  state: RootState,
  projectId: string
): SelectOption[] {
  const project = state.project.projectMap[projectId];
  if (!project) {
    return [];
  }
  return selectKanbans(state, projectId).map((kanban: IKanban) => {
    return {
      value: kanban.id,
      label: kanban.name,
    };
  });
}

export function selectKanbans(state: RootState, projectId: string): IKanban[] {
  const project = state.project.projectMap[projectId];
  if (!project || !project.kanbanIds) {
    return [];
  }
  return project
    .kanbanIds!.map((kanbanId: string) => {
      const kanban = state.project.kanbanMap[kanbanId];
      if (!kanban) {
        return kanban;
      }
      kanban.columns = (kanban.columnIds || [])
        .map((id) => state.project.columnMap[id])
        .filter((v) => !!v);
      return kanban;
    })
    .filter((kanban) => !!kanban);
}

export function selectKanbanColumns(
  state: RootState,
  kanbanId: string
): IColumn[] {
  return Object.values(state.project.columnMap)
    .filter((column) => column.kanbanId === kanbanId)
    .map((column) => {
      return {
        ...column,
        issues: ((column as IColumnNormalized).issues || []).map(
          (id) => state.project.issueMap[id]
        ),
      };
    });
}
