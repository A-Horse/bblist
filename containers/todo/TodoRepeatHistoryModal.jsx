import { connect } from 'react-redux';
import TodoRepeatHistoryModal from 'page/todo/TodoRepeatChart';
import { wrapDispathToAction } from 'utils/wrap-props';
import { getTodoRepeatHistory, activeTdRepeatHistory } from 'actions/todo/todo-statistics';

const actions = {
  getTodoRepeatHistory,
  activeTdRepeatHistory
};

const mapStateToProps = (state, props) => {
  return {
    repeatHistory: state.todoStatistics.repeatHistory,
    tdId: state.todoStatistics.activedTdId
  };
};

const TodoRepeatHistoryModalContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(TodoRepeatHistoryModal);

export default TodoRepeatHistoryModalContainer;
