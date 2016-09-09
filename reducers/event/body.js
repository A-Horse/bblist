import {
  BODY_ADD_EVENT, BODY_ADD_EVENT_ONCE
} from '../../actions/event/body';

function maketoAssignObj(state, action) {
  const handleName = action.useCaptue ? 'captureHandles' : 'bubbleHandles';
  const handles = state[handleName].concat([action.fn]);
  return action.useCaptue ? {captureHandles: handles} : {bubbleHandles: handles};
}

function body(state = {
  bubbleHandles: [],
  captureHandles: []
}, action) {
  switch (action.type) {
  case BODY_ADD_EVENT:
  case BODY_ADD_EVENT_ONCE:
    return Object.assign({}, state, maketoAssignObj(state, action));
    break;
  default:
    return state;
  }
}

export default body;
