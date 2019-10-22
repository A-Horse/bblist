import './CardDetail.scss';

import React, { Component } from 'react';
import { withRouter, RouterProps, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectIssueRecord, ProjectIssueRecordFiled } from '../../../../typings/project-issue.typing';
import Input from '../../../widget/Input/Input';
import {
  getProjectIssueDetailRequest,
  updateProjectIssueDetailRequest,
  changeIssueDirect
} from '../../../../actions/project/project-issue-detail.aciton';
import { AppTextArea } from '../../../widget/TextArea/TextArea';
import { AppButton } from '../../../widget/Button';
import { FormField } from '../../../widget/FormField/FormField';

export interface InputProps {
  issueId: string;
}

export interface ReduxProps {
  issue?: ProjectIssueRecord;
  actions: ActionCreatorsMapObject;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

class IssueDetailComponent extends Component<ComponentProps & ReduxProps> {
  changedPartialIssue: any = {};

  componentDidMount() {
    this.props.actions.getProjectIssueDetailRequest({
      issueId: this.props.issueId
    });
  }

  componentDidUpdate(prevProps: ComponentProps) {
    if (this.props.issueId !== prevProps.issueId) {
      this.props.actions.getProjectIssueDetailRequest({
        issueId: this.props.issueId
      });
    }
  }

  onFieldChange = (fieldName: ProjectIssueRecordFiled) => {
    return (value: any): void => {
      this.props.actions.changeIssueDirect(this.props.issueId, {
        [fieldName]: value
      });
      this.changedPartialIssue[fieldName] = value;
    };
  };

  onDone = () => {
    this.props.actions.updateProjectIssueDetailRequest({
      issueId: this.props.issueId,
      partialIssue: this.changedPartialIssue
    });
    this.changedPartialIssue = {};
  };

  render() {
    const { issue } = this.props;
    if (!issue) {
      return <div>loading</div>;
    }

    return (
      <div className="IssueDetail">
        <FormField>
          <Input value={issue.get('title')} onChange={this.onFieldChange('title')} />
        </FormField>

        <FormField name="描述">
          <AppTextArea value={issue.get('content') || ''} onChange={this.onFieldChange('content')} />
        </FormField>

        <div>
          <AppButton onClick={this.onDone}>Done</AppButton>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectIssueDetailRequest: getProjectIssueDetailRequest,
        updateProjectIssueDetailRequest: updateProjectIssueDetailRequest,
        changeIssueDirect: changeIssueDirect
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  return {
    issue: state.project.get('cardMap').get(props.issueId)
  };
};

export const IssueDetail = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssueDetailComponent)
);
