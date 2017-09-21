import { connect } from 'react-redux';
import TodoPage from 'page/Todo/TodoPage';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Actions, { makeActionRequestCollection } from '../../actions/actions';

const mapStateToProps = state => {
  return {
    todoBoxs: state.todos
      .get('todoBoxIds')
      .map(id => state.todos.get('todoBoxEntities').get(String(id)))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      makeActionRequestCollection([Actions.GET_TODOBOXS, Actions.ADD_TODOBOX]),
      dispatch
    )
  };
};

const TodoPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoPage));

export default TodoPageContainer;
