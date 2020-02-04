import './IssueCreatorModal.scss';

import { Button, Form, Input } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { AppIcon } from '../../widget/Icon';
import { AppMenu } from '../../widget/Menu/Menu';
import { CreateProjectIssueForm } from './CreateProjectIssueForm';
import { AppModal } from '../../widget/AppModal';

class IssueCreatorModalComponent extends Component<
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
        onRequestClose={this.props.closeModal}
        isOpen={this.props.modalVisible}
      >
        <div className="create-task-modal-content">
         
          <div className="create-task-modal-right">
            <CreateProjectIssueForm
              style={{
                display:
                  this.state.selectedType === 'PROJECT' ? 'block' : 'none'
              }}
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

export const IssueCreatorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueCreatorModalComponent);
