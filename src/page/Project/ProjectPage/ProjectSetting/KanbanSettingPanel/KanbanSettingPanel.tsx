import './KanbanSettingPanel.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch
} from 'redux';

import { AppButton } from '../../../../../widget/Button';
import { AppIcon } from '../../../../../widget/Icon';
import { SectionField } from '../../../../../widget/SectionField/SectionField';
import { RootState } from '../../../../../reducers';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';

interface InputProps {}

interface ComponentProps
  extends RouteComponentProps<{ projectId: string }>,
    InputProps {}

class KanbanSettingPanelComponent extends Component<
  {
    actions: ActionCreatorsMapObject;
    project?: ProjectRecord;
    kanbans: KanbanRecord[];
  } & ComponentProps,
  {
    settingModalToggle: boolean;
    settingKanbanId: string | null;
  }
> {
  state = {
    settingModalToggle: false,
    settingKanbanId: null
  };

  openKanbanSettingModal = (kanbanId: string) => {
    this.setState({
      settingModalToggle: true,
      settingKanbanId: kanbanId
    });
  };

  closeKanbanSettingModal = () => {
    this.setState({
      settingModalToggle: false,
      settingKanbanId: null
    });
  };

  renderContent() {
    if (!this.props.kanbans.length) {
      return <div>暂无列表，请新建</div>;
    }
    return (
      <div>
        {this.props.kanbans.map((kanban: KanbanRecord) => {
          return (
            <div
              key={kanban.get('id')}
              className="KanbanSettingPanel--kanban-item"
            >
              {kanban.get('name')}

              <AppButton
                className="KanbanSettingPanel--item-edit-button"
                type="dashed"
                onClick={() => this.openKanbanSettingModal(kanban.get('id'))}
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
      <SectionField name="看板" className="KanbanSettingPanel">
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
    actions: bindActionCreators({}, dispatch)
  };
};

const mapStateToProps = (state: RootState, props: ComponentProps) => {
  const projectId = props.match.params.projectId;
  const project = state.project
    .get('projectMap')
    .get(projectId) as ProjectRecord;

  return {
    project,
    kanbans: (project.get('kanbans') || [])
      .map((kanbanId: string) => {
        return state.project.get('kanbanMap').get(kanbanId) as KanbanRecord;
      })
      .filter(k => !!k)
  };
};

export const KanbanSettingPanel = withRouter<ComponentProps>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanSettingPanelComponent)
);
