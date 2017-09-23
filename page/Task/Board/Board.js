import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StarBorderIcon } from 'services/svg-icons';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { updateTitle } from 'services/title';

import BoardContent from '../BoardContent/BoardContent';
import BoardSetting from '../BoardSetting/BoardSetting';

import './Board.scss';

class Board extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object,
    boardName: PropTypes.string,
    boardFetching: PropTypes.bool,
    loginedUser: PropTypes.object,
    trackMap: PropTypes.object,
    cardMap: PropTypes.object,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

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
    const { boardId } = this.props.match.params;
    const { board, boardFetching } = this.props;
    if (boardFetching === false && !board) {
      return <Redirect to="/task-board" />;
    }

    return (
      <div className="board-container">
        <div className="taskboard-header">
          <div className="taskboard-name">
            <StarBorderIcon className="taskboard-name--star" />
            <Link className="taskboard-name--text" to={`/task-board/${boardId}`}>
              {board && board.get('name')}
            </Link>
          </div>
          <div
            className="taskboard-header-setting"
            onClick={() =>
              this.props.history.push(
                `/task-board/${this.props.match.params.boardId}/setting/infomation`
              )}
          >
            <i className="fa fa-cog" aria-hidden="true" />
            <span>setting</span>
          </div>
        </div>

        <div />

        <Switch>
          <Route
            exact
            path="/task-board/:id"
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
            path="/task-board/:id/setting"
            render={() => (
              <BoardSetting
                history={this.props.history}
                actions={this.props.actions}
                board={this.props.board}
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
