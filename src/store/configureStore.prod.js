import { createstore } from 'redux';

export default function configurestore(rootreducer, middle) {
  const store = createstore(rootreducer, middle);

  return store;
}
