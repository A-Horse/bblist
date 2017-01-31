import R from 'ramda';

export function wrapDispathToAction(actions, mapDispatchToProps) {
  return function(dispatch) {
    const wrapedActions = Object.keys(actions).reduce((mapStateToProps, actionName) => {
      mapStateToProps[actionName] = function(...args) {
        return dispatch(actions[actionName](...args));
      };
      return mapStateToProps;
    }, {});
    return !!mapDispatchToProps ? R.merge(mapDispatchToProps(dispatch), wrapedActions) : wrapedActions;
  };
}
