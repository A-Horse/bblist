import React, { useState } from 'react';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { ProjectIssueRecord } from '../../../../../typings/project-issue.typing';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/SectionHeading/SectionHeading';
import { DetailRightField } from './DetailField/DetailRightField';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useDispatch } from 'react-redux';
import { updateProjectIssueDetailRequest } from '../../../../../redux/actions/project-issue-detail.action';
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons';
import { MoveIssueModal } from '../MoveIssueModal/MoveIssueModal';
import './IssueDetailRight.scss';

interface InputProps {
  projectID: string;
  issue: ProjectIssueRecord;
  kanbanID?: string;
  updateIssue: Function;
}

export function IssueDetailRight(props: InputProps) {
  const dispatch = useDispatch();
  const [deadlineSelectOpen, setDeadlineSelectOpen] = useState(false);
  const [moveIssueOpen, setMoveIssueOpen] = useState(false);

  const onDeadlineOnclick = (value: Date) => {
    setDeadlineSelectOpen(false);
    props.updateIssue(
      { deadline: value },
      {
        force: true,
      }
    );
  };

  const onUpdateAssigneeID = (assigneeID: number) => {
    dispatch(
      updateProjectIssueDetailRequest(
        {
          issueId: props.issue.get('id'),
          partialIssue: {
            assigneeId: assigneeID,
          },
        },
        {
          callback: () => {},
        }
      )
    );
  };

  return (
    <>
      <div className="IssueDetailRight">
        <div>
          <SectionHeading size="sm">经办人</SectionHeading>
          <AssigneeSelector
            projectID={props.projectID}
            selectedUserId={props.issue.get('assigneeId')}
            onChange={(option: SelectOption) => {
              const id = option ? option.value : null;
              onUpdateAssigneeID(id);
            }}
          />
        </div>

        <DetailRightField
          active={!!props.issue.get('deadline')}
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
        deadline={props.issue.get('deadline')}
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
