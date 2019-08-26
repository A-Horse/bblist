import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';

import {
  createKanbanRequest,
  createKanbanColumnRequest,
  getProjectKanbanDetailRequest
} from '../../../../../actions/project/kanban.action';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { AppModal } from '../../../../../components/widget/AppModal';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { withRouter, RouteComponentProps } from 'react-router';

interface InputProps {
  toggle: boolean;
  onClose: Function;
  kanban: KanbanRecord;
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
        hihi
      </AppModal>
    );
  }
}

const mapStateToProps = (state: RootState, props: InputRouterProps) => {
  const projectId = props.match.params.projectId;

  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;
  const kanban = state.project.get('kanbanMap').get(props.kanbanId);

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

export const CreateKanbanCardModal = withRouter<InputRouterProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateKanbanCardModalComoponent)
);
