import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { updateTitle } from 'services/title';
import { StarCheckBox } from 'components/widget/StarCheckBox/StarCheckBox';

import BoardContent from '../BoardContent/BoardContent';
import BoardSetting from '../BoardSetting/BoardSetting';

import './Board.scss';

class Board extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object,
    boardName: PropTypes.string,
    boardFetching: PropTypes.bool,
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
    if (!board) {
      return null;
    }
    return (
      <div className="board-container">
        <div className="taskboard-header">
          <div className="taskboard-name">
            <StarCheckBox defaultChecked={board.get('isStar')} />
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

        <Switch>
          <Route
            path="/task-board/:boardId/setting"
            render={props => <BoardSetting {...this.props} {...props} />}
          />
          <Route
            path="/task-board/:id"
            render={props => <BoardContent {...this.props} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default Board;
