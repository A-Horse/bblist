
export function wrapDispathToAction(actions) {
  return function(dispatch) {
    return Object.keys(actions).reduce((mapStateToProps, actionName) => {
      mapStateToProps[actionName] = function(...args) {
        return dispatch(actions[actionName](...args));
      };
      return mapStateToProps;
    }, {});
  };
}
