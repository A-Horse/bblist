import React, { useState } from 'react';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/Heading/SectionHeading/SectionHeading';
import { DetailRightField } from './DetailField/DetailRightField';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { MoveIssueModal } from '../MoveIssueModal/MoveIssueModal';
import './IssueDetailRight.scss';
import { IProjectIssue } from '../../../../../typings/project-issue.typing';
import { ConfirmModal } from '../../../../Modal/ConfirmModal';
import { useDispatch } from 'react-redux';
import { deleteIssue } from '../../../../../redux/actions/issue.action';
import {AxiosDispatch} from "../../../../../typings/util.typing";

interface InputProps {
  projectId: string;
  issue: IProjectIssue;
  kanbanId?: string;
  onFieldChange: Function;
    closeModal: Function;
}

export function IssueDetailRight(props: InputProps) {
  const dispatch = useDispatch<AxiosDispatch>();
  const [deadlineSelectOpen, setDeadlineSelectOpen] = useState(false);
  const [moveIssueOpen, setMoveIssueOpen] = useState(false);
  const [deleteIssueOpen, setDeleteIssueOpen] = useState(false);

  const onDeadlineOnclick = (value: Date) => {
    setDeadlineSelectOpen(false);
    props.onFieldChange('deadline', value);
  };

  const onUpdateAssigneeId = (assigneeId: number) => {
    props.onFieldChange('assigneeId', assigneeId);
  };

  const onDeleteIssueConfirm =  () => {
    dispatch(deleteIssue(props.issue)).then(() => {
        props.closeModal();
    });
  };

  return (
    <>
      <div className="IssueDetailRight">
        <div>
          <SectionHeading size="sm">经办人</SectionHeading>
          <AssigneeSelector
            projectId={props.projectId}
            selectedUserId={props.issue.assigneeId}
            onChange={(option: SelectOption) => {
              const id = option ? option.value : null;
              onUpdateAssigneeId(id);
            }}
          />
        </div>

        <DetailRightField
          active={!!props.issue.deadline}
          icon={faClock}
          title="到期时间"
          onClick={() => setDeadlineSelectOpen(true)}
        />

        <DetailRightField
          active={false}
          icon={faArrowsAltH}
          title="移动卡片"
          onClick={() => setMoveIssueOpen(true)}
        />

        <DetailRightField
          active={false}
          backgroundColor="rgba(255, 133, 116, 0.77)"
          style={{ color: 'white' }}
          icon={faArrowsAltH}
          title="删除卡片"
          onClick={() => setDeleteIssueOpen(true)}
        />
      </div>

      <DateTimeSelectDialog
        deadline={props.issue.deadline}
        isOpen={deadlineSelectOpen}
        onConfirm={onDeadlineOnclick}
        onCancel={() => {
          setDeadlineSelectOpen(false);
        }}
      />

      <MoveIssueModal
        issue={props.issue}
        visible={moveIssueOpen}
        onClose={() => setMoveIssueOpen(false)}
        kanbanId={props.kanbanId}
        projectId={props.projectId}
        onFieldChange={props.onFieldChange}
      />

      <ConfirmModal
        visible={deleteIssueOpen}
        onConfirm={onDeleteIssueConfirm}
        onCancel={() => setDeleteIssueOpen(false)}
        confirmTextTip="确定要删除卡片吗？"
        confirmButtonText="删除"
      />
    </>
  );
}
