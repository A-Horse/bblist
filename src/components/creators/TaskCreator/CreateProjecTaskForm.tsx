import './TaskCreatorModal.scss';

import { Button, Form, Input } from 'antd';
import React, { Component, FormEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { createProjectCardRequest } from '../../../actions/project/kanban-card.action';
import { KanbanRecord } from '../../../typings/kanban.typing';
import { ProjectRecord } from '../../../typings/project.typing';

const FormItem = Form.Item;

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
  any
> {
  state = {
    modalVisible: false,
    errorMessages: [],
    name: ''
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

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={this.props.style} className="taskboard-creater">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Task Title">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input task board name' }]
            })(<Input type="text" placeholder="Board Name" />)}
          </FormItem>

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
  return {

  };
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
