import { connect } from 'react-redux';
import TodoRepeatHistoryModal from 'page/task/CardModal';
import { wrapDispathToAction } from 'utils/wrap-props';
import { getTodoRepeatHistory, activeTdRepeatHistory } from 'actions/todo/todo-statistics';

const actions = {
  getTodoRepeatHistory,
  activeTdRepeatHistory
};

const mapStateToProps = (state, props) => {
  return {

  };
};

const TodoRepeatHistoryModalContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(TodoRepeatHistoryModal);

export default TodoRepeatHistoryModalContainer;
