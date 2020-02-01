import React, { useState, KeyboardEvent, KeyboardEventHandler } from 'react';
import './ColumnIssueCreator.scss';
import { AppIcon } from '../../../../../../../components/widget/Icon';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppTextArea } from '../../../../../../../components/widget/TextArea/TextArea';
import { AppButton } from '../../../../../../../components/widget/Button';
import { useDispatch } from 'react-redux';
import { createProjectCardRequest } from '../../../../../../../actions/project/project-issue.action';
import { useToasts } from 'react-toast-notifications';

interface InputProps {
  columnID: string;
  kanbanID: string;
  projectID: string;
}

export function ColumnIssueCreator({
  projectID,
  kanbanID,
  columnID
}: InputProps) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const { addToast } = useToasts();

  const clearState = () => {
    setTitle('');
  };

  const createIssue = () => {
    if (!title) {
      return;
    }
    dispatch(
      createProjectCardRequest(
        {
          projectID,
          kanbanID,
          columnID,
          title: title
        },
        {
          callback: error => {
            if (error) {
              return addToast('创建失败', {
                appearance: 'error',
                autoDismiss: true
              });
            }
            clearState();
          }
        }
      )
    );
  };

  const onKeyDown = (event: KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      createIssue();
    }
  };

  return (
    <div>
      <div>
        <AppIcon icon={faPlusCircle} />

        <AppTextArea value={title} onChange={setTitle} onKeyDown={onKeyDown} />

        <div>
          <AppButton onClick={createIssue}>添加卡片</AppButton>
          <AppButton>
            <AppIcon icon={faTimes} />
          </AppButton>
        </div>
      </div>
    </div>
  );
}
