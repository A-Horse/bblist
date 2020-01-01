import './KanbanCreator.scss';

import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch
} from 'redux';

import { createKanbanRequest } from '../../../actions/project/kanban.action';
import { AppButton } from '../../../components/widget/Button';
import { CreateKanbanInput } from '../../../typings/kanban.typing';
import { ProjectRecord } from '../../../typings/project.typing';

const FormItem = Form.Item;

class KanbanCreatorComponent extends Component<
  {
    toggle: boolean;
    onClose: () => void;
    project: ProjectRecord;
    actions: ActionCreatorsMapObject;
  } & FormComponentProps,
  any
> {
  state = {
    errorMessages: [],
    name: ''
  };

  handleCancel = () => {
    this.props.onClose();
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll(
      (err: any, values: CreateKanbanInput) => {
        if (!err) {
          this.props.actions.createKanbanRequest({
            ...values,
            projectId: this.props.project.get('id')
          });
          this.handleCancel();
        }
      }
    );
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title="Create Kanban"
        onCancel={this.handleCancel}
        visible={this.props.toggle}
        footer={null}
      >
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please input task board name' }
                ]
              })(<Input type="text" placeholder="Board Name" />)}
            </FormItem>

            <FormItem>
              <AppButton htmlType="submit">Done</AppButton>
            </FormItem>
          </Form>
        </div>
      </Modal>
    );
  }
}

export const KanbanCreatorComponentFormWrapper = Form.create()(
  KanbanCreatorComponent
);

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        createKanbanRequest: createKanbanRequest
      },
      dispatch
    )
  };
};

export const KanbanCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(KanbanCreatorComponentFormWrapper);
