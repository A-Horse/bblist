import './KanbanSettingModal.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import {
  createKanbanRequest,
  getProjectKanbanDetailRequest,
} from '../../../redux/actions/kanban.action';
import { AppModal } from '../../../widget/Modal/AppModal';
import { RootState } from '../../../redux/reducer';
import { selectKanbanColumns } from '../../../redux/reducer/selector/kanban.selector';
import { IKanban } from '../../../typings/kanban.typing';
import { KanbanColumnCreator } from './KanbanColumnCreator/KanbanColumnCreator';
import { KanbanColumnPanel } from './KanbanColumnPanel/KanbanColumnPanel';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import {
  createKanbanColumnRequest,
  queryKanbanColumns,
} from '../../../redux/actions/column.action';
import { IColumn } from '../../../typings/kanban-column.typing';
import { IProject } from '../../../typings/project.typing';

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
    kanban?: IKanban;
    columns: IColumn[];
    project?: IProject;
    actions: ActionCreatorsMapObject;
  }
> {
  componentWillMount() {
    this.props.actions.getProjectKanbanDetailRequest({
      kanbanId: this.props.kanbanId,
    });
    this.props.actions.queryKanbanColumns(this.props.kanbanId);
  }

  closeModal = () => {
    this.props.onClose();
  };

  createKanbanColumn = (formData: any) => {
    this.props.actions
      .createKanbanColumnRequest({
        projectId: this.props.project!.id,
        kanbanId: this.props.kanban!.id,
        ...formData,
      })
      .then(() => {
        this.props.actions.queryKanbanColumns(this.props.kanbanId);
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
            <ModalHeader
              title={ this.props.kanban!.name + ' 配置'}
              onClose={this.props.onClose}
            />

            <KanbanColumnPanel columns={this.props.columns} />

            <div
              style={{
                padding: '16px',
              }}
            >
              <KanbanColumnCreator
                createKanbanColumn={this.createKanbanColumn}
              />
            </div>
          </div>
        )}
      </AppModal>
    );
  }
}

const mapStateToProps = (state: RootState, props: InputRouterProps) => {
  const projectId = props.match.params.projectId;
  const project = state.project.projectMap[projectId];
  const kanban = state.project.kanbanMap[props.kanbanId];

  return {
    project,
    kanban,
    columns: selectKanbanColumns(state, props.kanbanId),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        queryKanbanColumns: queryKanbanColumns,
        createKanbanColumnRequest: createKanbanColumnRequest,
        getProjectKanbanDetailRequest: getProjectKanbanDetailRequest,
      },
      dispatch
    ),
  };
};

export const KanbanSettingModal = withRouter<InputRouterProps, any>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanSettingModalComponent)
);
