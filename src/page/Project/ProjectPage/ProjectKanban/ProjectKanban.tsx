import './ProjectKanban.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { Kanban } from './Kanban/Kanban';
import { ProjectRecord } from '../../../../typings/project.typing';
import { getProjectKanbansRequest } from '../../../../actions/project/kanban.action';
import { NoKanbanGuide } from './NoKanbanGuide/NoKanbanGuide';
import { RootState } from '../../../../reducers';
import { KanbanSelect } from '../../../../components/stateful-component/KanbanSelect/KanbanSelect';
import { SelectOption } from '../../../../typings/select.typing';
import { CreateKanbanCardModalButton } from '../modals/CreateKanbanCardModal/CreateKanbanCardModalButton';
import { setProjectDefaultKanbanRequest } from '../../../../actions/project/project-setting.action';

interface Props {
  actions: ActionCreatorsMapObject;
  project?: ProjectRecord;
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

  onKanbanSelectChanged = (selected: SelectOption): void => {
    this.setState({ selectKanbanId: selected.value });
    if (!this.props.project!.get('setting').get('defaultKanbanId')) {
      this.props.actions.setProjectDefaultKanbanRequest({
        projectId: this.props.project!.get('id'),
        kanbanId: selected.value
      });
    }
  };

  renderKanbanArea() {
    if (!this.props.project!.get('kanbans')!.length) {
      return <NoKanbanGuide project={this.props.project!} />;
    } else {
      const selectedKanbanId: string =
        this.state.selectKanbanId || this.props.project!.get('setting').get('defaultKanbanId');

      return (
        <>
          <KanbanSelect
            projectId={this.props.project!.get('id')}
            selectedKanbanId={selectedKanbanId}
            onChange={this.onKanbanSelectChanged}
          />

          <div>
            <CreateKanbanCardModalButton />
          </div>

          {selectedKanbanId && (
            <div className="ProjectKanban--KanbanContainer">
              <Kanban kanbanId={selectedKanbanId} projectId={this.props.project!.get('id')} />
            </div>
          )}
        </>
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

    return <div className="ProjectKanban">{this.renderKanbanArea()}</div>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectKanbansRequest: getProjectKanbansRequest,
        setProjectDefaultKanbanRequest: setProjectDefaultKanbanRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: any) => {
  const { projectId } = props.match.params;

  const project = state.project.get('projectMap').get(projectId);

  return {
    project
  };
};

export const ProjectKanban = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectKanbanComponent)
);
