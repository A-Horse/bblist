import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SettingIcon, StarBorderIcon } from 'services/svg-icons';
import { updateTitle } from 'services/title';
import { Link } from 'react-router-dom';
import BoardContent from '../BoardContent/BoardContent';
import { Route, Switch } from 'react-router';

import 'style/page/task/taskboard-header.scss';

import './Board.scss';

class Board extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object,
    boardName: PropTypes.string,
    loginedUser: PropTypes.object,
    trackMap: PropTypes.object,
    cardMap: PropTypes.object,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    updateTitle(`Task Board ${this.props.boardName}`);
    this.props.actions.GET_TASK_BOARD_REQUEST({ id: this.props.match.params.boardId });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.boardName !== this.props.boardName) {
      updateTitle(`Task Board ${nextProps.boardName}`);
    }
  }

  render() {
    const { id } = this.props.match.params;
    const { board } = this.props;
    return (
      <div className="board-container">
        <div className="taskboard-header">
          <div className="taskboard-name">
            <StarBorderIcon className="taskboard-name--star" />
            <Link className="taskboard-name--text" to={`/task-board/${id}`}>
              {board && board.get('name')}
            </Link>
          </div>
          <div
            className="taskboard-header-setting"
            onClick={() =>
              this.props.history.push(
                `/task-wall/${this.props.match.params.boardId}/setting/infomation`
              )}
          >
            <SettingIcon className="setting-icon" />
            <span>setting</span>
          </div>
        </div>

        <div />

        <Switch>
          <Route
            exact
            path=""
            render={() => (
              <BoardContent
                history={this.props.history}
                actions={this.props.actions}
                board={this.props.board}
                cardMap={this.props.cardMap}
                trackMap={this.props.trackMap}
                loginedUser={this.props.loginedUser}
              />
            )}
          />
          <Route
            exact
            path="setting"
            render={() => (
              <BoardContent
                history={this.props.history}
                actions={this.props.actions}
                board={this.props.board}
                cardMap={this.props.cardMap}
                trackMap={this.props.trackMap}
                loginedUser={this.props.loginedUser}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default Board;
