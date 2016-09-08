export const BODY_ADD_EVENT = 'BODY_ADD_EVENT';
export const BODY_ADD_EVENT_ONCE = 'BODY_ADD_EVENT_ONCE';

function addBodyEvent(fn, useCapture) {
  return {
    type: BODY_ADD_EVENT
  };
}

function addBodyEventOnce() {
  return {
    type: BODY_ADD_EVENT_ONCE
  };
}

export function addBodyEventListener(fn, useCapture) {
  
}
