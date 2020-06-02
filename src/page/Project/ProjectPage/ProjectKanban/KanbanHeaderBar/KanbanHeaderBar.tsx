import './KanbanHeaderBar.scss';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppButton } from '../../../../../widget/Button';
import { RootState } from '../../../../../redux/reducer';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { AppIcon } from '../../../../../widget/Icon';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IssueCreatorModal } from '../../../../../components/creators/TaskCreator/IssueCreatorModal';

interface InputProps {
  selectedKanbanId: string;
  projectID: string;
}

export function KanbanHeaderBar({ projectID, selectedKanbanId }: InputProps) {
  const kanban: KanbanRecord | undefined = useSelector((state: RootState) =>
    state.project.get('kanbanMap').get(selectedKanbanId)
  );

  const [selectKanbanToggle, setSelectKanbanToggle] = useState(false);
  const [issueCreatorToggle, setIssueCreatorToggle] = useState(false);

  return (
    <div className="KanbanHeaderBar">
      {kanban && (
        <span className="KanbanHeaderBar--kanban-name">
          {kanban.get('name')}
        </span>
      )}

      <div className="KanbanHeaderBar--operation">
        <AppButton
          backgroundColor="white"
          onClick={() => {
            setIssueCreatorToggle(true);
          }}
        >
          <AppIcon icon={faPlusCircle} />
          新建问题
        </AppButton>
      </div>

      <IssueCreatorModal
        projectID={projectID}
        kanbanID={selectedKanbanId}
        modalVisible={issueCreatorToggle}
        closeModal={() => setIssueCreatorToggle(false)}
      />
    </div>
  );
}
