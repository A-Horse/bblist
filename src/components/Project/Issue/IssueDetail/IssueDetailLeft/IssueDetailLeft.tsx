import React, { Component } from 'react';
import { AppButton } from '../../../../widget/AppButton';
import { DateTimeSelectDialog } from '../../../../DateTimeSelectDialog/DateTimeSeletDialog';
import { ProjectIssueRecord } from '../../../../../typings/project-issue.typing';

interface InputProps {
  issue: ProjectIssueRecord;
  updateIssue: Function;
}

interface State {
  deadlineSelectOpen: boolean;
}

export class IssueDetailLeft extends Component<InputProps, State> {
  state = {
    deadlineSelectOpen: false
  };

  componentDidMount() {}

  onDeadlineOnclick = (value: Date) => {
    this.props.updateIssue({deadline: value});
  };

  render() {
    return (
      <>
        <div className="IssueDetailLeft">
          <AppButton onClick={() => this.setState({ deadlineSelectOpen: true })}>到期时间</AppButton>
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