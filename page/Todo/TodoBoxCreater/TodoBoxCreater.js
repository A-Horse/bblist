import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/widget/Button/Button';
import { Modal } from 'components/widget/Modal/Modal';
import { isEnterKey } from 'utils/keyboard';
import Input from 'components/widget/Input/Input';

import './TodoBoxCreater.scss';

class TodoBoxCreater extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = { toggle: false, name: '' };

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
  }

  close() {
    this.setState({ toggle: false });
  }

  onAddClick() {
    this.props.actions.ADD_TODOBOX_REQUEST({
      name: this.nameInput.value.trim()
    });
    this.close();
  }

  render() {
    return (
      <div>
        <div
          className="todo-box-creater--toggle"
          onClick={event => {
            event.stopPropagation();
            this.setState({ toggle: true });
          }}
        >
          <i className="fa fa-plus" aria-hidden="true" />
          <span className="toggle-text">Create Todo Box</span>
        </div>

        <Modal className="todo-box-creater-modal" toggle={this.state.toggle} close={this.close}>
          <div className="todo-box-creater--heading">Create Todo Box:</div>

          <Input
            className="todo-box-name--input"
            type="text"
            ref={ref => (this.nameInput = ref)}
            onKeyDown={event => {
              if (isEnterKey(event) && this.state.name.length) {
                this.onAddClick();
              }
            }}
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

export default TodoBoxCreater;
