import { Map } from 'immutable';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { makeActionRequestCollection } from '../../actions/actions';
import { TodoPage } from './TodoPage';

const mapStateToProps = (state: any) => {
  return {
    todoBoxs: state.todo
      .get('todoBoxIds')
      .map((id: number) => state.todo.get('todoBoxEntities').get(String(id)))
      .unshift(Map({ name: 'Task Todos', id: '@task', iconName: 'clipboard-list' }))
      .unshift(Map({ name: 'All Todos', id: '@all', iconName: 'dharmachakra' }))
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const TodoPageContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoPage));

export default TodoPageContainer;
