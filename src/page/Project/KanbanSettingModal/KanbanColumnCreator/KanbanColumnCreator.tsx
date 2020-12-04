import './KanbanColumnCreator.scss';

import { Field, Formik, FormikHelpers, FormikProps } from 'formik';
import React, { Component } from 'react';

import { AppButton } from '../../../../widget/Button';
import { Input } from '../../../../widget/Input/Input';
import { AppIcon } from '../../../../widget/Icon';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Flex } from '../../../../widget/Layout/Flex';

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
    name: '',
  };

  render() {
    return (
      <div>
        {!this.state.creating && (
          <AppButton
            type="primary"
            onClick={() => this.setState({ creating: true })}
          >
            <AppIcon
              style={{
                marginRight: 3,
              }}
              icon={faPlusCircle}
            />
            创建价值列
          </AppButton>
        )}

        {this.state.creating && (
          <Formik
            initialValues={{ name: '' } as FormValues}
            onSubmit={(
              values: FormValues,
              actions: FormikHelpers<FormValues>
            ) => {
              this.props.createKanbanColumn(values);
              actions.setSubmitting(false);
              actions.resetForm();
              this.setState({ creating: false });
            }}
          >
            {(formikBag: FormikProps<FormValues>) => (
              <form onSubmit={formikBag.handleSubmit}>
                <Flex>
                  <Field name="name">
                    {({
                      field, // { name, value, onChange, onBlur }
                      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                      meta,
                    }) => {
                      return (
                        <div>
                          <Input
                            placeholder="请输入价值列名称"
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
                  <AppButton
                    style={{
                      marginLeft: 8,
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    确定
                  </AppButton>
                </Flex>
              </form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}
