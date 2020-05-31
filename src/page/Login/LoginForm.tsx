import React, { Component } from 'react';
import { AppButton } from '../../widget/Button';
import { Input } from '../../widget/Input/Input';
import {
  ErrorMessage,
  Field,
  FieldProps,
  Formik,
  FormikHelpers,
  FormikProps,
  FormikValues,
} from 'formik';
import * as Yup from 'yup';
import { FormField } from '../../widget/FormField/FormField';

interface Props {
  onSubmit: any;
}

export interface FormValues {
  username: string;
  password: string;
  z;
}

const FormSchema = Yup.object().shape({
  username: Yup.string().required('用戶名为必填项'),
  password: Yup.string().required('密码为必填项'),
});

export class LoginForm extends Component<Props> {
  render() {
    return (
      <Formik
        validationSchema={FormSchema}
        initialValues={
          {
            username: '',
            password: '',
          } as FormValues
        }
        onSubmit={(values: FormValues, actions: FormikHelpers<FormValues>) => {
          this.props.onSubmit(values);
          actions.setSubmitting(false);
        }}
      >
        {(formikBag: FormikProps<FormValues>) => {
          return (
            <form onSubmit={formikBag.handleSubmit}>
              <div>
                <Field name="username" required>
                  {({ form }: FieldProps<FormikValues>) => (
                    <FormField
                      require={true}
                      name="用戶名"
                      errorMessage={<ErrorMessage name="username" />}
                    >
                      <Input
                        name={'username'}
                        type="text"
                        size="middle"
                        value={form.values.username}
                        placeholder=""
                        onChange={(value) => {
                          formikBag.setFieldValue('username', value);
                        }}
                      />
                    </FormField>
                  )}
                </Field>

                <Field name="password" required>
                  {({ field, form }: FieldProps<FormikValues>) => (
                    <FormField
                      require={true}
                      name="密码"
                      errorMessage={<ErrorMessage name="password" />}
                    >
                      <Input
                        name={'password'}
                        type="password"
                        size="middle"
                        value={form.values.password}
                        placeholder=""
                        onChange={(value) => {
                          formikBag.setFieldValue('password', value);
                        }}
                      />
                    </FormField>
                  )}
                </Field>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <AppButton
                    htmlType="submit"
                    type="primary"
                    className="login-form-button"
                  >
                    登陆
                  </AppButton>
                </div>
              </div>
            </form>
          );
        }}
      </Formik>
    );
  }
}
