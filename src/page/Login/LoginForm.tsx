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
  email: string;
  password: string;
}

const FormSchema = Yup.object().shape({
  email: Yup.string().required('邮箱为必填项'),
  password: Yup.string().required('密码为必填项'),
});

export class LoginForm extends Component<Props> {
  render() {
    return (
      <Formik
        validationSchema={FormSchema}
        initialValues={
          {
            email: '',
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
                <Field name="email" required>
                  {({ field, form }: FieldProps<FormikValues>) => (
                    <FormField
                      require={true}
                      name="邮箱"
                      errorMessage={<ErrorMessage name="email" />}
                    >
                      <Input
                        type="text"
                        size="middle"
                        value={form.values.title}
                        placeholder=""
                        onChange={(value) => {
                          formikBag.setFieldValue('email', value);
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
                        type="password"
                        size="middle"
                        value={form.values.title}
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
