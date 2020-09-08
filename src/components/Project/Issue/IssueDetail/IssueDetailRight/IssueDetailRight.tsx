import React, { createRef, useState } from 'react';
import { DateTimeSelectModal } from '../../../../DateTimeSelectModal/DateTimeSeletModal';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/Heading/SectionHeading/SectionHeading';
import { DetailRightField } from './DetailField/DetailRightField';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowsAltH,
  faPaperclip,
  faTags,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { MoveIssueModal } from '../MoveIssueModal/MoveIssueModal';
import './IssueDetailRight.scss';
import { IIssue } from '../../../../../typings/project-issue.typing';
import { ConfirmModal } from '../../../../Modal/ConfirmModal';
import { useDispatch } from 'react-redux';
import { deleteIssue } from '../../../../../redux/actions/issue.action';
import { AxiosDispatch } from '../../../../../typings/util.typing';
import { AttachmentPopup } from '../AttachmentPopup/AttachmentPopup';

interface InputProps {
  projectId: string;
  issue: IIssue;
  kanbanId?: string;
  onFieldChange: Function;
  onDetailChange: Function;
  closeModal: Function;
}

export function IssueDetailRight(props: InputProps) {
  const dispatch = useDispatch<AxiosDispatch>();
  const [deadlineSelectOpen, setDeadlineSelectOpen] = useState(false);
  const [moveIssueOpen, setMoveIssueOpen] = useState(false);
  const [deleteIssueOpen, setDeleteIssueOpen] = useState(false);
  const [attachmentOpen, setAttachmentOpen] = useState(false);
  const [attachmentPosition, setAttachmentPosition] = useState({ x: 0, y: 0 });
  const attachmentRef = createRef<HTMLDivElement>();

  const onAttachmentTriggerClick = () => {
    setAttachmentOpen(true);
    const rect = attachmentRef.current!.getBoundingClientRect();
    setAttachmentPosition({ x: rect.left, y: rect.top });
  };

  const onDeadlineOnclick = ({ startTime, deadline }) => {
    setDeadlineSelectOpen(false);
    props.onDetailChange({
      startTime: startTime,
      deadline: deadline,
    });
  };

  const onUpdateAssigneeId = (assigneeId: number) => {
    props.onFieldChange('assigneeId', assigneeId);
  };

  const onDeleteIssueConfirm = () => {
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
          title="开始/到期时间"
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
          icon={faTags}
          title="标签"
          onClick={() => {}}
        />

        <DetailRightField
          ref={attachmentRef}
          active={false}
          icon={faPaperclip}
          title="附件"
          onClick={onAttachmentTriggerClick}
        />

        <DetailRightField
          active={false}
          hoverStyle={{
            backgroundColor: '#f57b7b',
            color: 'white',
          }}
          icon={faTrashAlt}
          title="删除卡片"
          onClick={() => setDeleteIssueOpen(true)}
        />
      </div>

      <DateTimeSelectModal
        initialStartTime={props.issue.startTime}
        initialDeadline={props.issue.deadline}
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

      <AttachmentPopup
        issueId={props.issue.id}
        isOpen={attachmentOpen}
        position={attachmentPosition}
        onClose={() => setAttachmentOpen(false)}
      />
    </>
  );
}
