import React, { Component, RefObject } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { CreateProjectIssueForm } from './CreateProjectIssueForm';
import { AppModal } from '../../../widget/Modal/AppModal';

import './IssueCreatorModal.scss';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../../widget/Modal/ModalFooter/ModalFooter';
import { ConfirmButtonGroup } from '../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { createProjectCardRequest } from '../../../actions/project/project-issue.action';

class IssueCreatorModalComponent extends Component<
  {
    modalVisible: boolean;
    actions: any;
    closeModal: any;
    projectID: string;
    kanbanID?: string;
  },
  {}
> {
  state = {};

  private formRef: RefObject<any>;

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleMenuClick = (event: { key: string }): void => {
    this.setState({
      selectedType: event.key
    });
  };

  private createProjectCard = (values: any) => {
    this.props.actions.createProjectCardRequest(
      {
        projectID: this.props.projectID,
        ...values
      },
      {
        callback: () => {
          this.props.closeModal();
        }
      }
    );
  };

  render() {
    return (
      <AppModal
        className="IssueCreatorModal"
        onRequestClose={this.props.closeModal}
        isOpen={this.props.modalVisible}
      >
        <ModalHeader title="新建问题" onClose={this.props.closeModal} />
        <div className="IssueCreatorModal--main">
          <CreateProjectIssueForm
            kanbanID={this.props.kanbanID}
            ref={this.formRef}
            createProjectCard={this.createProjectCard}
            projectID={this.props.projectID}
          />
        </div>
        <ModalFooter>
          <ConfirmButtonGroup
            onConfirm={() => {
              this.formRef.current.submitForm();
            }}
            onCancel={() => {
              this.props.closeModal();
            }}
          />
        </ModalFooter>
      </AppModal>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(
      {
        createProjectCardRequest: createProjectCardRequest
      },
      dispatch
    )
  };
};

export const IssueCreatorModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueCreatorModalComponent);
