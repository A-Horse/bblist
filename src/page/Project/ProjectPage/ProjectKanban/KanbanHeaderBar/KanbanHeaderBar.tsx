import './KanbanHeaderBar.scss';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { AppButton } from '../../../../../widget/Button';
import { RootState } from '../../../../../redux/reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { KanbanSelectorModal } from '../../modals/KanbanSelectorModal/KanbanSelectorModal';
import { AppIcon } from '../../../../../widget/Icon';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { IssueCreatorModal } from '../../../../../components/creators/TaskCreator/IssueCreatorModal';

interface InputProps {
  selectedKanbanId: string;
  projectID: string;
  onChange: Function;
}

export function KanbanHeaderBar({
  projectID,
  selectedKanbanId,
  onChange,
}: InputProps) {
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

        <AppButton
          className="KanbanHeaderBar--kanban-select-button"
          backgroundColor="white"
          onClick={() => {
            setSelectKanbanToggle(true);
          }}
        >
          选择看板
        </AppButton>
      </div>

      <KanbanSelectorModal
        onChange={onChange}
        toggle={selectKanbanToggle}
        projectId={projectID}
        onClose={() => setSelectKanbanToggle(false)}
      />

      <IssueCreatorModal
        projectID={projectID}
        kanbanID={selectedKanbanId}
        modalVisible={issueCreatorToggle}
        closeModal={() => setIssueCreatorToggle(false)}
      />
    </div>
  );
}
