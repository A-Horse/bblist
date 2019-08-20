import './ProjectKanban.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { Kanban } from './Kanban/Kanban';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';
import { NoKanbanGuide } from './NoKanbanGuide/NoKanbanGuide';
import { AppSelect } from '../../../../components/widget/AppSelect';
import { SelectOption } from '../../../../typings/select.typing';
import { getKanbanOptions } from '../../../../reducers/selector/kanban.selector';

interface Props {
  actions: ActionCreatorsMapObject;
  project: ProjectRecord;
}

export class ProjectKanbanComponent extends Component<
  Props & RouteComponentProps<{ projectId: string }>,
  {
    selectKanbanId: string;
  }
> {
  componentWillMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.match.params.projectId
    });
  }

  renderKanbanArea() {
    if (!this.props.project.get('kanbans')!.count()) {
      return <NoKanbanGuide project={this.props.project} />;
    } else {
      const kanbanOptions: SelectOption[] = getKanbanOptions(this.props.project);

      const selectKanbanId: string =
        this.state.selectKanbanId || this.props.project.get('setting').get('defaultKanbanId');

      return (
        <div>
          <AppSelect options={kanbanOptions} />

          {selectKanbanId && (
            <Kanban id={selectKanbanId} projectId={this.props.project.get('id')} />
          )}
        </div>
      );
    }
  }

  render() {
    if (!this.props.project) {
      return null;
    }

    if (!this.props.project.get('kanbans')) {
      return null;
    }

    return <div>{this.renderKanbanArea()}</div>;
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

export const ProjectKanban = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectKanbanComponent)
);
