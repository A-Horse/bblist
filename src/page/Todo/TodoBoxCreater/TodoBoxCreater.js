// @flow
import React, { Component } from 'react';
import { Input, Button, Icon, Modal } from 'antd';

import './TodoBoxCreater.less';

export class TodoBoxCreater extends Component<
  {
    actions: any
  },
  { toggle: boolean }
> {
  state = { toggle: false, name: '' };

  close = () => {
    this.setState({ toggle: false });
  };

  onAddClick() {
    this.props.actions.ADD_TODOBOX_REQUEST({
      name: this.nameInput.value.trim()
    });
    this.close();
  }

  render() {
    return (
      <div>
        <Button
          onClick={event => {
            event.stopPropagation();
            this.setState({ toggle: true });
          }}
        >
          <Icon type="folder-add" />
          Todo Box
        </Button>

        <Modal className="todo-box-creater-modal" visible={this.state.toggle} close={this.close}>
          <div className="todo-box-creater--heading">Todo Box</div>

          <Input
            className="todo-box-name--input"
            type="text"
            ref={ref => (this.nameInput = ref)}
            onChange={value => this.setState({ name: value })}
            placeholder="Board Name"
          />
          <Button
            styleType="primary"
            disable={!this.state.name.length}
            className="taskboard-creater--create-button"
            onClick={this.onAddClick}
          >
            OK
          </Button>
        </Modal>
      </div>
    );
  }
}
