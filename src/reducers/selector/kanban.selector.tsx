import { ProjectRecord } from '../../typings/project.typing';
import { KanbanRecord } from '../../typings/kanban.typing';
import { SelectOption } from '../../typings/select.typing';
import { KanbanMap } from '../project.reducer';
import { RootState } from '..';
import { List } from 'immutable';
import { KanbanColumnRecord } from '../../typings/kanban-column.typing';

export function getKanbanOptions(project: ProjectRecord, kanbanMap: KanbanMap): SelectOption[] {
  if (!project.get('kanbanIds')) {
    return [];
  }
  return project
    .get('kanbanIds')!
    .map((kanbanId: string) => {
      return kanbanMap.get(kanbanId) as KanbanRecord;
    })
    .filter(kanban => !!kanban)
    .map((kanban: KanbanRecord) => {
      return {
        value: kanban.get('id'),
        label: kanban.get('name')
      };
    });
}

export function selectKanbanColumns(state: RootState, kanbanId: string): List<KanbanColumnRecord> | null {
  const kanban = state.project.get('kanbanMap').get(kanbanId);

  if (!kanban) {
    return null;
  }
  return kanban.get('columns')!.map(() => {
    
  });
}
