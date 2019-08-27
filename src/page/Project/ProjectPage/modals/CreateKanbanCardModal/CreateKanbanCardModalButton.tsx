import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KanbanRecord } from '../../../../../typings/kanban.typing';
import { AppButton } from '../../../../../components/widget/Button';
import { CreateKanbanCardModal } from './CreateKanbanCardModal';

interface InputProps {
  kanban: KanbanRecord;
}

export class CreateKanbanCardModalButton extends Component<
  InputProps,
  {
    toggle: boolean;
  }
> {
  state = {
    toggle: false
  };

  openModal = () => {
    this.setState({
      toggle: true
    });
  };

  closeModal = () => {
    this.setState({
      toggle: false
    });
  };

  render() {
    return (
      <div>
        <AppButton onClick={this.openModal}>Create Task</AppButton>
        <CreateKanbanCardModal
          toggle={this.state.toggle}
          kanban={this.props.kanban}
          onClose={this.closeModal}
        />
      </div>
    );
  }
}
