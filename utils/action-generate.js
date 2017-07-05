export default function generate(identify) {
  const types = {
    REQUEST: identify + '_REQUEST',
    SUCCESS: identify + '_SUCCESS',
    FAILURE: identify + '_FAILURE'
  };
  return {
    ...types,
    requestAction(playload, meta) {
      return {
        type: types.REQUEST,
        playload,
        meta
      };
    },
    successAction(playload, meta) {
      return {
        type: types.SUCCESS,
        playload,
        meta
      };
    },
    failureAction(playload, meta) {
      return {
        type: types.SUCCESS,
        playload,
        meta,
        error: true
      };
    }
  };
}
