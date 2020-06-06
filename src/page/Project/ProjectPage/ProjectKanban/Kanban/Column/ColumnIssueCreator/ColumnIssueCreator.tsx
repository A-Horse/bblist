import React, { KeyboardEvent, useState } from 'react';
import './ColumnIssueCreator.scss';
import { AppIcon } from '../../../../../../../widget/Icon';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppTextArea } from '../../../../../../../widget/TextArea/TextArea';
import { AppButton } from '../../../../../../../widget/Button';
import { useDispatch } from 'react-redux';
import { createProjectCardRequest } from '../../../../../../../redux/actions/project-issue.action';
import { useToasts } from 'react-toast-notifications';

interface InputProps {
  columnId: string;
  kanbanId: string;
  projectId: string;
}

export function ColumnIssueCreator({
  projectId,
  kanbanId,
  columnId,
}: InputProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>('');
  const [showInput, setShowInput] = useState<boolean>(false);
  const { addToast } = useToasts();

  const clearState = () => {
    setTitle('');
    setShowInput(false);
  };

  const createIssue = () => {
    if (!title) {
      return;
    }
    dispatch(
      createProjectCardRequest({
        projectId: projectId,
        kanbanId: kanbanId,
        columnId: columnId,
        title: title,
      })
    );
  };

  const onKeyDown = (event: KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      createIssue();
    }
  };

  return (
    <div className="ColumnIssueCreator">
      {!showInput && (
        <div className="ColumnIssueCreator--toggle">
          <AppButton onClick={() => setShowInput(true)}>
            <AppIcon icon={faPlusCircle} />
            添加一张新卡片
          </AppButton>
        </div>
      )}

      {showInput && (
        <>
          <AppTextArea
            value={title}
            onChange={setTitle}
            onKeyDown={onKeyDown}
          />

          <div className="ColumnIssueCreator--operation">
            <AppButton type="primary" onClick={createIssue}>
              添加卡片
            </AppButton>
            <AppButton
              className="cancel-button"
              onClick={() => setShowInput(false)}
            >
              <AppIcon icon={faTimes} />
            </AppButton>
          </div>
        </>
      )}
    </div>
  );
}
