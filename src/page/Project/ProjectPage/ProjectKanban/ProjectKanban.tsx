import './ProjectKanban.scss';

import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { RootState } from '../../../../redux/reducer';
import { Kanban } from './Kanban/Kanban';
import { KanbanHeaderBar } from './KanbanHeaderBar/KanbanHeaderBar';
import { useSelector } from 'react-redux';
import { selectProject } from '../../../../redux/reducer/selector/project.selector';

export function ProjectKanban() {
  const match = useRouteMatch<{ projectId: string; kanbanId: string }>();
  const { projectId, kanbanId } = match.params;

  const project = useSelector((state: RootState) =>
    selectProject(state, projectId)
  )!;

  if (!project) {
    return null;
  }

  return (
    <div className="ProjectKanban">
      <KanbanHeaderBar
        projectID={project!.get('id')}
        selectedKanbanId={kanbanId}
      />

      <div className="ProjectKanban--kanban-container">
        <Kanban kanbanId={kanbanId} projectId={projectId} />
      </div>
    </div>
  );
}
