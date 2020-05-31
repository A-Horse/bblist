import { combineEpics } from 'redux-observable';
import flatten from 'ramda/src/flatten';
import map from 'ramda/src/map';
import values from 'ramda/src/values';

function requireAll(r) {
  return r.keys().map(r);
}

const epicGroups = requireAll(require.context('./', true, /epic.(js|ts)$/));
const epics = flatten(map(values, epicGroups));

const rootEpic = combineEpics(...epics);

export default rootEpic;
