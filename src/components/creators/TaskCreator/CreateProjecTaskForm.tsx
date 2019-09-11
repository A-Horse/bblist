import './TaskCreatorModal.scss';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createProjectCardRequest } from '../../../actions/project/kanban-card.action';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { ProjectRecord } from '../../../typings/project.typing';
import { KanbanSelect } from '../../stateful-component/KanbanSelect/KanbanSelect';
import { ColumnSelect } from '../../stateful-component/ColumnSelect/ColumnSelect';
import { SelectOption } from '../../../typings/select.typing';
import { AppButton } from '../../widget/Button';
import { Formik, Field, FormikActions, Form, FormikProps, FieldProps, FormikValues } from 'formik';

interface FormValues {
  title: string;
  kanbanId: string | null;
  columnId: string | null;
}

class CreateProjectTaskFormComponent extends Component<
  {
    actions: any;
    style?: any;
    onCancel?: () => void;
    kanban?: KanbanRecord;
    project?: ProjectRecord;
  },
  {
    selectedKanbanId?: string;
    name: any;
    errorMessages: any;
  }
> {
  state = {
    errorMessages: [],
    name: '',
    selectedKanbanId: undefined
  };

  onKanbanSelectChange = (seleced?: SelectOption) => {
    if (!seleced) {
      return;
    }
    this.setState({
      selectedKanbanId: seleced.value
    });
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
                    <div>
                      <input type="text" {...field} placeholder="title" />
                      {form.touched.name && form.errors.name && form.errors.name}
                    </div>
                  )}
                />
                <Field
                  name="kanbanId"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <div>
                      <KanbanSelect
                        projectId={this.props.project!.get('id')}
                        onChange={(selected: SelectOption) => {
                          formikBag.setFieldValue('kanbanId', selected.value);
                        }}
                      />
                      {form.touched.kanbanId && form.errors.kanbanId && form.errors.kanbanId}
                    </div>
                  )}
                />
                <Field
                  name="columnId"
                  render={({ field, form }: FieldProps<FormikValues>) => (
                    <div>
                      <ColumnSelect
                        kanbanId={form.values.kanbanId}
                        onChange={(selected: SelectOption) =>
                          formikBag.setFieldValue('columnId', selected.value)
                        }
                      />
                      {form.touched.name && form.errors.name && form.errors.name}
                    </div>
                  )}
                />
                <AppButton type="submit">OK</AppButton>
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

export const CreateProjectTaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProjectTaskFormComponent);
