import './IssueDetail.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouterProps, withRouter } from 'react-router';
import { withToastManager } from 'react-toast-notifications';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import { AnyHTMLElement } from '@stencil/core/dist/declarations';

import {
  changeIssueDirect,
  getProjectIssueDetailRequest,
  updateProjectIssueDetailRequest
} from '../../../../actions/project/project-issue-detail.aciton';
import { RootState } from '../../../../reducers';
import { ProjectIssueRecord, ProjectIssueRecordFiled } from '../../../../typings/project-issue.typing';
import { AppButton } from '../../../widget/Button';
import { FormField } from '../../../widget/FormField/FormField';
import Input from '../../../widget/Input/Input';
import { AppTextArea } from '../../../widget/TextArea/TextArea';
import { IssueDetailBread } from './IssueDetailBread/IssueDetailBread';

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
  {
    formDirty: boolean;
  }
> {
  state = {
    formDirty: false
  };
  changedPartialIssue: any = {};

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
    return (value: any): void => {
      this.props.actions.changeIssueDirect(this.props.issueID, {
        [fieldName]: value
      });
      this.changedPartialIssue[fieldName] = value;
      this.setState({ formDirty: true });
    };
  };

  onUpdate = () => {
    this.props.actions.updateProjectIssueDetailRequest(
      {
        issueId: this.props.issueID,
        partialIssue: this.changedPartialIssue
      },
      {
        callback: (error: Error) => {
          if (!error) {
            this.changedPartialIssue = {};
            this.props.toastManager.add('更新成功', {
              appearance: 'success',
              autoDismiss: true
            });
          } else {
            this.props.toastManager.add('更新成功', {
              appearance: 'error',
              autoDismiss: true
            });
          }
        }
      }
    );

    this.setState({ formDirty: false });
  };

  render() {
    const { issue } = this.props;
    if (!issue) {
      return <div className="IssueDetail">loading</div>;
    }

    return (
      <div className="IssueDetail">
        <IssueDetailBread kanbanID={this.props.kanbanID} projectID={this.props.projectID} issueID={this.props.issueID} />
        <FormField>
          <Input size="large" value={issue.get('title')} onChange={this.onFieldChange('title')} />
        </FormField>

        <FormField name="描述：">
          <AppTextArea
            className="IssueDetail--content-textarea"
            value={issue.get('content') || ''}
            onChange={this.onFieldChange('content')}
          />
        </FormField>

        <div>
          <AppButton disabled={!this.state.formDirty} onClick={this.onUpdate} type="primary">
            更新
          </AppButton>
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
    issue: state.project.get('cardMap').get(props.issueID)
  };
};

export const IssueDetail = withRouter<ComponentProps>(
  connect(mapStateToProps, mapDispatchToProps)(withToastManager(IssueDetailComponent))
);
