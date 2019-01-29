import { values } from 'ramda';
import actionNames from './actions-name';

const ACTIONS: {
  [string: string]: {
    name: string;
    REQUEST: string;
    SUCCESS: string;
    FINISH: string;
    request: any;
    success: any;
    failure: any;
    finish: any;
  };
} = actionNames.reduce((result: any, actionName: string) => {
  const REQUEST_SYMBOL = actionName + '_REQUEST';
  const SUCCESS_SYMBOL = actionName + '_SUCCESS';
  const FAILURE_SYMBOL = actionName + '_FAILURE';
  const FINISH_SYMBOL = actionName + '_FINISH';

  result[actionName] = {
    name: actionName,
    REQUEST: REQUEST_SYMBOL,
    SUCCESS: SUCCESS_SYMBOL,
    FAILURE: FAILURE_SYMBOL,
    FINISH: FINISH_SYMBOL,
    request: (payload: any, meta: any) => {
      return {
        type: REQUEST_SYMBOL,
        payload,
        meta
      };
    },
    success: (payload: any, meta: any) => {
      return {
        type: SUCCESS_SYMBOL,
        payload,
        meta
      };
    },
    failure: (payload: any, meta: any) => {
      return {
        type: FAILURE_SYMBOL,
        error: true,
        payload,
        meta
      };
    },
    finish: (payload: any, meta: any) => {
      return {
        type: FINISH_SYMBOL,
        payload,
        meta
      };
    }
  };
  return result;
}, {});

export function makeActionRequestCollection() {
  return values(ACTIONS).reduce((result: any, actionFactor: any) => {
    result[actionFactor.name + '_REQUEST'] = actionFactor.request;
    result[actionFactor.name + '_FINISH'] = actionFactor.finish;
    return result;
  }, {});
}

export default ACTIONS;
