import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';
import Application from './Application';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import * as reducers from 'reducers';
import rootEpic from './epic';

const routeMiddleware = routerMiddleware(history);
const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  // DevTools.instrument(),
  applyMiddleware(thunkMiddleware, routeMiddleware, epicMiddleware)
);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    console.log('nextRootReducer', nextRootReducer);
    store.replaceReducer(
      combineReducers({
        ...nextRootReducer,
        router: routerReducer
      })
    );
  });
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Application />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  console.log('hot');

  module.hot.accept('./Application', () => {
    const NextApplication = require('./Application').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApplication />
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
