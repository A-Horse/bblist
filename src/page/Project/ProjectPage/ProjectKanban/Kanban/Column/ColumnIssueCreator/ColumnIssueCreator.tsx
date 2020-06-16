import React, { KeyboardEvent, useState } from 'react';
import './ColumnIssueCreator.scss';
import { AppIcon } from '../../../../../../../widget/Icon';
import { faPlusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AppTextArea } from '../../../../../../../widget/TextArea/TextArea';
import { AppButton } from '../../../../../../../widget/Button';
import { useDispatch } from 'react-redux';
import { createIssueRequest } from '../../../../../../../redux/actions/issue.action';
import { useToasts } from 'react-toast-notifications';
import { AxiosSuccessAction } from '../../../../../../../redux/actions/actions';
import { AxiosDispatch } from '../../../../../../../typings/util.typing';
import { getProjectIssueDetailRequest } from '../../../../../../../redux/actions/project-issue-detail.action';

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
  const dispatch = useDispatch<AxiosDispatch>();
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
      createIssueRequest({
        projectId: projectId,
        kanbanId: kanbanId,
        columnId: columnId,
        title: title,
      })
    ).then((action: AxiosSuccessAction) => {
      dispatch(
        getProjectIssueDetailRequest({
          issueId: action.payload.data,
        })
      ).then();
      clearState();
    });
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
            <AppButton className="cancel-button" onClick={clearState}>
              <AppIcon icon={faTimes} />
            </AppButton>
          </div>
        </>
      )}
    </div>
  );
}
