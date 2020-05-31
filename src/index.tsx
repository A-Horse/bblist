import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import {
  DefaultToastContainer,
  ToastProvider,
} from 'react-toast-notifications';
import {
  setupAxiosInterceptor,
  setupAxiosJwtHeader,
} from './utils/http-interceptor';
import Root from './page/Root/Root';
import { store } from './redux/store/store';
import { getJWT } from './utils/auth';
import * as serviceWorker from './serviceWorker';

if (process.env.REACT_APP_OCTOPUS_WEB_SENTRY_DSN) {
  console.log(
    'OCTOPUS_WEB_SENTRY_DSN',
    process.env.REACT_APP_OCTOPUS_WEB_SENTRY_DSN
  );
  const Sentry = require('@sentry/browser');
  Sentry.init({
    dsn: process.env.REACT_APP_OCTOPUS_WEB_SENTRY_DSN,
  });
}

// TODO 在前端也通过时间判断自动登出
setupAxiosInterceptor();
setupAxiosJwtHeader(getJWT());

// TODO extract
const MyCustomToastContainer = (props: any) => (
  <DefaultToastContainer {...props} style={{ zIndex: 9999999 }} />
);

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider
      autoDismissTimeout={6000}
      components={{ ToastContainer: MyCustomToastContainer }}
    >
      <Root />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

Modal.setAppElement('#root');

serviceWorker.register();
