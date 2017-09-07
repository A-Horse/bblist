import React, { Component } from 'react';
import { IconAdd } from 'services/image-icon';
import { CloseIcon } from 'services/svg-icons';
import { Modal } from 'components/widget/Modal/Modal';
import { Button } from 'components/widget/Button/Button';
import { Input } from 'components/widget/Input';
import { ErrorMsg } from 'components/ErrorMsg';
import { validateFormValue } from 'services/validate-strategy';
import R from 'ramda';

import 'style/page/wiki/wiki-creater.scss';

export default class TaskBoardCreater extends Component {
  constructor() {
    super();
    this.state = { modalOpen: false, createErrorMessages: [] };
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onCreateClick(event) {
    event.preventDefault();
    const title = this.refs.title.instance;
    const data = { title: title.value.trim() };

    const createErrorMessages = validateFormValue(data, {
      title: ['required@Please fill the title.']
    });
    this.setState({ createErrorMessages: createErrorMessages });
    if (Object.keys(createErrorMessages).length) {
      return;
    }
    this.props.createTaskBoard({ title: name.value.trim() }).then(() => {
      this.closeModal();
    });
  }

  componentWillMount() {}

  closeModal() {
    this.setState({ modalOpen: false });
  }

  renderModal() {
    return (
      <Modal
        className="wiki-creater-modal"
        toggle={this.state.modalOpen}
        close={this.closeModal.bind(this)}
      >
        <div>
          <button className="close-button">
            <CloseIcon className="clear-icon" onClick={this.closeModal.bind(this)} />
          </button>

          <div className="wiki-creater--name">Create Wall:</div>

          <Input
            className="wiki-creater--name-input"
            type="text"
            ref="name"
            placeholder="Wiki Title"
            onKeyPress={event => event.key === 'Enter' && this.onCreateClick.bind(this)(event)}
          />
          <ErrorMsg messages={R.values(this.state.createErrorMessages)} />
          <Button
            styleType="primary"
            className="taskboard-creater--create-button"
            onClick={this.onCreateClick}
          >
            Create Wiki
          </Button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className="wiki-creater" onClick={() => this.setState({ modalOpen: true })}>
        <IconAdd className="icon-add" />
        <span className="wiki-creater-title">New Wiki</span>
        {this.renderModal()}
      </div>
    );
  }
}
