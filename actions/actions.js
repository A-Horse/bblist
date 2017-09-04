const actionNames = ['TEST_ONLY', 'IDENTIFY', 'LOGIN', 'LOGIN_FINISH'];

const ACTIONS = actionNames.reduce((result, actionName) => {
  const REQUEST_SYMBOL = actionName + '_REQUEST';
  const SUCCESS_SYMBOL = actionName + '_SUCCESS';
  const FAILURE_SYMBOL = actionName + '_FAILURE';
  result[actionName] = {
    REQUEST: REQUEST_SYMBOL,
    SUCCESS: SUCCESS_SYMBOL,
    FAILURE: FAILURE_SYMBOL,
    request: (playload, meta) => {
      return {
        type: REQUEST_SYMBOL,
        playload,
        meta
      };
    },
    success: (playload, meta) => {
      console.log(playload);
      return {
        type: SUCCESS_SYMBOL,
        playload,
        meta
      };
    },
    failure: (playload, meta) => ({
      type: FAILURE_SYMBOL,
      error: true,
      playload,
      meta
    })
  };
  return result;
}, {});

export function makeActionRequestCollection(actionNames) {
  return actionNames.reduce((result, actionName) => {
    result[actionName + '_FN'] = ACTIONS[actionName].request;
    return result;
  }, {});
}

export default ACTIONS;
