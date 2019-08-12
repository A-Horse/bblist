import './CreateTodoTaskForm.scss';

import { Button, Form, Input, Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { AppButton } from '../../../components/widget/AppButton';
import { AppIcon } from '../../../components/widget/Icon';
import { AppRangePicker } from '../../widget/Datepicker/Datepicker';
import { TaskCreatorModal } from './TaskCreatorModal';

const FormItem = Form.Item;

class CreateTodoTaskFormBase extends Component<
  {
    form: any;
    actions: any;
    style: any;
    onCancel: () => void
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
        this.props.actions.ADD_TODO_REQUEST(values, {
            closeFn: this.props.onCancel
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={this.props.style} className="CreateTodoTaskForm">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="content" style={{width: '200px'}}>
            {getFieldDecorator('content', {
              rules: [{ required: true, message: 'Please input todo task content.' }]
            })(<Input type="text" />)}
          </FormItem>

          <FormItem label="start/end date" >
            {getFieldDecorator('deadline', {
              rules: []
            })(<AppRangePicker />)}
          </FormItem>

          <div className="app-button-group">
            <AppButton onClick={this.props.onCancel}>
              Cancel
            </AppButton>

            <Button type="primary" htmlType="submit">
              Done
            </Button>
          </div>
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
