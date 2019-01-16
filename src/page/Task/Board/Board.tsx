//
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router';
import { updateTitle } from '../../../services/title';
import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';

import { BoardContentContainer } from '../BoardContent/BoardContent';
import { BoardSetting } from '../BoardSetting/BoardSetting';

import { Layout } from 'antd';

import './Board.scss';

const { Header } = Layout;

export class Board extends Component<{
  boardName: string,
  match: any,
  actions: any,
  board: any,
  boardFetching: any,
  history: any
}> {
  componentWillMount() {
    updateTitle(`Task Board ${this.props.boardName}`);
    const taskBoardId = this.props.match.params.boardId;
    this.props.actions.GET_TASK_BOARD_REQUEST({ id: taskBoardId });
    this.props.actions.GET_TASK_BOARD_SETTING_REQUEST({
      taskBoardId: taskBoardId
    });
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.boardName !== this.props.boardName) {
      updateTitle(` ${nextProps.boardName}`);
    }
  }

  onStarCheckChange = (value: any) => {
    this.props.actions.UPDATE_TASK_BOARD_REQUEST({
      id: this.props.match.params.boardId,
      isStar: value
    });
  };

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
      <Layout className="board-container">
        <Header className="taskboard-header">
          <StarCheckBox
            className="taskboard-header--star"
            onChange={this.onStarCheckChange}
            defaultChecked={board.get('isStar')}
          />
          <div className="taskboard-name">
            <Link className="taskboard-name--text" to={`/task-board/${boardId}`}>
              {board && board.get('name')}
            </Link>
          </div>

          <div
            className="taskboard-header-setting"
            onClick={() =>
              this.props.history.push(
                `/task-board/${this.props.match.params.boardId}/setting/infomation`
              )
            }
          >
            <i className="fa fa-cog" aria-hidden="true" />
          </div>
        </Header>

        <Switch>
          <Route
            path="/task-board/:boardId/setting"
            render={props => <BoardSetting {...this.props} {...props} />}
          />
          <Route path="/task-board/:boardId" render={props => <BoardContentContainer />} />
        </Switch>
      </Layout>
    );
  }
}
