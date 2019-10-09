import './Issues.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectIssuesRequest } from '../../../../actions/project/project-issue.action';
import { AppPagination } from '../../../../components/widget/Pagination';
import { RootState } from '../../../../reducers';
import { ProjectIssueRecord } from '../../../../typings/kanban-card.typing';
import { FlatIssue } from '../../../../components/project/issue/FlatIssue/FlatIssue';
import { CardDetail } from '../../../../components/project/CardDetail/CardDetail';

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
  InputProps & ReduxProps & RouteComponentProps<{ projectId: string }>,
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

  render() {
    return (
      <div className="Issues">
        <div>
          {this.props.issues.map((issue: ProjectIssueRecord) => {
            return <FlatIssue issue={issue} />;
          })}
          <AppPagination
            onPageChanged={this.onPagaChange}
            pageSize={this.props.pageSize}
            total={this.props.total!}
            currentPage={this.props.pageNumber}
          />
        </div>

        <div>
          <Route path="/project/:projectId/kanban/:kanbanId/card/:cardId" render={() => <CardDetailContainer />} />
        </div>
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
