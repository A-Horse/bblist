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
import { RootState } from '../../../../reducers';

interface Props {
  actions: ActionCreatorsMapObject;
  project?: ProjectRecord;
  kanbanOptions?: SelectOption[];
}

export class ProjectKanbanComponent extends Component<
  Props & RouteComponentProps<{ projectId: string }>,
  {
    selectKanbanId: string | null;
  }
> {
  state = {
    selectKanbanId: null
  };

  componentWillMount() {
    this.props.actions.getProjectKanbansRequest({
      projectId: this.props.match.params.projectId
    });
  }

  renderKanbanArea() {
    if (!this.props.project!.get('kanbanIds')!.length) {
      return <NoKanbanGuide project={this.props.project!} />;
    } else {
      const selectKanbanId: string =
        this.state.selectKanbanId || this.props.project!.get('setting').get('defaultKanbanId');
      console.log('selectKanbanId', selectKanbanId);
      return (
        <div>
          <AppSelect options={this.props.kanbanOptions} />    

          {selectKanbanId && (
            <Kanban kanbanId={selectKanbanId} projectId={this.props.project!.get('id')} />
          )}
        </div>
      );
    }
  }

  render() {
    if (!this.props.project) {
      return null;
    }

    if (!this.props.project.get('kanbanIds')) {
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

const mapStateToProps = (state: RootState, props: any) => {
  const { projectId } = props.match.params;

  const project = state.project.get('projectMap').get(projectId);

  let kanbanOptions: SelectOption[] = [];
  if (project) {
    kanbanOptions = getKanbanOptions(project, state.project.get('kanbanMap'));
  }

  return {
    project,
    kanbanOptions
  };
};

export const ProjectKanban = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectKanbanComponent)
);
