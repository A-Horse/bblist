import { RootState } from '..';
import { ProjectIssueRecord } from '../../typings/project-issue.typing';

export function findIssuePositionInColumn(
  state: RootState,
  issue: ProjectIssueRecord
): {
  targetIssue: ProjectIssueRecord;
  isBefore: boolean;
} {
  const sortedIssueMap = state.project
    .get('cardMap')
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
  const beforeIssue = sortedIssueMap.reverse().find((value: ProjectIssueRecord) => {
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
