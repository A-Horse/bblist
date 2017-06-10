import React, { Component } from 'react';
import { IconAdd } from 'services/image-icon';
import { CloseIcon } from 'services/svg-icons';
import { Modal } from 'components/widget/Modal';
import { Button } from 'components/widget/Button';
import { Input } from 'components/widget/Input';
import { ErrorMsg } from 'components/ErrorMsg';
import { validateFormValue } from 'services/validate-strategy';
import R from 'ramda';

import 'style/page/task/taskboard-creater.scss';

class TaskBoardCreater extends Component {
  constructor() {
    super();
    this.state = {modalOpen: false, createErrorMessages: []};
  }

  onCreateClick(event) {
    event.preventDefault();
    const name = this.refs.name.instance;
    const data = {name: name.value.trim()};

    const createErrorMessages = validateFormValue(data, {
      name: ['required@Please fill the name.']
    });
    this.setState({createErrorMessages: createErrorMessages});
    if (Object.keys(createErrorMessages).length) {
      return;
    }
    this.props.createTaskBoard({name: name.value.trim()}).then(() => {
      this.props.getAllTaskBoard();
      this.closeModal();
    });
  }

  componentWillMount() {

  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  renderModal() {
    return (
      <Modal className='taskboard-creater-modal' toggle={this.state.modalOpen} close={this.closeModal.bind(this)}>
        <div>
          <button className='close-button'>
            <CloseIcon className='clear-icon' onClick={this.closeModal.bind(this)}/>
          </button>

          <div className='taskboard-creater--name'>Create Wall:</div>

          <p className='taskboard-creater--quota'>Establish their own Board for different transactions.</p>

          <img className='taskboard-creater--illustration' src='/assets/images/work.png' />

          <Input className='taskboard-creater--name-input' type='text' ref='name' placeholder='Board Name' onKeyPress={(event) => event.key === 'Enter' && this.onCreateClick.bind(this)(event)}/>
          <ErrorMsg messages={R.values(this.state.createErrorMessages)}/>
          <Button styleType='primary' className='taskboard-creater--create-button' onClick={this.onCreateClick.bind(this)} >Complete And Create</Button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className='taskboard-creater' onClick={() => this.setState({modalOpen: true})}>
        <IconAdd className="icon-add"/>
        <span className='taskboard-creater-title'>New Task Wall</span>
        {this.renderModal()}
      </div>
    );
  }
}


export default TaskBoardCreater;
