import './KanbanSettingModal.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';

import {
  createKanbanRequest,
  createKanbanColumnRequest
} from '../../../actions/project/kanban.action';
import { ProjectRecord } from '../../../typings/project.typing';
import { AppModal } from '../../../components/widget/AppModal';
import { RootState } from '../../../reducers';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { withRouter, RouteComponentProps } from 'react-router';
import { KanbanColumnCreator } from './KanbanColumnCreator/KanbanColumnCreator';

interface InputProps {
  toggle: boolean;
  onClose: Function;
  kanbanId: string;
}

interface InputRouterProps
  extends InputProps,
    RouteComponentProps<{ projectId: string; kanbanId: string }> {}

class KanbanSettingModalComponent extends Component<
  InputRouterProps & {
    kanban?: KanbanRecord;
    project?: ProjectRecord;
    actions: ActionCreatorsMapObject;
  }
> {
  componentWillMount() {}

  closeModal = () => {
    this.props.onClose();
  };

  renderContent() {
    if (!this.props.kanban) {
      return <div>loading</div>;
    }
    return (
      <div>
        {this.props.kanban!.get('name')}

        <KanbanColumnCreator createKanbanColumn={this.props.actions.createKanbanColumnRequest} />
      </div>
    );
  }

  render() {
    return (
      <AppModal isOpen={this.props.toggle} onRequestClose={this.closeModal}>
        {this.renderContent()}
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
        createKanbanColumnRequest: createKanbanColumnRequest
      },
      dispatch
    )
  };
};

export const KanbanSettingModal = withRouter<InputRouterProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanSettingModalComponent)
);
