import { List } from 'immutable';

import { RootState } from '../';
import { KanbanColumnRecord } from '../../typings/kanban-column.typing';
import { ProjectIssueRecord } from '../../typings/project-issue.typing';

export function selectColumnCards(state: RootState, columnId: string): List<ProjectIssueRecord> | null {
  const column: KanbanColumnRecord | undefined = state.project.get('columnMap').get(columnId);

  if (!column) {
    return null;
  }

  return state.project
    .get('cardMap')
    .filter((value: ProjectIssueRecord) => {
      return value.get('columnId') === column!.get('id');
    })
    .toList();
}
