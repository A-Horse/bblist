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

import 'style/page/task/modal.scss';

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
    const {card} = this.props;
    return (
      <Modal className='task-card' toggle={this.props.toggleTaskCardModal}>
        <CloseIcon onClick={this.close.bind(this)}/>
        Card
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
    toggleTaskCardModal: state.task.card.active
  };
};

export default connect(mapStateToProps)(CardModal);
