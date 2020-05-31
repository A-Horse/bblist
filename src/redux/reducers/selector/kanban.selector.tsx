import { List } from 'immutable';

import { RootState } from '../index';
import { KanbanColumnRecord } from '../../../typings/kanban-column.typing';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { SelectOption } from '../../../typings/select.typing';

export function selectKanbanOptions(
  state: RootState,
  projectId: string
): SelectOption[] {
  const project = state.project.get('projectMap').get(projectId);
  if (!project) {
    return [];
  }
  return selectKanbans(state, projectId).map((kanban: KanbanRecord) => {
    return {
      value: kanban.get('id'),
      label: kanban.get('name'),
    };
  });
}

export function selectKanbans(
  state: RootState,
  projectId: string
): KanbanRecord[] {
  const project = state.project.get('projectMap').get(projectId);
  if (!project || !project.get('kanbanIds')) {
    return [];
  }
  return project
    .get('kanbanIds')!
    .map((kanbanId: string) => {
      return state.project.get('kanbanMap').get(kanbanId)!;
    })
    .filter((kanban) => !!kanban);
}

export function selectKanbanColumns(
  state: RootState,
  kanbanID: string
): List<KanbanColumnRecord> | null {
  const kanban = state.project.get('kanbanMap').get(kanbanID);

  if (!kanban || !kanban.get('columns')) {
    return null;
  }
  return kanban
    .get('columns')!
    .map((columnID: string) => {
      return state.project.get('columnMap').get(columnID);
    })
    .filter((column) => !!column) as List<KanbanColumnRecord>;
}
