//
import React, { Component } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { AppIcon } from '../../../components/widget/Icon';
import './TaskBoardCreater.scss';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../../../actions/actions';
import { bindActionCreators } from 'redux';

const FormItem = Form.Item;

class TaskBoardCreaterBase extends Component<any, any> {

  state = {
    modalVisible: false,
    errorMessages: [],
    name: ''
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        this.props.actions.ADD_TASK_BOARD_REQUEST(values);
        this.handleCancel();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="taskboard-creater">

      <div onClick={() => this.setState({ modalVisible: true })}>
        <AppIcon icon="columns" />
          Project
      </div>
         

        <Modal
          title="Create Project"
          onCancel={this.handleCancel}
          visible={this.state.modalVisible}
          footer={null}
        >
          <div>
            <img className="taskboard-creater--illustration" src="/assets/images/work.png" />

            <Form onSubmit={this.handleSubmit}>
              <FormItem>
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
        </Modal>
      </div>
    );
  }
}

export const TaskBoardCreaterWithForm = Form.create()(TaskBoardCreaterBase);


const mapStateToProps = (state: any) => {
  return {

  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

export const TaskBoardCreater =  connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskBoardCreaterWithForm);
