import './ProjectEpics.scss';

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

export class ProjectEpicsComponent extends Component<
  Props & RouteComponentProps<{ projectId: string }>,
  {}
> {
  componentWillMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.match.params.projectId
    });
  }

  render() {
    return (
      <div>
        trackers
      </div>
    );
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

export const ProjectEpics = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectEpicsComponent)
);
