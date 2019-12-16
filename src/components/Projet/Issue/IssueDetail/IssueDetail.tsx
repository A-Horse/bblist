import './IssueDetail.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, RouterProps, withRouter } from 'react-router';
import { withToastManager } from 'react-toast-notifications';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';
import { AnyHTMLElement } from '@stencil/core/dist/declarations';
import { changeIssueDirect, getProjectIssueDetailRequest, updateProjectIssueDetailRequest } from '../../../../actions/project/project-issue-detail.aciton';
import { RootState } from '../../../../reducers';
import { ProjectIssueRecord, ProjectIssueRecordFiled } from '../../../../typings/project-issue.typing';
import { AppButton } from '../../../widget/Button';
import { FormField } from '../../../widget/FormField/FormField';
import Input from '../../../widget/Input/Input';
import { AppTextArea } from '../../../widget/TextArea/TextArea';
import { IssueDetailBread } from './IssueDetailBread/IssueDetailBread';
import { IssueDetailLeft } from './IssueDetailLeft/IssueDetailLeft';

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

  onFieldBlur = (fieldName: ProjectIssueRecordFiled) => {
    return (value: any): void => {
      this.updateIssue({
        [fieldName]: value
      });
    };
  };

  onUpdate = () => {
    this.updateIssue(this.changedPartialIssue);
    this.setState({ formDirty: false });
    this.changedPartialIssue = {};
  };

  updateIssue = (changedPartialIssue: any) => {
    this.props.actions.updateProjectIssueDetailRequest(
      {
        issueId: this.props.issueID,
        partialIssue: changedPartialIssue
      },
      {
        callback: (error: Error) => {
          if (!error) {
            return this.props.toastManager.add('更新成功', { appearance: 'success', autoDismiss: true });
          }
          this.props.toastManager.add('更新失败', { appearance: 'error', autoDismiss: true });
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
        <IssueDetailBread kanbanID={this.props.kanbanID} projectID={this.props.projectID} issueID={this.props.issueID} />
        <FormField>
          <Input size="large" value={issue.get('title')} onBlur={this.onFieldBlur('title')} />
        </FormField>

        <FormField name="描述：">
          <AppTextArea className="IssueDetail--content-textarea" value={issue.get('content') || ''} onChange={this.onFieldChange('content')} />
        </FormField>

        <IssueDetailLeft />

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

export const IssueDetail = withRouter<ComponentProps>(connect(mapStateToProps, mapDispatchToProps)(withToastManager(IssueDetailComponent)));
