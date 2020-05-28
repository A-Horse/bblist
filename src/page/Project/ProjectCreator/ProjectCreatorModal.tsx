import './ProjectCreatorModal.scss';

import React from 'react';
import { useDispatch } from 'react-redux';

import { createProjectRequest } from '../../../redux/actions/project/project.action';
import { AppModal } from '../../../widget/Modal/AppModal';
import { Field, Formik } from 'formik';
import { FormField } from '../../../widget/FormField/FormField';
import { Input } from '../../../widget/Input/Input';
import { ConfirmButtonGroup } from '../../../widget/ButtonGroup/ConfirmGroup/ConfirmGroup';
import { ModalHeader } from '../../../widget/Modal/ModalHeader/ModalHeader';
import { ModalFooter } from '../../../widget/Modal/ModalFooter/ModalFooter';
import { CreateProjectInput } from '../../../typings/project.typing';

export function ProjectCreatorModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const createProject = (values: CreateProjectInput) => {
    dispatch(createProjectRequest(values));
  };

  return (
    <AppModal
      className="ProjectCreatorModal"
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <ModalHeader title="新建项目" onClose={onClose} />

      <Formik
        initialValues={{ name: '' }}
        onSubmit={(values, actions) => {
          createProject(values);
          actions.setSubmitting(false);
          onClose();
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <div className="ProjectCreatorModal-form">
              <FormField>
                <Field name="name">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <Input
                        name="name"
                        placeholder="输入项目名称"
                        value={field.value}
                        onChangeEvent={field.onChange}
                      />
                      {meta.touched && meta.error && (
                        <div className="error">{meta.error}</div>
                      )}
                    </div>
                  )}
                </Field>
              </FormField>
            </div>
            <ModalFooter>
              <ConfirmButtonGroup
                confirmButtonHtmlType="submit"
                onConfirm={() => {}}
                onCancel={() => {}}
              />
            </ModalFooter>
          </form>
        )}
      </Formik>
    </AppModal>
  );
}
