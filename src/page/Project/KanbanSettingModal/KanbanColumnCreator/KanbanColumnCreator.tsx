import './KanbanColumnCreator.scss';

import { Field, FieldProps, Form, Formik, FormikActions, FormikProps } from 'formik';
import React, { ChangeEvent, Component } from 'react';

import { AppButton } from '../../../../components/widget/Button';

interface FormValues {
  name: string;
}

export class KanbanColumnCreator extends Component<
  {
      createKanbanColumn: Function
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
          <AppButton onClick={() => this.setState({ creating: true })}>Create Column</AppButton>
        )}

        {this.state.creating && (
          <Formik
            initialValues={{ name: '' }}
            onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
              console.log({ values, actions });
              this.props.createKanbanColumn(values);
              actions.setSubmitting(false);
            }}
            render={(formikBag: FormikProps<FormValues>) => (
              <Form>
                <Field
                  name="name"
                  render={({ field, form }: FieldProps<FormValues>) => (
                    <div>
                      <input type="text" {...field} placeholder="First Name" />
                      {form.touched.name && form.errors.name && form.errors.name}
                    </div>
                  )}
                />
                <AppButton htmlType="submit">OK</AppButton>
              </Form>
            )}
          />
        )}
      </div>
    );
  }
}
