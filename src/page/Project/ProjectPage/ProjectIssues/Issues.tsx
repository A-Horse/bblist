import './Issues.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';

import { getProjectIssuesRequest } from '../../../../redux/actions/project-issue.action';
import { FlatIssue } from '../../../../components/Project/Issue/FlatIssue/FlatIssue';
import { IssueDetail } from '../../../../components/Project/Issue/IssueDetail/IssueDetail';
import { RootState } from '../../../../redux/reducer';
import { ProjectRecord } from '../../../../typings/project.typing';
import { IProjectIssue } from '../../../../typings/project-issue.typing';

interface InputProps {}

interface ReduxProps {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
  issues: IProjectIssue[];
  pageNumber: number;
  pageSize: number;
  total?: number;
}

export class IssuesComponent extends Component<
  InputProps &
    ReduxProps &
    RouteComponentProps<{ projectId: string; issueId: string }>,
  {}
> {
  state = {};

  componentWillMount() {
    this.props.actions.getProjectIssuesRequest({
      projectId: this.props.match.params.projectId,
      pageSize: 20,
      pageNumber: this.props.pageNumber,
    });
  }

  onPageChange = (pageNumber: number) => {
    this.setState({ currentPageNumber: pageNumber });
  };

  onFlatIssueClick = (issue: IProjectIssue) => {
    this.props.history.push(
      `/project/${this.props.project.get('id')}/issues/${issue.id}`
    );
  };

  render() {
    return (
      <div className="Issues">
        <div className="Issues--list">
          <ul>
            {this.props.issues.map((issue: IProjectIssue) => {
              return (
                <li key={issue.id}>
                  <FlatIssue issue={issue} onClick={this.onFlatIssueClick} />
                </li>
              );
            })}
          </ul>
        </div>

        <Route
          path="/project/:projectId/issues/:issueId"
          render={(
            props: RouteComponentProps<{ issueId: string; projectID: string }>
          ) => (
            <div className={`Issues--detail-container`}>
              <IssueDetail
                issueID={props.match.params.issueId}
                projectID={props.match.params.projectID}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectIssuesRequest: getProjectIssuesRequest,
      },
      dispatch
    ),
  };
};

const mapStateToProps = (state: RootState, props: any) => {
  const { projectId } = props.match.params;

  let pageNumber = 0;
  let pageSize = 20;
  let total;
  let loading = true;

  return {
    project: state.project.projectMap.get(projectId) as ProjectRecord,
    loading,
    pageNumber,
    pageSize,
    total,
    issues: [],
  };
};

export const Issues = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(IssuesComponent)
);
