import './KanbanSettingPanel.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';
import { AppButton } from '../../../../../widget/Button';
import { AppIcon } from '../../../../../widget/Icon';
import { SectionField } from '../../../../../widget/SectionField/SectionField';
import { RootState } from '../../../../../redux/reducer';
import { IKanban } from '../../../../../typings/kanban.typing';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { KanbanCreator } from '../../../KanbanCreator/KanbanCreator';
import { IProject } from '../../../../../typings/project.typing';

interface ComponentProps extends RouteComponentProps<{ projectId: string }> {}

class KanbanSettingPanelComponent extends Component<
  {
    actions: ActionCreatorsMapObject;
    project?: IProject;
    kanbans: IKanban[];
  } & ComponentProps,
  {
    settingModalToggle: boolean;
    kanbanCreatorModalToggle: boolean;
    settingKanbanId: string | null;
  }
> {
  state = {
    settingModalToggle: false,
    kanbanCreatorModalToggle: false,
    settingKanbanId: null,
  };

  openKanbanSettingModal = (kanbanId: string) => {
    this.setState({
      settingModalToggle: true,
      settingKanbanId: kanbanId,
    });
  };

  closeKanbanSettingModal = () => {
    this.setState({
      settingModalToggle: false,
      settingKanbanId: null,
    });
  };

  closeKanbanCreatorModal = () => {
    this.setState({
      kanbanCreatorModalToggle: false,
    });
  };

  renderContent() {
    if (!this.props.kanbans.length) {
      return <div>暂无列表，请新建</div>;
    }
    return (
      <div>
        {this.props.kanbans.map((kanban: IKanban) => {
          return (
            <div key={kanban.id} className="KanbanSettingPanel--kanban-item">
              {kanban.name}

              <AppButton
                className="KanbanSettingPanel--item-edit-button"
                type="dashed"
                onClick={() => this.openKanbanSettingModal(kanban.id)}
              >
                <AppIcon icon="pen" /> 编辑
              </AppButton>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <SectionField
        name="看板"
        className="KanbanSettingPanel"
        nameRight={
          <KanbanCreator projectId={this.props.project!.id}>
            {(setVisible: Function) => (
              <AppButton
                size="sm"
                backgroundColor="#fff"
                onClick={() => setVisible(true)}
              >
                <AppIcon icon={faPlusCircle} /> 新建看板
              </AppButton>
            )}
          </KanbanCreator>
        }
      >
        {!!this.state.settingKanbanId && (
          <KanbanSettingModal
            kanbanId={this.state.settingKanbanId!}
            toggle={this.state.settingModalToggle}
            onClose={this.closeKanbanSettingModal}
          />
        )}

        {this.renderContent()}
      </SectionField>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators({}, dispatch),
  };
};

const mapStateToProps = (state: RootState, props: ComponentProps) => {
  const projectId = props.match.params.projectId;
  const project = state.project.projectMap[projectId];

  return {
    project,
    kanbans: (project.kanbanIds || [])
      .map((kanbanId: string) => {
        return state.project.kanbanMap[kanbanId] as IKanban;
      })
      .filter((k) => !!k),
  };
};

export const KanbanSettingPanel = withRouter<ComponentProps, any>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanSettingPanelComponent)
);
