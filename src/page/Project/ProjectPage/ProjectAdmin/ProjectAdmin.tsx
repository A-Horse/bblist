import './ProjectKanban.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';

interface Props {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
}

export class ProjectAdminComponent extends Component<
  Props & RouteComponentProps<{ projectId: string }>,
  {}
> {
  componentWillMount() {}

  render() {
    return <div>jhi</div>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectKanbansRequest: getProjectKanbansRequest
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

export const ProjectAdmin = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectAdminComponent)
);
