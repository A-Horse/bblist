import { useSelector } from 'react-redux';
import React, { useState } from 'react';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';

import './KanbanHeaderBar.scss';
import { AppButton } from '../../../../../components/widget/Button';
import { KanbanSelectorModal } from '../../modals/KanbanSelectorModal/KanbanSelectorModal';

interface InputProps {
  selectedKanbanId: string;
  projectId: string;
  onChange: Function;
}

export function KanbanHeaderBar({ projectId, selectedKanbanId }: InputProps) {
  const kanban: KanbanRecord | undefined = useSelector((state: RootState) =>
    state.project.get('kanbanMap').get(selectedKanbanId)
  );

  const [selectKanbanToggle, setSelectKanbanToggle] = useState(false);

  if (!kanban) {
    return null;
  }

  return (
    <div className="KanbanHeaderBar">
      <span className="KanbanHeaderBar--kanban-name">{kanban.get('name')}</span>

      <AppButton
        type="dashed"
        className="KanbanHeaderBar--kanban-select-button"
        backgroundColor="white"
        onClick={() => {
          setSelectKanbanToggle(true);
        }}
      >
        选择看板
      </AppButton>

      <KanbanSelectorModal
        toggle={selectKanbanToggle}
        projectId={projectId}
        onClose={() => setSelectKanbanToggle(false)}
      />
    </div>
  );
}
