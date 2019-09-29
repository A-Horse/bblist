import React, { Component } from 'react';

import { AppButton } from '../../../../../components/widget/AppButton';
import { ProjectRecord } from '../../../../../typings/project.typing';
import { KanbanCreator } from '../../../KanbanCreator/KanbanCreator';

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
      <div>
        This project has not seen a kanban yet.
        <AppButton onClick={this.onAddKanbanClick}>Add a kanban</AppButton>
        <KanbanCreator
          project={this.props.project}
          toggle={this.state.kanbanCreatorToggle}
          onClose={this.closeCreateKanban}
        />
      </div>
    );
  }
}
