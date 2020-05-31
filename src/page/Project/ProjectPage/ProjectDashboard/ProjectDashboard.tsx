import React from 'react';
import { NoKanbanGuide } from '../ProjectKanban/NoKanbanGuide/NoKanbanGuide';
import { useRouteMatch } from 'react-router-dom';

export function ProjectDashboard() {
  const match = useRouteMatch<{ projectId: string }>();
  const projectId = match.params.projectId;
  return (
    <div>
      <NoKanbanGuide projectId={projectId} />
    </div>
  );
}
