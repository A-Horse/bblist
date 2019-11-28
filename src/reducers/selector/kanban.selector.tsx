import { List } from 'immutable';

import { RootState } from '../';
import { KanbanColumnRecord } from '../../typings/kanban-column.typing';
import { KanbanRecord } from '../../typings/kanban.typing';
import { ProjectRecord } from '../../typings/project.typing';
import { SelectOption } from '../../typings/select.typing';
import { KanbanMap } from '../project.reducer';

export function getKanbanOptions(project: ProjectRecord, kanbanMap: KanbanMap): SelectOption[] {
  return getKanbans(project, kanbanMap).map((kanban: KanbanRecord) => {
    return {
      value: kanban.get('id'),
      label: kanban.get('name')
    };
  });
}

export function getKanbans(project: ProjectRecord | undefined, kanbanMap: KanbanMap): KanbanRecord[] {
  if (!project || !project.get('kanbans')) {
    return [];
  }
  return project
    .get('kanbans')!
    .map((kanbanId: string) => {
      return kanbanMap.get(kanbanId) as KanbanRecord;
    })
    .filter(kanban => !!kanban);
}

export function selectKanbanColumns(state: RootState, kanbanId: string): List<KanbanColumnRecord> | null {
  const kanban = state.project.get('kanbanMap').get(kanbanId);

  if (!kanban || !kanban.get('columns')) {
    return null;
  }
  return kanban
    .get('columns')!
    .map((columnId: string) => {
      return state.project.get('columnMap').get(columnId);
    })
    .filter(column => !!column) as List<KanbanColumnRecord>;
}
