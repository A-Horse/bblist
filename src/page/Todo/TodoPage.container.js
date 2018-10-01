// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Map } from 'immutable';
import { makeActionRequestCollection } from '../../actions/actions';
import { TodoPage } from '../../page/Todo/TodoPage';

const mapStateToProps = state => {
  return {
    todoBoxs: state.todos
      .get('todoBoxIds')
      .map(id => state.todos.get('todoBoxEntities').get(String(id)))
      .unshift(Map({ name: 'Task Todo', id: '@task' }))
      .unshift(Map({ name: 'Default Todo', id: '@all' }))
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const TodoPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(TodoPage));

export default TodoPageContainer;
