export const BODY_ADD_EVENT = 'BODY_ADD_EVENT';
export const BODY_REMOVE_EVENT = 'BODY_REMOVE_EVENT';
export const BODY_ADD_EVENT_ONCE = 'BODY_ADD_EVENT_ONCE';

function addBodyEvent(fn, useCapture) {
  return {
    type: BODY_ADD_EVENT,
    fn,
    useCapture
  };
}

function removeBodyEvent(fn) {
  return {
    type: BODY_REMOVE_EVENT,
    fn
  };
}

function addBodyEventOnce(fn, useCapture) {
  function onceFn() {
    fn();
    removeBodyEvent(fn);
  }
  return {
    type: BODY_ADD_EVENT_ONCE,
    fn: onceFn,
    useCapture
  };
}

export function addBodyEventListener(fn, useCapture = false) {
  return dispatch => dispatch(addBodyEvent(fn, useCapture));
}

export function addBodyEventListenerOnce(fn, useCapture = false) {
  return dispatch => dispatch(addBodyEventOnce(fn, useCapture));
}
