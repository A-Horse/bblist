import {
  ACTIVE_TD_REPEAT_HISTORY,
  UNACTIVE_TD_REPEAT_HISTORY,
  TD_REPEAT_HISTORY_SUCCESS
} from 'actions/todo/todo-statistics';
import { TDBox, TD } from '../../schema';
import { normalize } from 'normalizr';
import R from 'ramda';

export function todoStatistics(
  state = {
    activedTdId: null,
    repeatHistory: []
  },
  action
) {
  switch (action.type) {
    case ACTIVE_TD_REPEAT_HISTORY:
      return {
        ...state,
        activedTdId: action.payload.tdId
      };
    case UNACTIVE_TD_REPEAT_HISTORY:
      return {
        ...state,
        activedTdId: null
      };
    case TD_REPEAT_HISTORY_SUCCESS:
      return {
        ...state,
        repeatHistory: action.payload
      };
    default:
      return state;
  }
}
