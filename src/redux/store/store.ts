import { applyMiddleware, combineReducers } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootEpic from '../epic/index';
import * as reducers from '../reducer';
import { configureStore } from './configureStore';
import { responseFailureInterceptor } from "../../utils/http-interceptor";

const client = axios.create({
  baseURL: '/api',
  responseType: 'json',
});

const epicMiddleware = createEpicMiddleware();

export const store = configureStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(
    axiosMiddleware(client, {
      returnRejectedPromiseOnError: true,
    }, {
      interceptors: {
        response: [
          {
            success: function ({getState, dispatch, getSourceAction}, res) {
              return Promise.resolve(res);
            },
            error: function ({getState, dispatch, getSourceAction}, error) {
              return responseFailureInterceptor(error);
            }
          }
        ]
      }
    }),
    epicMiddleware
  ),
  () => {
    epicMiddleware.run(rootEpic);
  }
);
