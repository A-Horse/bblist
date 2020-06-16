import React from 'react';
import { useDispatch } from 'react-redux';
import { CreateProjectIssueForm } from './CreateProjectIssueForm';
import { AppModal } from '../../../widget/Modal/AppModal';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../../widget/Modal/ModalFooter/ModalFooter';
import { ConfirmButtonGroup } from '../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { createIssueRequest } from '../../../redux/actions/issue.action';

import './IssueCreatorModal.scss';

import * as Yup from 'yup';
import { AxiosDispatch } from '../../../typings/util.typing';
import { getProjectIssueDetailRequest } from '../../../redux/actions/project-issue-detail.action';

export interface FormValues {
  title: string;
  content?: string;
  kanbanId?: string;
  columnId?: string;
}

const FormSchema = Yup.object().shape({
  title: Yup.string().required('标题为必填项'),
});

export function IssueCreatorModal(props: {
  modalVisible: boolean;
  closeModal: () => void;
  projectId: string;
  kanbanId?: string;
}) {
  const dispatch = useDispatch<AxiosDispatch>();

  const createProjectIssue = (values: FormValues) => {
    dispatch(
      createIssueRequest({
        projectId: props.projectId,
        ...values,
      })
    ).then((result) => {
      dispatch(
        getProjectIssueDetailRequest({ issueId: result.payload.data })
      ).then();
      props.closeModal();
    });
  };

  return (
    <AppModal
      className="IssueCreatorModal"
      onRequestClose={props.closeModal}
      isOpen={props.modalVisible}
    >
      <ModalHeader title="新建问题" onClose={props.closeModal} />

      <Formik
        validationSchema={FormSchema}
        initialValues={
          {
            title: '',
            content: undefined,
            kanbanId: props.kanbanId,
            columnId: undefined,
          } as FormValues
        }
        onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
          createProjectIssue(values);
          actions.setSubmitting(false);
        }}
        render={(formikBag: FormikProps<FormValues>) => {
          return (
            <>
              <div className="IssueCreatorModal--main">
                <CreateProjectIssueForm
                  kanbanId={props.kanbanId}
                  projectId={props.projectId}
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
                    props.closeModal();
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
