import './TaskCreatorModal.scss';

import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { AppIcon } from '../../../components/widget/Icon';
import { AppMenu } from '../../widget/Menu/Menu';
import { AppModal } from '../../widget/Modal';
import { CreateProjectTaskForm } from './CreateProjecTaskForm';
import { CreateTodoTaskForm } from './CreateTodoTaskForm';

class TaskCreaterModalBase extends Component<
  {
    modalVisible: boolean;
    actions: any;
    closeModal: any;
  },
  {
    selectedType: string;
  }
> {
  state = {
    selectedType: 'PROJECT'
  };

  handleMenuClick = (event: { key: string }): void => {
    this.setState({
      selectedType: event.key
    });
  };

  render() {
    return (
      <AppModal
        title="Create Task"
        maskClosable={false}
        onCancel={this.props.closeModal}
        visible={this.props.modalVisible}
        footer={null}
        closable={false}
      >
        <div className="create-task-modal-content">
          <div className="create-task-modal-left">
            <AppMenu defaultSelectedKeys={['PROJECT']} onClick={this.handleMenuClick}>
              <AppMenu.Item key="PROJECT">
              <AppIcon icon="columns" />
              Task</AppMenu.Item>

              <AppMenu.Item key="TODO">
              <AppIcon icon="cube" />
              Todo</AppMenu.Item>
            </AppMenu>
          </div>
          <div className="create-task-modal-right">
             <CreateProjectTaskForm style={{display : this.state.selectedType === 'PROJECT' ? 'block' : 'none'}} />

           <CreateTodoTaskForm 
           style={{display : this.state.selectedType === 'TODO' ? 'block' : 'none'}}
           onCancel={this.props.closeModal}
            />
          </div>
        </div>
      </AppModal>
    );
  }
}


const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

export const TaskCreatorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskCreaterModalBase);
