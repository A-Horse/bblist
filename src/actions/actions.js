// @flow
import { values } from 'ramda';
import actionNames from './actions-name';

const ACTIONS: { [*]: * } = actionNames.reduce((result, actionName) => {
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
    request: (playload, meta) => {
      return {
        type: REQUEST_SYMBOL,
        playload,
        meta
      };
    },
    success: (playload, meta) => {
      return {
        type: SUCCESS_SYMBOL,
        playload,
        meta
      };
    },
    failure: (playload, meta) => {
      return {
        type: FAILURE_SYMBOL,
        error: true,
        playload,
        meta
      };
    },
    finish: (playload, meta) => {
      return {
        type: FINISH_SYMBOL,
        playload,
        meta
      };
    }
  };
  return result;
}, {});

export function makeActionRequestCollection() {
  return values(ACTIONS).reduce((result, actionFactor) => {
    result[actionFactor.name + '_REQUEST'] = actionFactor.request;
    result[actionFactor.name + '_FINISH'] = actionFactor.finish;
    return result;
  }, {});
}

export default ACTIONS;
