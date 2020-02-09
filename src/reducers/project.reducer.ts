import { fromJS, Map, Record } from 'immutable';
import { normalize } from 'normalizr';
import { FSAction } from '../actions/actions';
import {
  GET_PROJECT_KANBAN_DETAIL_SUCCESS,
  GET_PROJECT_KANBANS_SUCCESS
} from '../actions/project/kanban.action';
import {
  CHANGE_ISSUE_DIRECT,
  GET_PROJECT_ISSUE_DETAIL_SUCCESS,
  UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS
} from '../actions/project/project-issue-detail.action';
import {
  GET_COLUMN_CARDS_SUCCESS,
  GET_PROJECT_ISSUES_REQUEST,
  GET_PROJECT_ISSUES_SUCCESS,
  RANK_PROJECT_CARD_IN_KANBAN_REQUEST,
  RANK_PROJECT_CARD_IN_KANBAN_SUCCESS
} from '../actions/project/project-issue.action';
import {
  CREATE_PROJECT_SUCCESS,
  GET_PROJECT_DETAIL_SUCCESS,
  GET_PROJECT_SUCCESS
} from '../actions/project/project.action';
import {
  KanbanDetailEntity,
  KanbanEntityList,
  ProjectCardList,
  ProjectEntity,
  ProjectEntityList
} from '../schema';
import { Column, KanbanColumnRecord } from '../typings/kanban-column.typing';
import { Kanban, KanbanRecord } from '../typings/kanban.typing';
import { PaginationList } from '../typings/pagination.typing';
import {
  ProjectIssueRecord,
  RankProjectCardInKanbanInput
} from '../typings/project-issue.typing';
import { ProjectRecord } from '../typings/project.typing';

export type KanbanMap = Map<string, KanbanRecord>;
export type ColumnMap = Map<string, KanbanColumnRecord>;
export type CardMap = Map<string, ProjectIssueRecord>;

type IssuePagination =
  | (PaginationList<string> & { projectId: string; loading: boolean })
  | null;

export interface ProjectProp {
  projectMap: Map<string, ProjectRecord>;
  kanbanMap: KanbanMap;
  columnMap: ColumnMap;
  issueMap: CardMap;
  currentIssuePagination: IssuePagination;
}

