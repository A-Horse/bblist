import './IssueDetail.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { withToastManager } from 'react-toast-notifications';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch
} from 'redux';
import { AnyHTMLElement } from '@stencil/core/dist/declarations';
import {
  changeIssueDirect,
  getProjectIssueDetailRequest,
  updateProjectIssueDetailRequest
} from '../../../../actions/project/project-issue-detail.aciton';
import { RootState } from '../../../../reducers';
import {
  ProjectIssueRecord,
  ProjectIssueRecordFiled
} from '../../../../typings/project-issue.typing';
import { FormField } from '../../../widget/FormField/FormField';
import Input from '../../../widget/Input/Input';
import { AppTextArea } from '../../../widget/TextArea/TextArea';
import { IssueDetailBread } from './IssueDetailBread/IssueDetailBread';
import { IssueDetailLeft } from './IssueDetailLeft/IssueDetailLeft';
import { Deadline } from '../../../Deadline/Deadline';

export interface InputProps {
  issueID: string;
  kanbanID?: string;
  projectID: string;
}

export interface ReduxProps {
  issue?: ProjectIssueRecord;
  actions: ActionCreatorsMapObject;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

class IssueDetailComponent extends Component<
  ComponentProps &
    ReduxProps & {
      toastManager: AnyHTMLElement;
    },
  {}
> {
  state = {};
  changedFields = {};

  componentDidMount() {
    this.props.actions.getProjectIssueDetailRequest({
      issueId: this.props.issueID
    });
  }

  componentDidUpdate(prevProps: ComponentProps) {
    if (this.props.issueID !== prevProps.issueID) {
      this.props.actions.getProjectIssueDetailRequest({
        issueId: this.props.issueID
      });
    }
  }

  onFieldChange = (fieldName: ProjectIssueRecordFiled) => {
    const issue = this.props.issue;
    const changedFields = this.changedFields;
    return (value: any): void => {
      if (value !== issue!.get(fieldName)) {
        changedFields[fieldName] = true;
      }
      this.props.actions.changeIssueDirect(this.props.issueID, {
        [fieldName]: value
      });
    };
  };

  onFieldBlur = (fieldName: ProjectIssueRecordFiled) => {
    return (value: any): void => {
      this.updateIssue({
        [fieldName]: value
      });
    };
  };

  updateIssue = (changedPartialIssue: any) => {
    const didChangedPartialIssue = Object.keys(changedPartialIssue).reduce(
      (result: any, key: string) => {
        if (this.changedFields[key]) {
          result[key] = changedPartialIssue[key];
        }
        return result;
      },
      {}
    );
    if (Object.keys(didChangedPartialIssue).length === 0) {
      return;
    }
    this.props.actions.updateProjectIssueDetailRequest(
      {
        issueId: this.props.issueID,
        partialIssue: changedPartialIssue
      },
      {
        callback: (error: Error) => {
          if (!error) {
            return this.props.toastManager.add('更新成功', {
              appearance: 'success',
              autoDismiss: true
            });
          }
          this.props.toastManager.add('更新失败', {
            appearance: 'error',
            autoDismiss: true
          });
          Object.keys(didChangedPartialIssue).forEach((k: string) => {
            this.changedFields[k] = false;
          });
        }
      }
    );
  };

  render() {
    const { issue } = this.props;
    if (!issue) {
      return <div className="IssueDetail">loading</div>;
    }

    return (
      <div className="IssueDetail">
        <IssueDetailBread
          kanbanID={this.props.kanbanID}
          projectID={this.props.projectID}
          issueID={this.props.issueID}
        />

        <div>
          {issue.get('deadline') && (
            <Deadline deadline={issue.get('deadline')} />
          )}
        </div>

        <FormField>
          <Input
            size="large"
            value={issue.get('title')}
            onChange={this.onFieldChange('title')}
            onBlur={this.onFieldBlur('title')}
          />
        </FormField>

        <FormField name="描述：">
          <AppTextArea
            className="IssueDetail--content-textarea"
            value={issue.get('content') || ''}
            onChange={this.onFieldChange('content')}
            onBlur={this.onFieldBlur('content')}
          />
        </FormField>

        <IssueDetailLeft
          projectID={this.props.projectID}
          issue={issue}
          updateIssue={this.updateIssue}
        />
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
    issue: state.project.get('cardMap').get(props.issueID)
  };
};

export const IssueDetail = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withToastManager(IssueDetailComponent))
);
