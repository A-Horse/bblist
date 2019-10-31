import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';

import './KanbanHeaderBar.scss';


interface InputProps {
    selectedKanbanId: string;
    projectId: string;
    onChange: Function;
}

export function KanbanHeaderBar({ selectedKanbanId }: InputProps) {
 
  const kanban: KanbanRecord | undefined = useSelector((state: RootState) => state.project.get('kanbanMap').get(selectedKanbanId))

  if (!kanban) {
    return null;
  }

  return (
    <div className="KanbanHeaderBar">
      <div className="KanbanHeaderBar--kanban-name">{kanban.get('name')}</div>


    </div>
  );
}
