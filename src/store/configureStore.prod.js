//
import { createStore } from 'redux';

export default function configureStore(rootreducer, middle, cb) {
  const store = createStore(rootreducer, middle);

  cb && cb();
  return store;
}
