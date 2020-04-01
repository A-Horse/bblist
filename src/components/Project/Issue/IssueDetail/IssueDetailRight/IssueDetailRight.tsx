import React, { Component } from 'react';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { ProjectIssueRecord } from '../../../../../typings/project-issue.typing';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../../widget/SectionHeading/SectionHeading';

import './IssueDetailRight.scss';
import { DetailRightField } from './DetailField/DetailField';
import { faClock } from '@fortawesome/free-regular-svg-icons';

interface InputProps {
  projectID: string;
  issue: ProjectIssueRecord;
  updateIssue: Function;
}

interface State {
  deadlineSelectOpen: boolean;
  assigneeUserID: number | undefined;
}

export class IssueDetailRight extends Component<InputProps, State> {
  state = {
    deadlineSelectOpen: false,
    assigneeUserID: 1
  };

  onDeadlineOnclick = (value: Date) => {
    this.setState({ deadlineSelectOpen: false });
    this.props.updateIssue(
      { deadline: value },
      {
        force: true
      }
    );
  };

  render() {
    return (
      <>
        <div className="IssueDetailRight">
          <div>
            <SectionHeading size="sm">经办人</SectionHeading>
            <AssigneeSelector
              projectID={this.props.projectID}
              selectedUserId={this.state.assigneeUserID}
              onChange={(option: SelectOption) =>
                this.setState({ assigneeUserID: option.value })
              }
            />
          </div>

          <DetailRightField
            active={!!this.props.issue.get('deadline')}
            icon={faClock}
            title="到期时间"
            onClick={() => this.setState({ deadlineSelectOpen: true })}
          />
        </div>

        <DateTimeSelectDialog
          deadline={this.props.issue.get('deadline')}
          isOpen={this.state.deadlineSelectOpen}
          onConfirm={this.onDeadlineOnclick}
          onCancel={() => {
            this.setState({ deadlineSelectOpen: false });
          }}
        />
      </>
    );
  }
}
