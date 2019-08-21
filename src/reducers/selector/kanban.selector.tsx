import { ProjectRecord } from '../../typings/project.typing';
import { KanbanRecord } from '../../typings/kanban.typing';
import { SelectOption } from '../../typings/select.typing';
import { KanbanMap } from '../project.reducer';

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
