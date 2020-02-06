import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { CreateProjectIssueForm } from './CreateProjectIssueForm';
import { AppModal } from '../../../widget/AppModal';

import './IssueCreatorModal.scss';
import { ModalHeader } from '../../../widget/ModalHeader/ModalHeader';
import { Divider } from '../../../widget/Divider';

class IssueCreatorModalComponent extends Component<
  {
    modalVisible: boolean;
    actions: any;
    closeModal: any;
    projectID: string;
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
        className="IssueCreatorModal"
        onRequestClose={this.props.closeModal}
        isOpen={this.props.modalVisible}
      >
        <ModalHeader title="新建问题" onClose={this.props.closeModal} />
        <div>
          <CreateProjectIssueForm
            projectID={this.props.projectID}
            style={{
              display: this.state.selectedType === 'PROJECT' ? 'block' : 'none'
            }}
          />
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
