import { RootState } from '../index';
import { IColumn } from '../../../typings/kanban-column.typing';
import { IKanban } from '../../../typings/kanban.typing';
import { SelectOption } from '../../../typings/select.typing';

export function selectKanbanOptions(
  state: RootState,
  projectId: string
): SelectOption[] {
  const project = state.project.projectMap.get(projectId);
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
  const project = state.project.projectMap.get(projectId);
  if (!project || !project.get('kanbanIds')) {
    return [];
  }
  return project
    .get('kanbanIds')!
    .map((kanbanId: string) => {
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
  kanbanID: string
): IColumn[] {
  const kanban = state.project.kanbanMap[kanbanID];

  if (!kanban || !kanban.columnIds) {
    return [];
  }
  return kanban.columnIds
    .map((id) => state.project.columnMap[id])
    .filter((v) => !!v);
}
