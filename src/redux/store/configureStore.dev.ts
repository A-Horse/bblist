import { compose, createStore } from 'redux';

import { DevTools } from '../../components/DevTools';

export default function configureStore(rootReducer: any, middle: any, cb: any) {
  const enhancer = compose(middle, DevTools.instrument());
  const store = createStore(rootReducer, enhancer);

  cb && cb();
  return store;
}
