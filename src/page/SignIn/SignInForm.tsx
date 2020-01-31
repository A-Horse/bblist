import { Button, Form, Icon, Input } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import React, { Component, FormEvent } from 'react';

import { AppButton } from '../../components/widget/Button';

interface Props {
  form: WrappedFormUtils;
  onSubmit: (values: any) => void;
}

export interface SignInData {
  email: string;
  password: string;
}

class SignInForm extends Component<Props> {
  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: SignInData) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }]
          })(
            <Input
              size="large"
              type="email"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <AppButton htmlType="submit" className="login-form-button">
            Log in
          </AppButton>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedSignInForm = Form.create()(SignInForm);
