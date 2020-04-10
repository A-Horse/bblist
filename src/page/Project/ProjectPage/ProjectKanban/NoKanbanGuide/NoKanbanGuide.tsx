import React, { Component } from 'react';

import { AppButton } from '../../../../../widget/Button';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanCreatorModal } from '../../../KanbanCreator/KanbanCreatorModal';
import { AppIcon } from '../../../../../widget/Icon';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

import './NoKanbanGuide.scss';

interface Props {
  project: ProjectRecord;
}

export class NoKanbanGuide extends Component<
  Props,
  {
    kanbanCreatorToggle: boolean;
  }
> {
  state = {
    kanbanCreatorToggle: false
  };

  onAddKanbanClick = () => {
    this.setState({ kanbanCreatorToggle: true });
  };

  closeCreateKanban = () => {
    this.setState({ kanbanCreatorToggle: false });
  };

  render() {
    return (
      <div className="NoKanbanGuide">
        <div className="NoKanbanGuide--box">
          <div>
            <AppIcon size="3x" color="#999" icon={faBoxOpen} />
          </div>
          <div className="NoKanbanGuide--text">这个项目还没有看板</div>

          <div>
            <AppButton type="primary" onClick={this.onAddKanbanClick}>
              创建看板
            </AppButton>
          </div>
        </div>

        <KanbanCreatorModal
          noKanbanExist={true}
          project={this.props.project}
          toggle={this.state.kanbanCreatorToggle}
          onClose={this.closeCreateKanban}
        />
      </div>
    );
  }
}
