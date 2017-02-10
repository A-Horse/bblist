import {combineEpics} from 'redux-observable';

import taskEpics from './task';

const rootEpic = combineEpics(
  taskEpics
);

export default rootEpic;