export function project(
  state: Record<ProjectProp> = fromJS({
    projectMap: {},
    kanbanMap: {},
    columnMap: {},
    issueMap: {}
  }),
  action: FSAction
) {
  switch (action.type) {
    case GET_PROJECT_SUCCESS: {
      const normalizedAllProject = normalize(action.payload, ProjectEntityList);
      return state.update('projectMap', () =>
        fromJS(normalizedAllProject.entities.Project || {})
      );
    }

    case CREATE_PROJECT_SUCCESS:
      return state;

    case GET_PROJECT_DETAIL_SUCCESS: {
      const normalizedAddBoard = normalize(action.payload, ProjectEntity);
      return state.update('projectMap', projectMap =>
        projectMap.merge<ProjectRecord>(
          fromJS(normalizedAddBoard.entities.Project)
        )
      );
    }

    case UPDATE_PROJECT_ISSUE_DETAIL_SUCCESS: {
      return state.updateIn(
        ['issueMap', action.payload.id],
        (issue: ProjectIssueRecord) => {
          if (!issue) {
            return issue;
          }
          return issue.merge(fromJS(action.payload));
        }
      );
    }

    case GET_PROJECT_KANBANS_SUCCESS: {
      const normalizedKanbans: {
        entities: {
          Kanban: {
            [id: string]: Kanban;
          };
        };
        result: string[];
      } = normalize(action.payload.kanbans, KanbanEntityList);

      return state
        .updateIn(
          ['projectMap', action.payload.projectId],
          (project: ProjectRecord) => {
            if (!project) {
              return project;
            }
            return project.set('kanbans', normalizedKanbans.result);
          }
        )
        .update('kanbanMap', (kanbanMap: KanbanMap) => {
          return normalizedKanbans.result.reduce(
            (kanbanMapResult: KanbanMap, kanbanId: string) => {
              return kanbanMapResult.update(
                kanbanId,
                (kanban: KanbanRecord) => {
                  if (!kanban) {
                    return fromJS(normalizedKanbans.entities.Kanban[kanbanId]);
                  }
                  return kanban.merge(
                    fromJS(normalizedKanbans.entities.Kanban[kanbanId])
                  );
                }
              );
            },
            kanbanMap
          );
        });
    }

    case GET_PROJECT_KANBAN_DETAIL_SUCCESS: {
      const normalizedKanbanDetail: {
        entities: {
          Kanban: {
            [id: string]: Kanban;
          };
          KanbanColumn: {
            [id: string]: Column;
          };
        };
        result: string[];
      } = normalize(action.payload.kanban, KanbanDetailEntity);
      const normalizedKanban =
        normalizedKanbanDetail.entities.Kanban[action.payload.kanban.id];

      return state
        .updateIn(
          ['kanbanMap', action.payload.kanban.id],
          (kanban: KanbanRecord) => {
            if (!kanban) {
              return;
            }
            return kanban.merge(fromJS(normalizedKanban));
          }
        )
        .update('columnMap', (columnMap: ColumnMap) => {
          return normalizedKanban.columns!.reduce(
            (columnMapResult: ColumnMap, columnId: string) => {
              return columnMapResult.update(
                columnId,
                (column: KanbanColumnRecord) => {
                  if (!column) {
                    return fromJS(
                      normalizedKanbanDetail.entities.KanbanColumn[columnId]
                    );
                  }
                  return column.merge(
                    fromJS(
                      normalizedKanbanDetail.entities.KanbanColumn[columnId]
                    )
                  );
                }
              );
            },
            columnMap
          );
        });
    }

    case GET_COLUMN_CARDS_SUCCESS: {
      const normalizedCards = normalize(action.payload.cards, ProjectCardList);
      return state.update('issueMap', (issueMap: CardMap) => {
        return normalizedCards.result.reduce(
          (issueMapResult: CardMap, cardId: string) => {
            return issueMapResult.update(cardId, (card: ProjectIssueRecord) => {
              if (!card) {
                return fromJS(normalizedCards.entities.ProjectIssue[cardId]);
              }
              return card.merge(
                fromJS(normalizedCards.entities.ProjectIssue[cardId])
              );
            });
          },
          issueMap
        );
      });
    }

    case RANK_PROJECT_CARD_IN_KANBAN_REQUEST:
      const rankProjectCardInKanbanInput: RankProjectCardInKanbanInput =
        action.payload;
      if (action.meta.temporary) {
        return state
          .updateIn(
            [
              'issueMap',
              rankProjectCardInKanbanInput.selectCard.get('id'),
              'order'
            ],
            (order: number) => {
              return rankProjectCardInKanbanInput.targetOrder;
            }
          )
          .updateIn(
            [
              'issueMap',
              rankProjectCardInKanbanInput.selectCard.get('id'),
              'columnId'
            ],
            (columnId: string) => {
              return rankProjectCardInKanbanInput.targetColumnId;
            }
          );
      }
      return state;

    case RANK_PROJECT_CARD_IN_KANBAN_SUCCESS: {
      return state.update('issueMap', (issueMap: CardMap) => {
        return action.payload.reduce(
          (
            innerCardMap: CardMap,
            newOrder: { cardId: string; order: number }
          ) => {
            return innerCardMap.update(
              newOrder.cardId,
              (card: ProjectIssueRecord) => {
                return card.update('order', () => newOrder.order);
              }
            );
          },
          issueMap
        );
      });
    }

    case GET_PROJECT_ISSUES_REQUEST: {
      return state.update(
        'currentIssuePagination',
        (pagination: IssuePagination) => {
          if (!pagination) {
            return pagination;
          }
          return {
            ...pagination,
            loading: true
          };
        }
      );
    }

    case GET_PROJECT_ISSUES_SUCCESS: {
      const normalizedCards = normalize(
        action.payload.cardPagtiton.data,
        ProjectCardList
      );
      return state
        .update('currentIssuePagination', () => {
          return {
            data: normalizedCards.result,
            pageNumber: action.payload.cardPagtiton.pageNumber,
            pageSize: action.payload.cardPagtiton.pageSize,
            total: action.payload.cardPagtiton.total,
            loading: false,
            projectId: action.payload.projectId
          };
        })
        .update('issueMap', (issueMap: CardMap) => {
          return normalizedCards.result.reduce(
            (issueMapResult: CardMap, cardId: string) => {
              return issueMapResult.update(
                cardId,
                (card: ProjectIssueRecord) => {
                  if (!card) {
                    return fromJS(
                      normalizedCards.entities.ProjectIssue[cardId]
                    );
                  }
                  return card.merge(
                    fromJS(normalizedCards.entities.ProjectIssue[cardId])
                  );
                }
              );
            },
            issueMap
          );
        });
    }

    case CHANGE_ISSUE_DIRECT: {
      return state.updateIn(
        ['issueMap', action.payload.issueId],
        innerIssue => {
          if (!innerIssue) {
            return innerIssue;
          }
          return innerIssue.merge(fromJS(action.payload.partialIssue));
        }
      );
    }

    case GET_PROJECT_ISSUE_DETAIL_SUCCESS: {
      const issue: ProjectIssueRecord = fromJS(action.payload);
      return state.updateIn(['issueMap', issue.get('id')], innerIssue => {
        if (!innerIssue) {
          return issue;
        }
        return innerIssue.merge(issue);
      });
    }

    default:
      return state;
  }
}
