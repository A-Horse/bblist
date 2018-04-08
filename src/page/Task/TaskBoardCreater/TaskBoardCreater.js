import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { CloseIcon } from 'services/svg-icons';
import { Modal } from 'components/widget/Modal/Modal';
import { Button } from 'components/widget/Button/Button';
import { Input } from 'components/widget/Input/Input';
import { ErrorMsg } from 'components/ErrorMsg/ErrorMsg';
import { validateFormValue } from 'services/validate-strategy';
import R from 'ramda';

import './TaskBoardCreater.scss';

class TaskBoardCreater extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

  state = {
    modalOpen: false,
    errorMessages: [],
    name: ''
  };

  constructor(props) {
    super(props);
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onCreateClick(event) {
    event.preventDefault();
    const data = { name: this.state.name.trim() };

    const errorMessages = validateFormValue(data, {
      name: ['required@Please fill the name.']
    });
    this.setState({ errorMessages: errorMessages });
    if (Object.keys(errorMessages).length) {
      return;
    }
    this.props.actions.ADD_TASK_BOARD_REQUEST(data);
    this.closeModal();
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div className="taskboard-creater" onClick={() => this.setState({ modalOpen: true })}>
        <i className="fa fa-plus" aria-hidden="true" />
        <span className="taskboard-creater-title">New Task Wall</span>

        <Modal
          className="taskboard-creater-modal"
          toggle={this.state.modalOpen}
          close={this.closeModal.bind(this)}
        >
          <div>
            <button className="close-button">
              <i className="fa fa-times" aria-hidden="true" onClick={this.closeModal.bind(this)} />
            </button>

            <div className="taskboard-creater--name">Create Wall:</div>

            <p className="taskboard-creater--quota">
              Establish their own Board for different transactions.
            </p>

            <img className="taskboard-creater--illustration" src="/assets/images/work.png" />

            <Input
              className="taskboard-creater--name-input"
              type="text"
              placeholder="Board Name"
              onChange={value => this.setState({ name: value })}
              onKeyPress={event => event.key === 'Enter' && this.onCreateClick.bind(this)(event)}
            />
            <ErrorMsg messages={R.values(this.state.errorMessages)} />
            <Button
              styleType="primary"
              className="taskboard-creater--create-button"
              onClick={this.onCreateClick}
            >
              Complete And Create
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default TaskBoardCreater;
