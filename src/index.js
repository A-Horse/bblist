import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './style/index.less';
import { store } from './store/store';
import Root from './page/Root/Root';
import { getJWT } from './utils/auth';
import { setupAxiosJwtHeader } from './helper/http-intercetor';

setupAxiosJwtHeader(getJWT());

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root')
);
