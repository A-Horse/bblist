import './KanbanHeaderBar.scss';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppButton } from '../../../../../components/widget/Button';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { KanbanSelectorModal } from '../../modals/KanbanSelectorModal/KanbanSelectorModal';

interface InputProps {
  selectedKanbanId: string;
  projectId: string;
  onChange: Function;
}

export function KanbanHeaderBar({
  projectId,
  selectedKanbanId,
  onChange
}: InputProps) {
  const kanban: KanbanRecord | undefined = useSelector((state: RootState) =>
    state.project.get('kanbanMap').get(selectedKanbanId)
  );

  const [selectKanbanToggle, setSelectKanbanToggle] = useState(false);

  return (
    <div className="KanbanHeaderBar">
      {kanban && (
        <span className="KanbanHeaderBar--kanban-name">
          {kanban.get('name')}
        </span>
      )}

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
        onChange={onChange}
        toggle={selectKanbanToggle}
        projectId={projectId}
        onClose={() => setSelectKanbanToggle(false)}
      />
    </div>
  );
}
