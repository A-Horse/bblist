// TODO install Raven-js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './style/antd.css';

import { store } from './store/store';
import Root from './page/Root/Root';
import { getJWT } from './utils/auth';
import { setupAxiosJwtHeader, setupAxiosInterceptor } from './helper/http-intercetor';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

library.add(faCheckCircle);

// TODO 考虑在前端也通过时间判断自动登出
setupAxiosInterceptor();
setupAxiosJwtHeader(getJWT());

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
