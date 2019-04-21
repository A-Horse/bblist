import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { AppIcon } from '../../../components/widget/Icon';

import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../../../actions/actions';
import { bindActionCreators } from 'redux';
import { TaskCreatorModal } from './TaskCreatorModal';

const FormItem = Form.Item;

class CreateTodoTaskFormBase extends Component<
  {
    form: any;
    actions: any;
  },
  any
> {
  state = {
    modalVisible: false,
    errorMessages: [],
    content: ''
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.props.actions.ADD_TODO_REQUEST(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="taskboard-creater">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="Todo content">
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input task board name' }]
            })(<Input type="text" placeholder="" />)}
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

const CreateTodoTaskFormWrapper = Form.create()(CreateTodoTaskFormBase);

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

export const CreateTodoTaskForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTodoTaskFormWrapper);
