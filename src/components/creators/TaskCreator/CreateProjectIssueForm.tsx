import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProjectCardRequest } from '../../../actions/project/project-issue.action';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { ProjectRecord } from '../../../typings/project.typing';
import { KanbanSelect } from '../../stateful-component/KanbanSelect/KanbanSelect';
import { ColumnSelect } from '../../stateful-component/ColumnSelect/ColumnSelect';
import { SelectOption } from '../../../typings/select.typing';
import { AppButton } from '../../widget/Button';
import { Formik, Field, FormikActions, Form, FormikProps, FieldProps, FormikValues } from 'formik';
import { FormField } from '../../widget/FormField/FormField';
import { AppInput } from '../../widget/AppInput';
import Input from '../../widget/Input/Input';

interface FormValues {
  title: string;
  kanbanId: string | null;
  columnId: string | null;
}

class CreateProjectIssueFormComponent extends Component<
  {
    actions: any;
    style?: any;
    onCancel?: () => void;
    kanban?: KanbanRecord;
    project?: ProjectRecord;
  },
  {
    name: any;
    errorMessages: any;
  }
> {
  state = {
    errorMessages: [],
    name: '',
  };


  createProjectCard(values: any) {
    this.props.actions.createProjectCardRequest({
      projectId: this.props.project!.get('id'),
      ...values
    });
  }

  render() {
    return (
      <div style={this.props.style} className="taskboard-creater">
        <Formik
          initialValues={{ title: '', kanbanId: null, columnId: null }}
          onSubmit={(values: FormValues, actions: FormikActions<FormValues>) => {
            console.log({ values, actions });
            this.createProjectCard(values);
            actions.setSubmitting(false);
          }}
          render={(formikBag: FormikProps<FormValues>) => {
            return (
              <Form>
                <Field
                  name="title"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="问题标题">
                      <Input
                        type="text"
                        size="large"
                        value={form.values.title}
                        placeholder="标题"
                        onChange={(value) => {
                          formikBag.setFieldValue('title', value);
                        }}
                      />
                      {form.touched.name && form.errors.name && form.errors.name}
                    </FormField>
                  )}
                />
                <Field
                  name="kanbanId"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="所在看板">
                      <KanbanSelect
                        projectId={this.props.project!.get('id')}
                        onChange={(selected: SelectOption) => {
                          formikBag.setFieldValue('kanbanId', selected.value);
                        }}
                      />
                      {form.touched.kanbanId && form.errors.kanbanId && form.errors.kanbanId}
                    </FormField>
                  )}
                />
                <Field
                  name="columnId"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <FormField name="所在列表">
                      <ColumnSelect
                        kanbanId={form.values.kanbanId}
                        onChange={(selected: SelectOption) => formikBag.setFieldValue('columnId', selected.value)}
                      />
                      {form.touched.name && form.errors.name && form.errors.name}
                    </FormField>
                  )}
                />
                <AppButton htmlType="submit">OK</AppButton>
              </Form>
            );
          }}
        />
      </div>
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
