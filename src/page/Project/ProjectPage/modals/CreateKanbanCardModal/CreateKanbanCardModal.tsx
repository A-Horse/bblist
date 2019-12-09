import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import {
  createKanbanColumnRequest,
  createKanbanRequest,
  getProjectKanbanDetailRequest
} from '../../../../../actions/project/kanban.action';
import { CreateProjectIssueForm } from '../../../../../components/creators/TaskCreator/CreateProjectIssueForm';
import { AppModal } from '../../../../../components/widget/AppModal';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { ProjectRecord } from '../../../../../typings/project.typing';

interface InputProps {
  toggle: boolean;
  onClose: Function;
  kanban?: KanbanRecord;
  project?: ProjectRecord;
}

interface RouterProps extends RouteComponentProps<{ projectId: string; kanbanId: string }> {}

class CreateKanbanCardModalComoponent extends Component<
  InputProps &
    RouterProps & {
      actions: ActionCreatorsMapObject;
    }
> {
  componentWillMount() {}

  closeModal = () => {
    this.props.onClose();
  };

  render() {
    return (
      <AppModal isOpen={this.props.toggle} onRequestClose={this.closeModal}>
        <CreateProjectIssueForm kanban={this.props.kanban} project={this.props.project} />
      </AppModal>
    );
  }
}

const mapStateToProps = (state: RootState, props: InputProps & RouterProps) => {
  const projectId = props.match.params.projectId;
  const kanbanId = props.match.params.kanbanId;

  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;

  const kanban = state.project.get('kanbanMap').get(kanbanId);

  return {
    project,
    kanban
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        createKanbanRequest: createKanbanRequest,
        createKanbanColumnRequest: createKanbanColumnRequest,
        getProjectKanbanDetailRequest: getProjectKanbanDetailRequest
      },
      dispatch
    )
  };
};

export const CreateKanbanCardModal = withRouter<InputProps & RouterProps>(
  connect(mapStateToProps, mapDispatchToProps)(CreateKanbanCardModalComoponent)
);
