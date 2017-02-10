import {combineEpics} from 'redux-observable';

import {renameTaskBoard} from './task-board';

const taskEpics = combineEpics(
  renameTaskBoard
);

export default taskEpics;

