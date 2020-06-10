import React, { useState } from 'react';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/SectionHeading/SectionHeading';
import { DetailRightField } from './DetailField/DetailRightField';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { MoveIssueModal } from '../MoveIssueModal/MoveIssueModal';
import './IssueDetailRight.scss';
import { IProjectIssue } from '../../../../../typings/project-issue.typing';

interface InputProps {
  projectId: string;
  issue: IProjectIssue;
  kanbanId?: string;
  onFieldChange: Function;
}

export function IssueDetailRight(props: InputProps) {
  const [deadlineSelectOpen, setDeadlineSelectOpen] = useState(false);
  const [moveIssueOpen, setMoveIssueOpen] = useState(false);

  const onDeadlineOnclick = (value: Date) => {
    setDeadlineSelectOpen(false);
    props.onFieldChange('deadline', value);
  };

  const onUpdateAssigneeId = (assigneeId: number) => {
    props.onFieldChange('assigneeId', assigneeId);
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
    </>
  );
}
