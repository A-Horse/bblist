import { combineEpics } from "redux-observable";
import R from "ramda";

function requireAll(r) {
  return r.keys().map(r);
}
const epicGroups = requireAll(require.context("./", true, /epic.js$/));
const epics = R.flatten(R.map(R.values, epicGroups));

const rootEpic = combineEpics(...epics);

export default rootEpic;
