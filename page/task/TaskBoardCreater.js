import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createTaskWall, getAllTaskWall} from 'actions/task/task-wall';
import {CloseIcon, AddIcon} from 'services/svg-icons';
import {Modal} from 'components/widget/Modal';
import 'style/page/task/taskboard-creater.scss';

class TaskBoardCreater extends Component {  
  constructor() {
    super();
    this.state = {modalOpen: false};
  }

  createBoard() {
    const {dispatch} = this.props;
    const name = this.refs.name;
    dispatch(createTaskWall({name: name.value.trim()})).then(() => {
      dispatch(getAllTaskWall());
      this.setState({modalOpen: false});
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
          
          <div className='taskboard-creater--topbar'>Create Wall</div>
          
          <p className='taskboard-creater--quota'>Establish their own projects for different transactions.</p>
          <input className='taskboard-creater--name-input' type='text' ref='name' placeholder='board Name'/>
          <button className='taskboard-creater--create-button' onClick={() => this.createBoard()} >Complete And Create</button>
        </div>
      </Modal>
    );
  }

  render() {
    return (
      <div className='taskboard-creater' onClick={() => this.setState({modalOpen: true})}>
        <AddIcon/>
        <div>New Task Wall</div>
        {this.renderModal()}
      </div>
    );
  }
}


export default TaskBoardCreater;
