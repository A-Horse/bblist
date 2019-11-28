import './Issues.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, withRouter } from 'react-router-dom';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import { getProjectIssuesRequest } from '../../../../actions/project/project-issue.action';
import { FlatIssue } from '../../../../components/project/issue/FlatIssue/FlatIssue';
import { IssueDetail } from '../../../../components/project/issue/IssueDetail/IssueDetail';
import { AppPagination } from '../../../../components/widget/Pagination';
import { RootState } from '../../../../reducers';
import { ProjectIssueRecord } from '../../../../typings/project-issue.typing';
import { ProjectRecord } from '../../../../typings/project.typing';

interface InputProps {}

interface ReduxProps {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
  issues: ProjectIssueRecord[];
  pageNumber: number;
  pageSize: number;
  total?: number;
}

export class IssuesComponent extends Component<
  InputProps & ReduxProps & RouteComponentProps<{ projectId: string; issueId: string }>,
  {}
> {
  state = {};

  componentWillMount() {
    this.props.actions.getProjectIssuesRequest({
      projectId: this.props.match.params.projectId,
      pageSize: 20,
      pageNumber: this.props.pageNumber
    });
  }

  onPagaChange = (pageNumber: number) => {
    this.setState({ currentPageNumber: pageNumber });
  };

  onFlatIssueClick = (issue: ProjectIssueRecord) => {
    this.props.history.push(`/project/${this.props.project.get('id')}/issues/${issue.get('id')}`);
  };

  render() {
    return (
      <div className="Issues">
        <div className="Issues--list">
          <ul>
            {this.props.issues.map((issue: ProjectIssueRecord) => {
              return (
                <li key={issue.get('id')}>
                  <FlatIssue issue={issue} onClick={this.onFlatIssueClick} />
                </li>
              );
            })}
          </ul>

          <AppPagination
            onPageChanged={this.onPagaChange}
            pageSize={this.props.pageSize}
            total={this.props.total!}
            currentPage={this.props.pageNumber}
          />
        </div>

        <Route
          path="/project/:projectId/issues/:issueId"
          render={(props: RouteComponentProps<{ issueId: string }>) => (
            <div className={`Issues--detail-container`}>
              <IssueDetail issueId={props.match.params.issueId} />
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
        getProjectIssuesRequest: getProjectIssuesRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: any) => {
  const { projectId } = props.match.params;

  let pageNumber = 0;
  let pageSize = 20;
  let total;
  let loading = true;
  let issues: ProjectIssueRecord[] = [];
  const issuePagitation = state.project.get('currentIssuePagitation');

  if (issuePagitation && issuePagitation!.projectId === projectId) {
    loading = issuePagitation.loading;
    issues = issuePagitation.data
      .map(
        (id: string): ProjectIssueRecord => {
          return state.project.get('cardMap').get(id)!;
        }
      )
      .filter(c => !!c);
    pageNumber = issuePagitation.pageNumber;
    pageSize = issuePagitation.pageSize;
    total = issuePagitation.total;
  }

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord,
    loading,
    pageNumber,
    pageSize,
    total,
    issues
  };
};

export const Issues = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssuesComponent)
);
