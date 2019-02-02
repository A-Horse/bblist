import { createStore } from 'redux';

export default function configureStore(rootreducer: any, middle: any, cb: any) {
  const store = createStore(rootreducer, middle);

  cb && cb();
  return store;
}
