import './TaskCreatorModal.scss';

import { Button, Input } from 'antd';
import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createProjectCardRequest } from '../../../actions/project/kanban-card.action';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { ProjectRecord } from '../../../typings/project.typing';
import { KanbanSelect } from '../../stateful-component/KanbanSelect/KanbanSelect';
import { ColumnSelect } from '../../stateful-component/ColumnSelect/ColumnSelect';
import { SelectOption } from '../../../typings/select.typing';
import { AppButton } from '../../widget/Button';
import { Formik, Field, FormikActions, Form, FormikProps, FieldProps } from 'formik';


interface FormData {
  title: string;
}

class CreateProjectTaskFormBase extends Component<
  {
    form: any;
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

  handleSubmit = (event: FormEvent<any>) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: FormData) => {
      if (!err) {
        this.props.actions.createProjectCardRequest({
          projectId: this.props.project!.get('id'),
          ...values
        });
      }
    });
  };

  onKanbanSelectChange = (seleced?: SelectOption) => {
    if (!seleced) {
      return;
    }
    this.setState({
      selectedKanbanId: seleced.value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={this.props.style} className="taskboard-creater">
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
                render={({ field, form }: FieldProps<FormikValues>) => (
                  <div>
                    <input type="text" {...field} placeholder="First Name" />
                    {form.touched.name && form.errors.name && form.errors.name}
                  </div>
                )}
              />
              <AppButton type="submit">OK</AppButton>
            </Form>
          )}
        />

        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Task Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input task board name' }]
            })(<Input type="text" placeholder="Board Name" />)}
          </FormItem>

          <KanbanSelect
            projectId={this.props.project!.get('id')}
            onChange={this.onKanbanSelectChange}
          />

          <ColumnSelect kanbanId={this.state.selectedKanbanId} />

          <FormItem>
            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const CreateProjectTaskFormWrapper = Form.create()(CreateProjectTaskFormBase);

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
)(CreateProjectTaskFormWrapper);
