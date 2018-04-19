import { createStore } from 'redux';

export default function configureStore(rootreducer, middle) {
  const store = createStore(rootreducer, middle);

  return store;
}
