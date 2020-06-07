import './IssueDetail.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import {
  changeIssueDirect,
  getProjectIssueDetailRequest,
  updateProjectIssueDetailRequest,
} from '../../../../redux/actions/project-issue-detail.action';
import { RootState } from '../../../../redux/reducer';
import { FormField } from '../../../../widget/FormField/FormField';
import { Input } from '../../../../widget/Input/Input';
import { AppTextArea } from '../../../../widget/TextArea/TextArea';
import { IssueDetailRight } from './IssueDetailRight/IssueDetailRight';
import { Deadline } from '../../../Deadline/Deadline';
import { IssueDetailState } from './issue-detail-state';
import { DetailSection } from './DetailSection/DetailSection';
import { faCreditCard } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { IProjectIssue } from '../../../../typings/project-issue.typing';

export interface InputProps {
  issueId: string;
  kanbanId?: string;
  projectId: string;
}

export interface ReduxProps {
  issue?: IProjectIssue;
  actions: ActionCreatorsMapObject;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

export class IssueDetailComponent extends Component<
  ComponentProps &
    ReduxProps & {
      toastManager: any;
    },
  {}
> {
  state = {};
  private detailState: IssueDetailState;

  constructor(props) {
    super(props);
    this.detailState = new IssueDetailState(this as any);
  }
  //
  // componentDidMount() {
  //   this.props.actions.getProjectIssueDetailRequest({
  //     issueId: this.props.issueId,
  //   });
  // }

  // componentDidUpdate(prevProps: ComponentProps) {
  //   if (this.props.issueID !== prevProps.issueID) {
  //     this.props.actions.getProjectIssueDetailRequest({
  //       issueId: this.props.issueID,
  //     });
  //   }
  // }

  render() {
    const { issue } = this.props;
    if (!issue) {
      return <div className="IssueDetail">loading</div>;
    }
    return (
      <div className="IssueDetail">
        <DetailSection icon={faCreditCard}>
          <FormField className="IssueDetail--title-field">
            <Input
              className="IssueDetail--title"
              size="large"
              borderLess={true}
              value={issue.title}
              onChange={this.detailState.onFieldChange('title')}
              onBlur={this.detailState.onFieldBlur('title')}
            />
          </FormField>
        </DetailSection>

        <div className="IssueDetail--content">
          <div className="IssueDetail--left">
            {issue.deadline && (
              <FormField name="到期日" className="IssueDetail--deadline-field">
                <Deadline
                  deadline={issue.deadline!}
                  done={!!issue.deadlineDone}
                  onChange={(checked) =>
                    this.detailState.updateIssue(
                      {
                        deadlineDone: checked,
                      },
                      {
                        force: true,
                      }
                    )
                  }
                />
              </FormField>
            )}

            <DetailSection icon={faBars}>
              <FormField name="描述：" type="major">
                <AppTextArea
                  className="IssueDetail--content-textarea"
                  value={issue.content || ''}
                  onChange={this.detailState.onFieldChange('content')}
                  onBlur={this.detailState.onFieldBlur('content')}
                />
              </FormField>
            </DetailSection>
          </div>

          <IssueDetailRight
            projectID={this.props.projectId}
            kanbanID={this.props.kanbanId}
            issue={issue}
            updateIssue={this.detailState.updateIssue}
          />
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
        changeIssueDirect: changeIssueDirect,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  return {
    issue: state.project.issueMap[props.issueId],
  };
};

export const IssueDetail = withRouter<ComponentProps, any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withToastManager(IssueDetailComponent))
);
