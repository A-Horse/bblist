import './Issues.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectIssuesRequest } from '../../../../actions/project/project-issue.action';
import { AppPagination } from '../../../../components/widget/Pagination';

interface Props {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
}

export class IssuesComponent extends Component<
  Props & RouteComponentProps<{ projectId: string }>,
  {
    currentPageNumber: number;
  }
> {
  state = {
    currentPageNumber: 0
  };

  componentWillMount() {
    this.props.actions.getProjectIssuesRequest({
      projectId: this.props.match.params.projectId
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
          pageSize={10}
          total={90}
          currentPage={this.state.currentPageNumber}
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

const mapStateToProps = (state: any, props: any) => {
  const { projectId } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord
  };
};

export const Issues = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssuesComponent)
);
