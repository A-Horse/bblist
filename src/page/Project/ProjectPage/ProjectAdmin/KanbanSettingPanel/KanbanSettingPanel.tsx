import './KanbanSettingPanel.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { AppIcon } from '../../../../../components/widget/Icon';
import { RootState } from '../../../../../reducers';
import { KanbanSettingModal } from '../../../KanbanSettingModal/KanbanSettingModal';
import { AppButton } from '../../../../../components/widget/AppButton';

interface InputProps {}

interface ComponentProps extends RouteComponentProps<{ projectId: string }>, InputProps {}

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
      return <div>empty</div>;
    }
    return (
      <div>
        {this.props.kanbans.map((kanban: KanbanRecord) => {
          return (
            <div key={kanban.get('id')}>
              {kanban.get('name')}

              <span onClick={() => this.openKanbanSettingModal(kanban.get('id'))}>
                <AppIcon icon="cubes" />
              </span>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>Kanbans</div>

        {!!this.state.settingKanbanId && (
          <KanbanSettingModal
            kanbanId={this.state.settingKanbanId!}
            toggle={this.state.settingModalToggle}
            onClose={this.closeKanbanSettingModal}
          />
        )}

        {this.renderContent()}
      </div>
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
  const project = state.project.get('projectMap').get(projectId) as ProjectRecord;

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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanSettingPanelComponent)
);
