import { connect } from 'react-redux';
import TaskCardModal from 'page/task/CardModal';
import { wrapDispathToAction } from 'utils/wrap-props';
import { getCardDetail } from 'actions/task/task-card';

const actions = {
  getCardDetail
};

const mapStateToProps = (state, props) => {
  return {
    card: state.task.card.entities[props.params.cardId],
    normalizedCards: state.task.card,
    taskLists: state.task.list.lists,
    normalizedList: state.task.list
  };
};

const TaskCardModalContainer = connect(
  mapStateToProps,
  wrapDispathToAction(actions)
)(TaskCardModal);

export default TodoRepeatContainer;
