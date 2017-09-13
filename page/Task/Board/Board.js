import React, { Component } from 'react';

import { SettingIcon, StarBorderIcon } from 'services/svg-icons';
import { updateTitle } from 'services/title';
import { Link } from 'react-router-dom';
import BoardContent from '../BoardContent/BoardContent';
import { Route } from 'react-router';

import 'style/page/task/taskboard-header.scss';

import './Board.scss';

class Board extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.GET_TASK_BOARD_REQUEST({ id: this.props.match.params.boardId });
  }

  componentDidMount() {
    updateTitle('Task Board');
  }

  getTasks(id) {
    return this.props.getBoardData(id);
  }

  renderSetttingArea() {
    return (
      <div
        className="taskboard-header-setting"
        onClick={() =>
          this.props.history.push(`/task-wall/${this.props.params.boardId}/setting/infomation`)}
      >
        <SettingIcon className="setting-icon" />
        <span>setting</span>
      </div>
    );
  }

  renderTopBar() {
    const { id } = this.props.match.params;
    const { board } = this.props;
    return (
      <div className="taskboard-header">
        <div className="taskboard-name">
          <StarBorderIcon className="taskboard-name--star" />
          <Link className="taskboard-name--text" to={`/task-board/${id}`}>
            {board && board.get('name')}
          </Link>
        </div>
        {this.renderSetttingArea()}
      </div>
    );
  }

  render() {
    return (
      <div className="board-container">
        {this.renderTopBar()}
        <div>
          <Route
            exact
            path=""
            render={() =>
              <BoardContent
                history={this.props.history}
                actions={this.props.actions}
                board={this.props.board}
                trackMap={this.props.trackMap}
                loginedUser={this.props.loginedUser}
              />}
          />
        </div>
      </div>
    );
  }
}

export default Board;
