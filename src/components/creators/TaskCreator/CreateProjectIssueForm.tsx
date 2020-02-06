import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikActions,
  FormikProps,
  FormikValues
} from 'formik';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProjectCardRequest } from '../../../actions/project/project-issue.action';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { SelectOption } from '../../../typings/select.typing';
import { ColumnSelect } from '../../Project/ColumnSelect/ColumnSelect';
import { KanbanSelect } from '../../Project/KanbanSelect/KanbanSelect';
import { AppButton } from '../../../widget/Button';
import { FormField } from '../../../widget/FormField/FormField';
import Input from '../../../widget/Input/Input';
import { Divider } from '../../../widget/Divider';

import './CreateProjectIssueForm.scss';

interface FormValues {
  title: string;
  kanbanID: string | null;
  columnID: string | null;
}

class CreateProjectIssueFormComponent extends Component<
  {
    projectID: string;
    actions: any;
    style?: any;
    onCancel?: () => void;
    kanban?: KanbanRecord;
  },
  {
    name: any;
    errorMessages: any;
  }
> {
  state = {
    errorMessages: [],
    name: ''
  };

  createProjectCard(values: any) {
    this.props.actions.createProjectCardRequest({
      projectID: this.props.projectID,
      ...values
    });
  }

  render() {
    return (
      <Formik
        initialValues={{ title: '', kanbanID: null, columnID: null }}
        onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
          this.createProjectCard(values);
          actions.setSubmitting(false);
        }}
        render={(formikBag: FormikProps<FormValues>) => {
          return (
            <Form className="CreateProjectIssueForm">
              <div className="CreateProjectIssueForm--section">
                <Field
                  name="kanbanID"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="所在看板">
                      <KanbanSelect
                        projectId={this.props.projectID}
                        onChange={(selected: SelectOption) => {
                          formikBag.setFieldValue('kanbanID', selected.value);
                        }}
                      />
                      {form.touched.kanbanID &&
                        form.errors.kanbanID &&
                        form.errors.kanbanID}
                    </FormField>
                  )}
                />
                <Field
                  name="columnID"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="所在价值列">
                      <ColumnSelect
                        kanbanID={form.values.kanbanID}
                        onChange={(selected: SelectOption) =>
                          formikBag.setFieldValue('columnID', selected.value)
                        }
                      />
                      {form.touched.name &&
                        form.errors.name &&
                        form.errors.name}
                    </FormField>
                  )}
                />
              </div>

              <Divider />

              <div className="CreateProjectIssueForm--section">
                <Field
                  name="title"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="问题标题">
                      <Input
                        type="text"
                        size="large"
                        value={form.values.title}
                        placeholder="标题"
                        onChange={value => {
                          formikBag.setFieldValue('title', value);
                        }}
                      />
                      {form.touched.name &&
                        form.errors.name &&
                        form.errors.name}
                    </FormField>
                  )}
                />

                <AppButton type="primary" htmlType="submit">
                  新建
                </AppButton>

              
              </div>
            </Form>
          );
        }}
      />
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

export const CreateProjectIssueForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectIssueFormComponent);
