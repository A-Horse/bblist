import React, { useState } from 'react';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { ProjectIssueRecord } from '../../../../../typings/project-issue.typing';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/SectionHeading/SectionHeading';
import { DetailRightField } from './DetailField/DetailRightField';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import './IssueDetailRight.scss';
import { useDispatch } from 'react-redux';
import { updateProjectIssueDetailRequest } from '../../../../../actions/project/project-issue-detail.action';


interface InputProps {
  projectID: string;
  issue: ProjectIssueRecord;
  updateIssue: Function;
}

export function IssueDetailRight(props: InputProps) {
  const dispatch = useDispatch();
  const [deadlineSelectOpen, setDeadlineSelectOpen] = useState(false);

  const onDeadlineOnclick = (value: Date) => {
    setDeadlineSelectOpen(false);
    props.updateIssue(
      { deadline: value },
      {
        force: true,
      }
    );
  };

  const onUpdateIssue = (assigneeId: number) => {
    dispatch(updateProjectIssueDetailRequest({
      issueId: props.issue.get('id'),
      partialIssue: {
        assigneeId
      }
    }, {
      callback: () => {

      }
    }))
  }

  return (
    <>
      <div className="IssueDetailRight">
        <div>
          <SectionHeading size="sm">经办人</SectionHeading>
          <AssigneeSelector
            projectID={props.projectID}
            selectedUserId={props.issue.get('assigneeId')}
            onChange={
              (option: SelectOption) => {
                onUpdateIssue(option.value)
              }
            }
          />
        </div>

        <DetailRightField
          active={!!props.issue.get('deadline')}
          icon={faClock}
          title="到期时间"
          onClick={() => setDeadlineSelectOpen(true)}
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
    </>
  );
}
