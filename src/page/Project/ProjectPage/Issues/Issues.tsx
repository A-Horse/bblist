import './Issues.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectIssuesRequest } from '../../../../actions/project/project-issue.action';
import { AppPagination } from '../../../../components/widget/Pagination';
import { RootState, project } from '../../../../reducers';
import { ProjectCardRecord } from '../../../../typings/kanban-card.typing';

interface InputProps {

}

interface ReduxProps {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
  pageNumber: number;
  pageSize: number;
  total?: number;
}

export class IssuesComponent extends Component<
InputProps & ReduxProps & RouteComponentProps<{ projectId: string }>,
  {
  }
> {
  state = {
  };

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
      <div>
        Issues
        <AppPagination
          onPageChanged={this.onPagaChange}
          pageSize={this.props.pageSize}
          total={this.props.total!}
          currentPage={this.props.pageNumber}
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
  let issues: ProjectCardRecord[] = [];
  const issuePagitation = state.project.get('currentIssuePagitation');

  if (issuePagitation && issuePagitation!.projectId === projectId) {
    loading = issuePagitation.loading;
    issues = issuePagitation.data.map((id: string): ProjectCardRecord => {
      return state.project.get('cardMap').get(id)!;
    }).filter(c => !!c);
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
