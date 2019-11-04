import './IssueDetail.scss';

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
import { withToastManager } from 'react-toast-notifications';
import { AnyHTMLElement } from '@stencil/core/dist/declarations';

export interface InputProps {
  issueId: string;
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
      this.setState({ formDirty: true });
    };
  };

  onUpdate = () => {
    this.props.toastManager.add('更新成功', {
      appearance: 'success',
      autoDismiss: true
    });

    this.props.actions.updateProjectIssueDetailRequest({
      issueId: this.props.issueId,
      partialIssue: this.changedPartialIssue
    });

    this.changedPartialIssue = {};

    this.setState({ formDirty: false });
  };

  render() {
    const { issue } = this.props;
    if (!issue) {
      return <div className="IssueDetail">loading</div>;
    }

    return (
      <div className="IssueDetail">
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
    issue: state.project.get('cardMap').get(props.issueId)
  };
};

export const IssueDetail = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withToastManager(IssueDetailComponent))
);
