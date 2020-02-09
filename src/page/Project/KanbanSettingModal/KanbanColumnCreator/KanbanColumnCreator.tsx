import './KanbanColumnCreator.scss';

import { Field, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { Component } from 'react';

import { AppButton } from '../../../../widget/Button';
import { Input } from '../../../../widget/Input/Input';
import { AppIcon } from '../../../../widget/Icon';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

interface FormValues {
  name: string;
}

export class KanbanColumnCreator extends Component<
  {
    createKanbanColumn: Function;
  },
  {
    creating: boolean;
    name: string;
  }
> {
  state = {
    creating: false,
    name: ''
  };

  render() {
    return (
      <div>
        {!this.state.creating && (
          <AppButton onClick={() => this.setState({ creating: true })}>
            <AppIcon icon={faPlusCircle} /> 创建价值列
          </AppButton>
        )}

        {this.state.creating && (
          <Formik
            initialValues={{ name: 'sss2' } as FormValues}
            onSubmit={(
              values: FormValues,
              actions: FormikHelpers<FormValues>
            ) => {
              console.log('values', values);
              this.props.createKanbanColumn(values);
              actions.setSubmitting(false);
            }}
            render={(formikBag: FormikProps<FormValues>) => (
              <form onSubmit={formikBag.handleSubmit}>
                <Field name="name">
                  {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta
                  }) => {
                    console.log('field', field);
                    console.log('form', touched, errors);
                    console.log('meta', meta);

                    return (
                      <div>
                        <Input
                          name="name"
                          value={field.value}
                          onChangeEvent={field.onChange}
                        />

                        {meta.touched && meta.error && (
                          <div className="error">{meta.error}</div>
                        )}
                      </div>
                    );
                  }}
                </Field>
                <AppButton htmlType="submit">OK</AppButton>
              </form>
            )}
          />
        )}
      </div>
    );
  }
}
