import { ProjectRecord } from '../../typings/project.typing';
import { KanbanRecord } from '../../typings/kanban.typing';
import { SelectOption } from '../../typings/select.typing';

export function getKanbanOptions(project: ProjectRecord): SelectOption[] {
  if (!project.get('kanbans')) {
    return [];
  }
  return project
    .get('kanbans')!
    .map((kanban: KanbanRecord) => {
      return {
        value: kanban.get('id'),
        label: kanban.get('name')
      };
    })
    .toArray();
}
