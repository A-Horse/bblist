import './style/antd.css';

import { applyPolyfills, defineCustomElements } from 'coke-component/loader';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Provider } from 'react-redux';
import { DefaultToastContainer, ToastProvider } from 'react-toast-notifications';

import { JSX as LocalJSX } from '@stencil/core';

import { setupAxiosInterceptor, setupAxiosJwtHeader } from './helper/http-intercetor';
import Root from './page/Root/Root';
import { store } from './store/store';
import { getJWT } from './utils/auth';

declare global {
  namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}

// TODO 考虑在前端也通过时间判断自动登出
setupAxiosInterceptor();
setupAxiosJwtHeader(getJWT());


// TODO extract
export const MyCustomToastContainer = (props: any) => <DefaultToastContainer {...props} style={{ zIndex: 9999999 }} />;

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider autoDismissTimeout={6000} components={{ ToastContainer: MyCustomToastContainer }}>
      <Root />
    </ToastProvider>
  </Provider>,
  document.getElementById('root')
);

Modal.setAppElement('#root');

applyPolyfills().then(() => {
  defineCustomElements(window);
});
