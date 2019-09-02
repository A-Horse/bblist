import { GET_COLUMN_CARDS_SUCCESS } from './../actions/project/kanban-card.action';
import { Kanban, KanbanRecord } from './../typings/kanban.typing';
import { FSAction } from './../actions/actions';
import {
  ProjectEntity,
  ProjectEntityList,
  KanbanEntityList,
  KanbanDetailEntity
} from './../schema';
import { ProjectRecord } from '../typings/project.typing';
import {
  GET_PROJCETS_SUCCESS,
  CREATE_PROJCET_SUCCESS,
  GET_PROJCET_DETAIL_SUCCESS
} from './../actions/project/project.action';
import { normalize } from 'normalizr';
import { fromJS, Record, Map } from 'immutable';
import {
  GET_PROJCET_KANBANS_SUCCESS,
  GET_PROJCET_KANBAN_DETAIL_SUCCESS
} from '../actions/project/kanban.action';
import { Column, KanbanColumnRecord } from '../typings/kanban-column.typing';

export type KanbanMap = Map<string, KanbanRecord>;
export type ColumnMap = Map<string, KanbanColumnRecord>;

export interface ProjectProp {
  projectMap: Map<string, ProjectRecord>;
  kanbanMap: KanbanMap;
  columnMap: ColumnMap;
}

export function project(
  state: Record<ProjectProp> = fromJS({
    projectMap: {},
    kanbanMap: {}
  }),
  action: FSAction
) {
  switch (action.type) {
    case GET_PROJCETS_SUCCESS: {
      const normalizedAllBoard = normalize(action.payload, ProjectEntityList);
      return state.update('projectMap', () => fromJS(normalizedAllBoard.entities.Project));
    }

    case CREATE_PROJCET_SUCCESS:
      return state;

    case GET_PROJCET_DETAIL_SUCCESS: {
      const normalizedAddBoard = normalize(action.payload, ProjectEntity);
      return state.update('projectMap', projectMap =>
        projectMap.merge(fromJS(normalizedAddBoard.entities.Project))
      );
    }

    case GET_PROJCET_KANBANS_SUCCESS: {
      const normalizedKanbans: {
        entities: {
          Kanban: {
            [id: string]: Kanban;
          };
        };
        result: string[];
      } = normalize(action.payload.kanbans, KanbanEntityList);

      return state
        .updateIn(['projectMap', action.payload.projectId], (project: ProjectRecord) => {
          return project.set('kanbans', normalizedKanbans.result);
        })
        .update('kanbanMap', (kanbanMap: KanbanMap) => {
          return normalizedKanbans.result.reduce((kanbanMapResult: KanbanMap, kanbanId: string) => {
            return kanbanMapResult.update(kanbanId, (kanban: KanbanRecord) => {
              if (!kanban) {
                return fromJS(normalizedKanbans.entities.Kanban[kanbanId]);
              }
              return kanban.merge(fromJS(normalizedKanbans.entities.Kanban[kanbanId]));
            });
          }, kanbanMap);
        });
    }

    case GET_PROJCET_KANBAN_DETAIL_SUCCESS: {
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
      const normalizedKanban = normalizedKanbanDetail.entities.Kanban[action.payload.kanban.id];

      return state
        .updateIn(['kanbanMap', action.payload.kanban.id], (kanban: KanbanRecord) => {
          if (!kanban) {
            return;
          }
          return kanban.merge(fromJS(normalizedKanban));
        })
        .update('columnMap', (columnMap: ColumnMap) => {
          return normalizedKanban.columns!.reduce(
            (columnMapResult: ColumnMap, columnId: string) => {
              return columnMapResult.update(columnId, (column: KanbanColumnRecord) => {
                if (!column) {
                  return fromJS(normalizedKanbanDetail.entities.KanbanColumn[columnId]);
                }
                return columnMap.merge(
                  fromJS(normalizedKanbanDetail.entities.KanbanColumn[columnId])
                );
              });
            },
            columnMap
          );
        });
    }

    case GET_COLUMN_CARDS_SUCCESS: {
      // return state.updateIn([kanbanId])
    }

    default:
      return state;
  }
}
