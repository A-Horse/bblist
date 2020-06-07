import { fromJS } from 'immutable';
import { normalize } from 'normalizr';
import { AxiosSuccessAction, FSAction } from '../actions/actions';
import { GET_PROJECT_KANBANS_SUCCESS } from '../actions/kanban.action';
import {
  getProjectIssueDetailRequest,
  UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS,
} from '../actions/project-issue-detail.action';
import {
  CREATE_PROJECT_SUCCESS,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_SUCCESS,
} from '../actions/project.action';
import { ProjectEntityList } from '../schema';
import { IColumn } from '../../typings/kanban-column.typing';
import { IKanban } from '../../typings/kanban.typing';
import { IProjectIssue } from '../../typings/project-issue.typing';
import { IProject } from '../../typings/project.typing';
import {
  reduceKanbanDetailSuccess,
  reduceProjectKanban,
} from './handler/kanban-reduce-handler';
import { reduceKanbanColumnsSuccess } from './handler/column-reduce-handler';
import { reduceProjectDetailSuccess } from './handler/project-reduce-handler';
import {
  reduceIssueDetailSuccess,
  reduceUpdateProjectIssue,
} from './handler/issue-reduce-handler';

export type KanbanMap = { [id: string]: IKanban };
export type ColumnMap = { [id: string]: IColumn };
export type IssueMap = { [id: string]: IProjectIssue };
export type ProjectMap = { [id: string]: IProject };

export interface ProjectState {
  projectMap: ProjectMap;
  kanbanMap: KanbanMap;
  columnMap: ColumnMap;
  issueMap: IssueMap;
}

export function project(
  state: ProjectState = {
    projectMap: {},
    kanbanMap: {},
    columnMap: {},
    issueMap: fromJS({}),
  },
  action: FSAction | AxiosSuccessAction
) {
  switch (action.type) {
    case GET_PROJECT_SUCCESS: {
      const normalizedAllProject = normalize(action.payload, ProjectEntityList);
      return {
        ...state,
        projectMap: normalizedAllProject.entities.Project || {},
      };
    }

    case CREATE_PROJECT_SUCCESS:
      return state;

    case GET_PROJECT_DETAIL_SUCCESS: {
      return reduceProjectDetailSuccess(state, action);
    }

    case UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS: {
      return reduceUpdateProjectIssue(state, action);
    }

    case GET_PROJECT_KANBANS_SUCCESS: {
      return reduceProjectKanban(state, action);
    }

    case 'GET_PROJECT_KANBAN_DETAIL_SUCCESS': {
      return reduceKanbanDetailSuccess(state, action as AxiosSuccessAction);
    }

    case 'QUERY_KANBAN_COLUMNS_SUCCESS': {
      return reduceKanbanColumnsSuccess(state, action as AxiosSuccessAction);
    }

    case 'GET_PROJECT_ISSUE_DETAIL_SUCCESS': {
      return reduceIssueDetailSuccess(
        state,
        action as AxiosSuccessAction<
          ReturnType<typeof getProjectIssueDetailRequest>
        >
      );
    }

    // case GET_COLUMN_CARDS_SUCCESS: {
    //   const normalizedCards = normalize(action.payload.cards, ProjectCardList);
    //   return state.update('issueMap', (issueMap: IssueMap) => {
    //     return normalizedCards.result.reduce(
    //       (issueMapResult: IssueMap, cardId: string) => {
    //         return issueMapResult.update(cardId, (card: ProjectIssueRecord) => {
    //           if (!card) {
    //             return fromJS(normalizedCards.entities.ProjectIssue[cardId]);
    //           }
    //           return card.merge(
    //             fromJS(normalizedCards.entities.ProjectIssue[cardId])
    //           );
    //         });
    //       },
    //       issueMap
    //     );
    //   });
    // }

    // case RANK_PROJECT_CARD_IN_KANBAN_REQUEST:
    //   const rankProjectCardInKanbanInput: RankProjectCardInKanbanInput =
    //     action.payload;
    //   if (action.meta.temporary) {
    //     return state
    //       .updateIn(
    //         [
    //           'issueMap',
    //           rankProjectCardInKanbanInput.selectCard.get('id'),
    //           'order',
    //         ],
    //         (order: number) => {
    //           return rankProjectCardInKanbanInput.targetOrder;
    //         }
    //       )
    //       .updateIn(
    //         [
    //           'issueMap',
    //           rankProjectCardInKanbanInput.selectCard.get('id'),
    //           'columnID',
    //         ],
    //         (columnID: string) => {
    //           return rankProjectCardInKanbanInput.targetColumnId;
    //         }
    //       );
    //   }
    //   return state;

    // case RANK_PROJECT_CARD_IN_KANBAN_SUCCESS: {
    //   return state.update('issueMap', (issueMap: IssueMap) => {
    //     return action.payload.reduce(
    //       (
    //         innerCardMap: IssueMap,
    //         newOrder: { cardId: string; order: number }
    //       ) => {
    //         return innerCardMap.update(
    //           newOrder.cardId,
    //           (card: ProjectIssueRecord) => {
    //             return card.update('order', () => newOrder.order);
    //           }
    //         );
    //       },
    //       issueMap
    //     );
    //   });
    // }

    // case GET_PROJECT_ISSUES_REQUEST: {
    //   return state.update(
    //     'currentIssuePagination',
    //     (pagination: IssuePagination) => {
    //       if (!pagination) {
    //         return pagination;
    //       }
    //       return {
    //         ...pagination,
    //         loading: true,
    //       };
    //     }
    //   );
    // }

    // case GET_PROJECT_ISSUES_SUCCESS: {
    //   const normalizedCards = normalize(
    //     action.payload.cardPagtiton.data,
    //     ProjectCardList
    //   );
    //   return state
    //     .update('currentIssuePagination', () => {
    //       return {
    //         data: normalizedCards.result,
    //         pageNumber: action.payload.cardPagtiton.pageNumber,
    //         pageSize: action.payload.cardPagtiton.pageSize,
    //         total: action.payload.cardPagtiton.total,
    //         loading: false,
    //         projectId: action.payload.projectId,
    //       };
    //     })
    //     .update('issueMap', (issueMap: IssueMap) => {
    //       return normalizedCards.result.reduce(
    //         (issueMapResult: IssueMap, cardId: string) => {
    //           return issueMapResult.update(
    //             cardId,
    //             (card: ProjectIssueRecord) => {
    //               if (!card) {
    //                 return fromJS(
    //                   normalizedCards.entities.ProjectIssue[cardId]
    //                 );
    //               }
    //               return card.merge(
    //                 fromJS(normalizedCards.entities.ProjectIssue[cardId])
    //               );
    //             }
    //           );
    //         },
    //         issueMap
    //       );
    //     });
    // }

    // case CHANGE_ISSUE_DIRECT: {
    //   return state.updateIn(
    //     ['issueMap', action.payload.issueId],
    //     (innerIssue) => {
    //       if (!innerIssue) {
    //         return innerIssue;
    //       }
    //       return innerIssue.merge(fromJS(action.payload.partialIssue));
    //     }
    //   );
    // }

    default:
      return state;
  }
}
