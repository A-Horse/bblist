import './CreateTodoTaskForm.scss';

import { Form, Input, Modal } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../../actions/actions';
import { AppButton } from '../../../components/widget/Button';
import { AppRangePicker } from '../../widget/DatePicker/DatePicker';

const FormItem = Form.Item;

class CreateTodoTaskFormBase extends Component<
  {
    form: any;
    actions: any;
    style: any;
    onCancel: () => void;
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
          
          <div className="app-button-group">
            <AppButton onClick={this.props.onCancel}>Cancel</AppButton>

            <AppButton htmlType="submit">Done</AppButton>
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

export const CreateTodoTaskForm = connect(mapStateToProps, mapDispatchToProps)(CreateTodoTaskFormWrapper);
