import { List } from 'immutable';

import { RootState } from '../index';
import { IColumn } from '../../../typings/kanban-column.typing';
import { IProjectIssue } from '../../../typings/project-issue.typing';

export function selectColumnIssues(
  state: RootState,
  columnId: string
): IProjectIssue[] {
  return Object.values(state.project.issueMap).filter(
    (issue: IProjectIssue) => {
      return issue.columnId === columnId;
    }
  );
}
//
// export function findIssuePositionInColumn(
//   state: RootState,
//   issue: ProjectIssueRecord
// ): {
//   targetIssue: ProjectIssueRecord;
//   isBefore: boolean;
// } {
//   const sortedIssueMap = state.project
//     .get('issueMap')
//     .filter((value: ProjectIssueRecord, key: string) => {
//       return value.get('columnID') === issue.get('columnID');
//     })
//     .sort((value1: ProjectIssueRecord, value2: ProjectIssueRecord) => {
//       return value1.get('order') - value2.get('order');
//     });
//
//   const nextIssue = sortedIssueMap.find((value: ProjectIssueRecord) => {
//     return value.get('order') > issue.get('order');
//   });
//
//   if (nextIssue) {
//     return {
//       targetIssue: nextIssue,
//       isBefore: true,
//     };
//   }
//   const beforeIssue = sortedIssueMap
//     .reverse()
//     .find((value: ProjectIssueRecord) => {
//       return value.get('order') < issue.get('order');
//     });
//   if (beforeIssue) {
//     return {
//       targetIssue: beforeIssue,
//       isBefore: false,
//     };
//   }
//   throw new Error('Rank in valid issue seq');
// }
