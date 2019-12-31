import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';

export function createTestProvider(state: any) {
  const store = createStore(function() {
    return state;
  });
  return function(props: any) {
    return <Provider store={store}>{props.children}</Provider>;
  };
}
