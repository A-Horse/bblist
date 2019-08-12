import './ProjectPage.scss';

import { Layout } from 'antd';
import React, { Component } from 'react';
import { match, Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { updateTitle } from '../../../services/title';
import { BoardSetting } from '../../Task/BoardSetting/BoardSetting';
import { ProjectContentContainer } from '../../Task/ProjectContent/ProjectContent';
import { BoardSideBar } from './BoardSideBar/BoardSideBar';

const { Header } = Layout;

export class Board extends Component<{
  boardName: string;
  match:  match<{
    projectId: string
  }>;
  actions: {
    getProjectDetailRequest: (projectId: string) => void
  };
  board: any;
  boardFetching: any;
  history: any;
}> {

  componentWillMount() {
    const projectId = this.props.match.params.projectId;
    this.props.actions.getProjectDetailRequest(projectId);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.boardName !== this.props.boardName) {
      updateTitle(` ${nextProps.boardName}`);
    }
  }

  onStarCheckChange = (value: any) => {
    // this.props.actions.UPDATE_TASK_BOARD_REQUEST({
    //   id: this.props.match.params.boardId,
    //   isStar: value
    // });
  };

  render() {
    const { projectId } = this.props.match.params;
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
            <Link className="taskboard-name--text" to={`/proejct/${projectId}`}>
              {board && board.get('name')}
            </Link>
          </div>

          <div
            className="taskboard-header-setting"
            onClick={() =>
              this.props.history.push(
                `/project/${this.props.match.params.projectId}/setting/infomation`
              )
            }
          >
            <i className="fa fa-cog" aria-hidden="true" />
          </div>
        </Header>

        <div>
          <BoardSideBar />

          <Switch>
            <Route
              path="/task-board/:boardId/setting"
              render={props => <BoardSetting {...this.props} {...props} />}
            />
            <Route path="/task-board/:boardId" render={props => <ProjectContentContainer />} />
            <Route path="/project/:boardId" render={props => <ProjectContentContainer />} />
          </Switch>
        </div>
      </Layout>
    );
  }
}
