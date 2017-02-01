import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import R from 'fw-ramda';
import {SettingIcon, StarBorderIcon} from 'services/svg-icons';
import {updateTitle} from 'services/title';
import {Link} from 'react-router';

import 'style/page/task/taskboard-header.scss';
import 'style/page/task/board.scss';


class Board extends Component {
  constructor() {
    super();
    this.state = {
      typingNewList: false,
      boardSettingToggle: false
    };
  }

  componentWillMount() {
    const {id} = this.props.params;

    this.getTasks(id).then(() => {
      
    }).catch(error => {
      // TODO 404
    });
  }

  componentDidMount() {
    updateTitle('Task Board');
  }

  
  getTasks(id) {
    return this.props.getBoardData(id);
  }
  
  renderSetttingArea() {
    return (
      <div className='taskboard-header-setting' onClick={() => browserHistory.push(`/task-wall/${this.props.params.id}/setting`)}>
        <SettingIcon className='setting-icon'/>
        <span>setting</span>
      </div>
    );
  }

  renderTopBar() {
    const {id} = this.props.params;
    const {normalizedBoard} = this.props;
    const board = normalizedBoard.entities[id];
    return (
      <div className='taskboard-header'>
        <div className='taskboard-name'>
          <StarBorderIcon className='taskboard-name--star'/>
          <Link className='taskboard-name--text' to={`/task-wall/${id}`}>{board && board.name}</Link>
        </div>
        {this.renderSetttingArea()}
      </div>
    );
  }

  render() {
    return (
      <div className='board-container'>
        {this.renderTopBar()}
        {this.props.children}
      </div>
    );
  }
}

export default Board;
