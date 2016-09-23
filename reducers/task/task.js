import {combineReducers} from 'redux';
import board from './task-wall';
import list from './task-list';
import card from './task-card'

const task = combineReducers({
  board,
  list,
  card
});

export default task;
