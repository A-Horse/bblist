import { connect } from 'react-redux';
import TodoRepeatHistoryModal from 'page/todo/TodoRepeatChart';
import { wrapDispathToAction } from 'utils/wrap-props';
import { getTodoRepeatHistory, activeTdRepeatHistory, unactiveTdRepeatHistory, tdRepeatHistoryYestoryUpdate } from 'actions/todo/todo-statistics';
import R from 'ramda';

const actions = {
  getTodoRepeatHistory,
  activeTdRepeatHistory,
  unactiveTdRepeatHistory,
  tdRepeatHistoryYestoryUpdate
};

const mapStateToProps = (state, props) => {
  return {
    repeatHistory: R.take(7, state.todoStatistics.repeatHistory),
    repeatHistoryModalToggle: !!state.todoStatistics.activedTdId,
    tdId: state.todoStatistics.activedTdId
  };
};

const TodoRepeatHistoryModalContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(TodoRepeatHistoryModal);

export default TodoRepeatHistoryModalContainer;
