import { List } from 'immutable';

import { RootState } from '../';
import { KanbanColumnRecord } from '../../typings/kanban-column.typing';
import { ProjectIssueRecord } from '../../typings/project-issue.typing';

export function selectColumnCards(
  state: RootState,
  columnId: string
): List<ProjectIssueRecord> | null {
  const column: KanbanColumnRecord | undefined = state.project
    .get('columnMap')
    .get(columnId);

  if (!column) {
    return null;
  }

  return state.project
    .get('issueMap')
    .filter((value: ProjectIssueRecord) => {
      return value.get('columnId') === column!.get('id');
    })
    .toList();
}

export function findIssuePositionInColumn(
  state: RootState,
  issue: ProjectIssueRecord
): {
  targetIssue: ProjectIssueRecord;
  isBefore: boolean;
} {
  const sortedIssueMap = state.project
    .get('issueMap')
    .filter((value: ProjectIssueRecord, key: string) => {
      return value.get('columnId') === issue.get('columnId');
    })
    .sort((value1: ProjectIssueRecord, value2: ProjectIssueRecord) => {
      return value1.get('order') - value2.get('order');
    });

  const nextIssue = sortedIssueMap.find((value: ProjectIssueRecord) => {
    return value.get('order') > issue.get('order');
  });

  if (nextIssue) {
    return {
      targetIssue: nextIssue,
      isBefore: true
    };
  }
  const beforeIssue = sortedIssueMap
    .reverse()
    .find((value: ProjectIssueRecord) => {
      return value.get('order') < issue.get('order');
    });
  if (beforeIssue) {
    return {
      targetIssue: beforeIssue,
      isBefore: false
    };
  }
  throw new Error('Rank in valid issue seq');
}
