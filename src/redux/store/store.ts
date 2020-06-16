import { applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootEpic from '../epic/index';
import * as reducers from '../reducer';
import { configureStore } from './configureStore';

const client = axios.create({
  baseURL: '/api',
  responseType: 'json',
});

const epicMiddleware = createEpicMiddleware();

export const store = configureStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(axiosMiddleware(client, {
    returnRejectedPromiseOnError: true
  }), epicMiddleware),
  () => {
    epicMiddleware.run(rootEpic);
  }
);
