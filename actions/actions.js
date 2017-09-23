const actionNames = [
  'TEST_ONLY',

  'IDENTIFY',

  'LOGIN',
  'LOGOUT',
  'SIGNUP',

  'UPDATE_USER',

  'ADD_TODO',
  'UPDATE_TODO',
  'GET_TODOLIST',
  'GET_TODOBOXS',
  'ADD_TODOBOX',
  'DESTORY_TODO',

  'GET_TASK_BOARD',
  'GET_TASK_ALL_BOARD',
  'ADD_TASK_CARD',
  'ADD_TASK_TRACK',
  'UPDATE_TASK_CARD',
  'DESTORY_TASK_TRACK',
  'UPDATE_TASK_TRACK',
  'UPLOAD_TASK_BOARD_COVER',
  'UPDATE_TASK_BOARD'
];

const ACTIONS = actionNames.reduce((result, actionName) => {
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

export function makeActionRequestCollection(actionFactors) {
  return actionFactors.reduce((result, actionFactor) => {
    result[actionFactor.name + '_REQUEST'] = actionFactor.request;
    result[actionFactor.name + '_FINISH'] = actionFactor.finish;
    return result;
  }, {});
}

export default ACTIONS;
