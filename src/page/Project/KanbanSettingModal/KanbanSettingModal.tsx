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
import { ProjectRecord } from '../../../typings/project.typing';
import { KanbanColumnCreator } from './KanbanColumnCreator/KanbanColumnCreator';
import { KanbanColumnPanel } from './KanbanColumnPanel/KanbanColumnPanel';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import { createKanbanColumnRequest } from '../../../redux/actions/column.action';
import { IColumn } from '../../../typings/kanban-column.typing';

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
    project?: ProjectRecord;
    actions: ActionCreatorsMapObject;
  }
> {
  componentWillMount() {
    this.props.actions.getProjectKanbanDetailRequest({
      kanbanId: this.props.kanbanId,
    });
  }

  closeModal = () => {
    this.props.onClose();
  };

  createKanbanColumn = (formData: any) => {
    this.props.actions.createKanbanColumnRequest({
      projectId: this.props.project!.get('id'),
      kanbanId: this.props.kanban!.id,
      ...formData,
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
              title={this.props.kanban!.name + ' 配置'}
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

  const project = state.project.projectMap.get(projectId) as ProjectRecord;
  const kanban = state.project.kanbanMap[props.kanbanId];

  let columns: IColumn[] = [];
  if (!!kanban && !!kanban.columnIds) {
    columns = selectKanbanColumns(state, kanban.id);
  }

  return {
    project,
    kanban,
    columns,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        createKanbanRequest: createKanbanRequest,
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
