import React, {useEffect} from 'react';
import { NoKanbanGuide } from '../ProjectKanban/NoKanbanGuide/NoKanbanGuide';
import { useRouteMatch } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { selectKanbans } from '../../../../redux/reducer/selector/kanban.selector';
import { KanbanOverviewPanel } from '../../../../components/KanbanOverviewPanel/KanbanOverviewPanel';
import { SectionHeading } from '../../../../widget/SectionHeading/SectionHeading';
import {getProjectKanbansRequest} from "../../../../redux/actions/kanban.action";

export function Overview() {
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectKanbansRequest({projectId}))
  }, [dispatch]);

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
              <SectionHeading>看板</SectionHeading>
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
