import React from 'react';
import { NoKanbanGuide } from '../KanbanTab/NoKanbanGuide/NoKanbanGuide';
import { useRouteMatch } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { selectKanbans } from '../../../../redux/reducer/selector/kanban.selector';
import { KanbanOverviewPanel } from './KanbanOverviewPanel/KanbanOverviewPanel';
import {TabHeading} from "../../../../widget/Heading/TabHeading";

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
      {isLoadingKanbans && <div>loading</div>}

      {!isLoadingKanbans && <div>
        {isShowNoKanbanGuide && <NoKanbanGuide projectId={projectId} />}

        {!isShowNoKanbanGuide && (
            <div
                style={{
                  padding: 20,
                }}
            >
              <TabHeading>看板概况</TabHeading>
              <div>
                {kanbans.map((kanban) => (
                    <KanbanOverviewPanel key={kanban.id} kanban={kanban} />
                ))}
              </div>
            </div>
        )}
      </div>}


    </div>
  );
}
