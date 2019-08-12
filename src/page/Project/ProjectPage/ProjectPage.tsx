import './ProjectPage.scss';

import { Layout } from 'antd';
import React, { Component } from 'react';
import { match, Redirect, Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';

import { StarCheckBox } from '../../../components/widget/StarCheckBox/StarCheckBox';
import { updateTitle } from '../../../services/title';
import { BoardSetting } from '../../Task/BoardSetting/BoardSetting';
import { ProjectContentContainer } from './ProjectContent/ProjectContent';
import { BoardSideBar } from './BoardSideBar/BoardSideBar';
import { getProjectDetailRequest } from '../../../actions/project/project.action';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { RootState } from '../../../reducers';
import { ProjectRecord } from '../../../typings/project/project.typing';
import { History, Location } from 'history';

const { Header } = Layout;

interface Props {
  actions: {
    getProjectDetailRequest: (projectId: string) => void;
  };
  project: ProjectRecord;
  history: History;
  location: Location;
  match: match<{
    projectId: string
  }>;
}

class ProjectPageComponent extends Component<Props> {
  componentWillMount() {
    const projectId = this.props.match.params.projectId;
    this.props.actions.getProjectDetailRequest(projectId);
  }

  componentWillReceiveProps(nextProps: any) {
    // if (nextProps.boardName !== this.props.boardName) {
    //   updateTitle(` ${nextProps.boardName}`);
    // }
  }

  onStarCheckChange = (value: any) => {
    // this.props.actions.UPDATE_TASK_BOARD_REQUEST({
    //   id: this.props.match.params.boardId,
    //   isStar: value
    // });
  };

  render() {
    const { projectId } = this.props.match.params;
    const { project } = this.props;

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
              path="/project/:projectId/setting"
              render={props => <BoardSetting {...this.props} {...props} />}
            />
            <Route path="/project/:projectId" render={props => <ProjectContentContainer />} />
          </Switch>
        </div>
      </Layout>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(
      {
        getProjectDetailRequest: getProjectDetailRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: Props) => {
  const { projectId } = props.match.params;

  return {
    project: state.project.get('projectMap').get(projectId) as ProjectRecord
  };
};

export const ProjectPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter<Props>(ProjectPageComponent));

export default ProjectPage;
