import React, { Component } from 'react';
import { AppButton } from '../../../../widget/Button';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { ProjectIssueRecord } from '../../../../../typings/project-issue.typing';
import { AssigneeSelector } from '../../../../AssigneeSelector/AssigneeSelector';
import { SelectOption } from '../../../../../typings/select.typing';
import { SectionHeading } from '../../../../widget/SectionHeading/SectionHeading';

import './IssueDetailRight.scss';

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
    this.props.updateIssue({ deadline: value }, {
      force: true
    });
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

          <AppButton
            onClick={() => this.setState({ deadlineSelectOpen: true })}
          >
            到期时间
          </AppButton>
        </div>

        <DateTimeSelectDialog
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
