import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import Radium from 'radium';
import R from 'fw-ramda';

import {deleteTaskCard, updateTaskCard, unsetCurrentCard} from 'actions/task/task-card';
import {spawnMixinRender} from 'style/theme-render';
import {CloseIcon} from 'services/svg-icons';
import UserAvatar from 'components/UserAvatar';
import {Modal} from 'components/widget/Modal';
import {CheckBox} from 'components/widget/CheckBox';
import {Hr} from 'components/widget/Hr';

import 'style/page/task/taskcard-modal.scss';

@Radium
class CardModal extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      
    };
  }

  close() {
    const {dispatch} = this.props; 
    dispatch(unsetCurrentCard());
  }

  render() {
    const {card, taskLists} = this.props;
    const currentList = R.find(R.propEq('id', card.taskListId))(taskLists);
    if (!currentList) {
      return null;
    }

    return (
      <Modal className='taskcard-modal' toggle={this.props.toggleTaskCardModal}>
        <div className='taskcard-modal--top-bar'>
          <div>
            <span>List:</span>
            <span>{currentList.name}</span>
          </div>
          <CloseIcon onClick={this.close.bind(this)}/>
        </div>
        
        <div className='taskcard-modal--title'>
          <CheckBox ref='checkbox'/>
          <p className='taskcard-modal--content'>{card.title}</p>
        </div>

        <Hr/>

        <div className='taskcard-modal--content'>
          <textarea>{card.content}</textarea>
        </div>
        
      </Modal>
    );
  }

  

  updateTaskCard() {
    const {dispatch} = this.props;
    return dispatch(updateTaskCard(this.props.card.id));
  }

  deleteTaskCard() {
    const {dispatch} = this.props;
    return dispatch(deleteTaskCard(this.props.card.id));
  }
}

const mapStateToProps = (state) => {
  return {
    card: state.task.card.card,
    toggleTaskCardModal: state.task.card.active,
    taskLists: state.task.list.lists
  };
};

export default connect(mapStateToProps)(CardModal);
