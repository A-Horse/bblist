import React, {Component} from 'react';
import {connect} from 'react-redux';

import {CloseIcon, AddIcon} from 'services/svg-icons';
import {Modal} from 'components/widget/Modal';
import {Button} from 'components/widget/Button';
import {Input} from 'components/widget/Input';
import 'style/page/task/taskboard-creater.scss';

class TaskBoardCreater extends Component {  
  constructor() {
    super();
    this.state = {modalOpen: false};
  }

  onCreateClick() {
    const name = this.refs.name.instance;
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

          <img className='taskboard-creater--illustration' src='/static/image/task/illustration@3x.png'/>

          <Input className='taskboard-creater--name-input' type='text' ref='name' placeholder='Board Name'/>
          <Button styleType='primary' className='taskboard-creater--create-button' onClick={this.onCreateClick.bind(this)} >Complete And Create</Button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className='taskboard-creater' onClick={() => this.setState({modalOpen: true})}>
        <AddIcon className='add-icon'/>
        <span className='taskboard-creater-title'>New Task Wall</span>
        {this.renderModal()}
      </div>
    );
  }
}


export default TaskBoardCreater;
