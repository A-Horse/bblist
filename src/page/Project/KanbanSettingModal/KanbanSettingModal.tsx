import './KanbanSettingModal.scss';

import { List } from 'immutable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch
} from 'redux';

import {
  createKanbanColumnRequest,
  createKanbanRequest,
  getProjectKanbanDetailRequest
} from '../../../actions/project/kanban.action';
import { AppModal } from '../../../widget/Modal/AppModal';
import { RootState } from '../../../reducers';
import { selectKanbanColumns } from '../../../reducers/selector/kanban.selector';
import { KanbanColumnRecord } from '../../../typings/kanban-column.typing';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { ProjectRecord } from '../../../typings/project.typing';
import { KanbanColumnCreator } from './KanbanColumnCreator/KanbanColumnCreator';
import { KanbanColumnPanel } from './KanbanColumnPanel/KanbanColumnPanel';

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
    columns: List<KanbanColumnRecord> | null;
    project?: ProjectRecord;
    actions: ActionCreatorsMapObject;
  }
> {
  componentWillMount() {
    this.props.actions.getProjectKanbanDetailRequest({
      kanbanId: this.props.kanbanId
    });
  }

  closeModal = () => {
    this.props.onClose();
  };

  createKanbanColumn = (formData: any) => {
    this.props.actions.createKanbanColumnRequest({
      kanbanId: this.props.kanban!.get('id'),
      ...formData
    });
  };

  render() {
    return (
      <AppModal
        className="KanbanSettingModal"
        isOpen={this.props.toggle}
        onRequestClose={this.closeModal}
      >
        {!this.props.kanban ? (
          <div>loading</div>
        ) : (
          <div>
            {this.props.kanban!.get('name')}

            <KanbanColumnPanel columns={this.props.columns} />

            <KanbanColumnCreator createKanbanColumn={this.createKanbanColumn} />
          </div>
        )}
      </AppModal>
    );
  }
}

const mapStateToProps = (state: RootState, props: InputRouterProps) => {
  const projectId = props.match.params.projectId;

  const project = state.project
    .get('projectMap')
    .get(projectId) as ProjectRecord;
  const kanban = state.project.get('kanbanMap').get(props.kanbanId);

  let columns: List<KanbanColumnRecord> | null = null;
  if (!!kanban && !!kanban.get('columns')) {
    columns = selectKanbanColumns(state, kanban.get('id'));
  }

  return {
    project,
    kanban,
    columns
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

export const KanbanSettingModal = withRouter<InputRouterProps>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanSettingModalComponent)
);
