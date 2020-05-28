import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Logo } from '../../components/Logo/Logo';
import { TextLogo } from '../../components/TextLogo';
import { updateTitle } from '../../services/title';
import { LoginForm } from './LoginForm';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/actions/login.action';
import { useToasts } from 'react-toast-notifications';
import { AxiosResponse } from 'axios';

import './LoginPage.scss';

export function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();

  const login = ({ username, password }) => {
    dispatch(
      loginRequest({
        username,
        password,
        onSuccess: () => {
          history.push('/projects');
          return addToast('登录成功', {
            appearance: 'success',
            autoDismiss: true,
          });
        },
        onError: (response: AxiosResponse) => {
          return addToast(
            response && response.status === 401
              ? '用户名或密码错误'
              : '登录失败',
            {
              appearance: 'error',
              autoDismiss: true,
            }
          );
        },
      })
    );
  };

  useEffect(() => {
    updateTitle('登陆');
  }, []);

  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login-main--logo-container">
          <Logo
            style={{
              width: 45,
            }}
          />
          <TextLogo />
        </div>

        <LoginForm onSubmit={login} />

        <div style={{ textAlign: 'center', marginTop: 12 }}>
          还没有账户?
          <Link className="login-link" to="/signup">
            注册
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
