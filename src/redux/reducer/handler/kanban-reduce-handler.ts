import { AxiosResponse } from 'axios';
import { IKanban, KanbanRecord } from '../../../typings/kanban.typing';
import { normalize } from 'normalizr';
import { KanbanDetailEntity } from '../../schema';
import { fromJS } from 'immutable';
import { ProjectState } from '../project.reducer';
import { AxiosSuccessAction, FSAction } from '../../actions/actions';

export function reduceKanbanDetail(
  state: ProjectState,
  action: AxiosSuccessAction
): ProjectState {
  const normalizedKanbanDetail: {
    entities: {
      Kanban: {
        [id: string]: IKanban;
      };
    };
    result: string[];
  } = normalize(action.payload.data, KanbanDetailEntity);
  const kanbanId = action.meta.previousAction.payload.kanbanId;
  const normalizedKanban: IKanban =
    normalizedKanbanDetail.entities.Kanban[kanbanId];

  return state.updateIn(['kanbanMap', kanbanId], (kanban: KanbanRecord) => {
    if (!kanban) {
      return fromJS(normalizedKanban);
    }
    return kanban.merge(fromJS(normalizedKanban));
  });
}
