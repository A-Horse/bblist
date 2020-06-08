import React, { useState } from 'react';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/SectionHeading/SectionHeading';
import { DetailRightField } from './DetailField/DetailRightField';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { MoveIssueModal } from '../MoveIssueModal/MoveIssueModal';
import './IssueDetailRight.scss';
import { IProjectIssue } from '../../../../../typings/project-issue.typing';

interface InputProps {
  projectID: string;
  issue: IProjectIssue;
  kanbanID?: string;
  onFieldChange: Function;
}

export function IssueDetailRight(props: InputProps) {
  const dispatch = useDispatch();
  const [deadlineSelectOpen, setDeadlineSelectOpen] = useState(false);
  const [moveIssueOpen, setMoveIssueOpen] = useState(false);

  const onDeadlineOnclick = (value: Date) => {
    setDeadlineSelectOpen(false);
    props.onFieldChange('deadline', value);
  };

  const onUpdateAssigneeID = (assigneeID: number) => {};

  return (
    <>
      <div className="IssueDetailRight">
        <div>
          <SectionHeading size="sm">经办人</SectionHeading>
          <AssigneeSelector
            projectID={props.projectID}
            selectedUserId={props.issue.assigneeId}
            onChange={(option: SelectOption) => {
              const id = option ? option.value : null;
              onUpdateAssigneeID(id);
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
        kanbanID={props.kanbanID}
        projectID={props.projectID}
      />
    </>
  );
}
