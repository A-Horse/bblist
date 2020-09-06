import './ProjectKanban.scss';

import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, useRouteMatch } from 'react-router-dom';
import { RootState } from '../../../../redux/reducer';
import { Kanban } from './Kanban/Kanban';
import { KanbanHeaderBar } from './KanbanHeaderBar/KanbanHeaderBar';
import { useDispatch, useSelector } from 'react-redux';
import { selectProject } from '../../../../redux/reducer/selector/project.selector';
import { NoColumnGuide } from './Kanban/NoColumnGuide';
import { selectKanbanColumns } from '../../../../redux/reducer/selector/kanban.selector';
import { KanbanSettingModal } from '../../KanbanSettingModal/KanbanSettingModal';
import { getProjectKanbanDetailRequest } from '../../../../redux/actions/kanban.action';
import { queryKanbanColumns } from '../../../../redux/actions/column.action';
import { parseQueryParams } from '../../../../utils/url.util';
import { IssueDetailModal } from '../../../../components/Project/Issue/IssueDetail/IssueDetailModal';

export function ProjectKanban() {
  const dispatch = useDispatch();
  const [settingModalVisible, setSettingModalVisible] = useState(false);

  const match = useRouteMatch<{ projectId: string; kanbanId: string }>();
  const { projectId, kanbanId } = match.params;

  const project = useSelector((state: RootState) =>
    selectProject(state, projectId)
  )!;

  const columns = useSelector((state: RootState) =>
    selectKanbanColumns(state, kanbanId)
  );
  const kanbanLoading = useSelector((state: RootState) => state.project.loadingKanban);

  useEffect(() => {
    dispatch(
      getProjectKanbanDetailRequest({
        kanbanId: kanbanId,
      })
    );
    dispatch(queryKanbanColumns(kanbanId));
  }, [dispatch, kanbanId]);

  if (!project) {
    return null;
  }

  return (
    <div className="ProjectKanban">
      <KanbanHeaderBar
        projectId={project!.id}
        selectedKanbanId={kanbanId}
        onOpenSetting={() => setSettingModalVisible(true)}
      />


      <div className="ProjectKanban--kanban-container">
        {!!columns.length && (
          <Kanban kanbanId={kanbanId} projectId={projectId} />
        )}

        {!columns.length && !kanbanLoading && (
          <NoColumnGuide openSetting={() => setSettingModalVisible(true)} />
        )}
      </div>

      <KanbanSettingModal
        kanbanId={kanbanId}
        toggle={settingModalVisible}
        onClose={() => setSettingModalVisible(false)}
      />
    </div>
  );
}
