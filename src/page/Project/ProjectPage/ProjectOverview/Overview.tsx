import React from 'react';
import { NoKanbanGuide } from '../ProjectKanban/NoKanbanGuide/NoKanbanGuide';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { selectKanbans } from '../../../../redux/reducer/selector/kanban.selector';
import { KanbanOverviewPanel } from '../../../../components/KanbanOverviewPanel/KanbanOverviewPanel';

export function Overview() {
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;

  const kanbans = useSelector((state: RootState) =>
    selectKanbans(state, projectId)
  );
  const isLoadingKanbans = useSelector(
    (state: RootState) => state.project.loadingKanbans
  );
  const isShowNoKanbanGuide = !kanbans.length && !isLoadingKanbans;

  return (
    <div>
      {isShowNoKanbanGuide && <NoKanbanGuide projectId={projectId} />}

      {!isShowNoKanbanGuide && (
        <div>
          {kanbans.map((kanban) => (
            <KanbanOverviewPanel key={kanban.id} kanban={kanban} />
          ))}
        </div>
      )}
    </div>
  );
}
