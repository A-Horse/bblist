import { connect } from 'react-redux';
import TodoRepeatHistoryModal from 'page/task/CardModal';
import { wrapDispathToAction } from 'utils/wrap-props';
import { getCardDetail } from 'actions/task/task-card';

const actions = {

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
