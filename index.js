import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


import configureStore from './store/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
        <App />
  </Provider>,
  document.getElementById('root')
)
