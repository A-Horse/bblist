import { combineReducers } from 'redux';
import board from './task-wall';
import list from './task-list';
import card from './task-card';
import comment from './task-card-comment';

const task = combineReducers({
  board,
  list,
  card,
  comment
});

export default task;
