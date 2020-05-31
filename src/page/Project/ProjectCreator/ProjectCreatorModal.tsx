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

import * as Yup from 'yup';

const createProjectSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, '请输入2至20位的名字')
    .max(20, '请输入2至20位的名字')
    .required('请输入项目名字'),
  identify: Yup.string()
    .min(2, '请输入2至15位的标识符')
    .max(15, '请输入2至15位的标识符')
    .matches(/^[A-Za-z][A-Za-z0-9]+$/, '请输入字母或数字并保持字母开头')
    .required('请输入项目标识符'),
});

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
        initialValues={{ name: '', identify: '' }}
        validationSchema={createProjectSchema}
        onSubmit={(values, actions) => {
          createProject(values);
          actions.setSubmitting(false);
          onClose();
        }}
      >
        {(props) => (
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

              <FormField>
                <Field name="identify">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div>
                      <Input
                        name="identify"
                        placeholder="项目标识符"
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
