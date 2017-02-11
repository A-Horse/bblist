import React, {Component} from 'react';
import {PageContainer} from 'components/widget/PageContainer';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {makeGravatarUrl} from 'services/gravatar';
import TodoList from './TodoList';
import PomodoraDial from './PomodoraDial';
import {createTodo, getTodoList} from 'actions/todo/todos';
import {updateTitle} from 'services/title';
import {Link} from 'react-router';
import {FormatListIcon, UnarchinveIcon} from 'services/svg-icons';

import 'style/page/todo/todo-boxs.scss';

class TodoBoxs extends Component {
  componentWillMount() {
    this.state = {};
  }

  renderProjectBoxs() {
    
  }
  
  render() {
    return (
      <ul className='todo-boxs'>
        <div className='box-group'>
          <div className='box-group--name all-todo-filter'>
            <Link to='/todo/'>
              <FormatListIcon/>
              <span>All</span>
            </Link>
          </div>
        </div>

        <div className='box-group'>
          <div className='box-group--name'>
            <UnarchinveIcon/>
            <span>Project</span>
          </div>
          {this.renderProjectBoxs}
        </div>
        
      </ul>
    );
  }
}

export default TodoBoxs;
