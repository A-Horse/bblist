import './ProjectKanban.scss';

import { Map } from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../../actions/actions';
import { Kanban } from './Kanban/Kanban';
import { ProjectRecord } from '../../../../typings/project/project.typing';

export class ProjectKanbanComponent extends Component {
  state = {};

  render() {
    return (
      <div>
        <Kanban />  
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state: any, props: any) => {
  const { projectId } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord
  };
};

export const ProjectKanban = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectKanbanComponent)
);
