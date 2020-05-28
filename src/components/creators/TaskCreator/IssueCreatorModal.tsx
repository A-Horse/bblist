import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CreateProjectIssueForm } from './CreateProjectIssueForm';
import { AppModal } from '../../../widget/Modal/AppModal';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../../widget/Modal/ModalFooter/ModalFooter';
import { ConfirmButtonGroup } from '../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { createProjectCardRequest } from '../../../redux/actions/project/project-issue.action';

import './IssueCreatorModal.scss';

import * as Yup from 'yup';

export interface FormValues {
  title: string;
  content?: string;
  kanbanID?: string;
  columnID?: string;
}

const FormSchema = Yup.object().shape({
  title: Yup.string().required('标题为必填项')
});

class IssueCreatorModalComponent extends Component<{
  modalVisible: boolean;
  actions: any;
  closeModal: any;
  projectID: string;
  kanbanID?: string;
}> {
  private createProjectCard = (values: FormValues) => {
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

        <Formik
          validationSchema={FormSchema}
          initialValues={
            {
              title: '',
              content: undefined,
              kanbanID: this.props.kanbanID,
              columnID: undefined
            } as FormValues
          }
          onSubmit={(
            values: FormValues,
            actions: FormikHelpers<FormValues>
          ) => {
            this.createProjectCard(values);
            actions.setSubmitting(false);
          }}
          render={(formikBag: FormikProps<FormValues>) => {
            return (
              <>
                <div className="IssueCreatorModal--main">
                  <CreateProjectIssueForm
                    kanbanID={this.props.kanbanID}
                    projectID={this.props.projectID}
                    formikBag={formikBag}
                  />
                </div>
                <ModalFooter>
                  <ConfirmButtonGroup
                    confirmButtonHtmlType="submit"
                    onConfirm={() => {
                      formikBag.submitForm();
                    }}
                    onCancel={() => {
                      this.props.closeModal();
                    }}
                  />
                </ModalFooter>
              </>
            );
          }}
        />
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
