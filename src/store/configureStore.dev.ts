import { createStore, compose } from 'redux';
import { DevTools } from '../tool/DevTools';

export default function configureStore(rootReducer: any, middle: any, cb: any) {
  const enhancer = compose(
    middle,
    DevTools.instrument()
  );
  const store = createStore(rootReducer, enhancer);

  cb && cb();
  return store;
}
