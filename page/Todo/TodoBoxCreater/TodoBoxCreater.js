import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AddIcon, AlarmIcon, CloseIcon } from 'services/svg-icons';
import { Button } from 'components/widget/Button/Button';
import Textarea from 'react-textarea-autosize';
import { Modal } from 'components/widget/Modal/Modal';
import Input from 'components/widget/Input/Input';

import './TodoBoxCreater.scss';

class TodoBoxCreater extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  state = { toggle: false };

  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ toggle: false });
  }

  render() {
    return (
      <div className="todo-box-creater--toggle" onClick={() => this.setState({ toggle: true })}>
        <i className="fa fa-plus" aria-hidden="true" />
        <span className="toggle-text">Create Todo Box</span>

        <Modal className="todo-box-creater" toggle={this.state.toggle} close={this.close}>
          <CloseIcon className="clear-icon" onClick={this.close} />

          <div className="todo-box-creater--heading">Create Todo Box:</div>

          <Input
            className="todo-box-name--input"
            type="text"
            ref={ref => (this.nameInput = ref)}
            placeholder="Board Name"
          />
          <Button styleType="primary" className="taskboard-creater--create-button">
            OK
          </Button>
        </Modal>
      </div>
    );
  }
}

export default TodoBoxCreater;
