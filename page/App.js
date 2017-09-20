import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav/Nav';
import Bundle from 'components/Bundle';

import { Route, Switch, Redirect } from 'react-router';

import NotFound from 'page/NotFound';
import DashBoard from 'page/DashBoard';

/*
 * import BoardSetting from 'containers/task/BoardSetting';
 * import BoardContent from 'containers/task/BoardContent';
 * import TaskCardModal from 'page/task/CardModal';
 * import TaskSettingInfomation from 'containers/task/Setting/Infomation';
 * import TaskSettingOperation from 'containers/task/Setting/Operation';
 * import TaskSettingPreference from 'containers/task/Setting/Preference';*/

import Profile from 'containers/Profile';

import Setting from 'containers/setting/Setting';
import SettingSecurity from 'containers/setting/Security';
import SettingProfile from 'containers/setting/Profile';

import Ideas from 'containers/idea/Ideas';

// import Building from 'page/Building';

const TodoPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=todo-page!./Todo/TodoPage.container')}>
    {B => <B {...props} />}
  </Bundle>
);

const TaskBoardWallPage = props => (
  <Bundle
    load={require('bundle-loader?lazy&name=task-board-wall-page!./Task/BoardWall/BoardWall.container')}
  >
    {B => <B {...props} />}
  </Bundle>
);

const TaskBoardPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=task-board-page!page/Task/Board/Board.container')}>
    {B => <B {...props} />}
  </Bundle>
);

export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    identifyFetching: PropTypes.bool,
    identifyAuthenticated: PropTypes.bool,
    user: PropTypes.object
  };

  constructor(props) {
    super(props);
    props.actions.IDENTIFY_REQUEST();
  }

  render() {
    if (this.props.identifyFetching === undefined || this.props.identifyFetching) {
      return null;
    }
    if (!this.props.identifyFetching && !this.props.identifyAuthenticated) {
      return <Redirect to="/signin" push={true} />;
    }
    return (
      <div>
        <Nav
          user={this.props.user}
          identifyFetching={this.props.identifyFetching}
          actions={this.props.actions}
        />
        <Switch>
          <Route path="/home" component={DashBoard} />

          <Route path="/idea" component={Ideas} />

          <Route exact path="/task-board" component={TaskBoardWallPage} />
          <Route path="/task-board/:boardId" component={TaskBoardPage} />
          {/* <Route path="/task-wall/" component={Board}>
              <Route path="/task-wall/:id" component={BoardContent}>
              <Route path="/task-wall/:id/:cardId" component={TaskCardModal} />
              </Route>

              <Route path="/task-wall/:id/setting" component={BoardSetting}>
              <Route exact path="/" render={() => <Redirect to="/infomation" />} />
              <Route path="infomation" component={TaskSettingInfomation} />
              <Route path="operation" component={TaskSettingOperation} />
              <Route path="preference" component={TaskSettingPreference} />
              </Route>
              </Route> */}

          <Route path="setting" component={Setting}>
            <Route exact path="/" render={() => <Redirect to="/profile" />} />
            <Route path="profile" component={SettingProfile} />
            <Route path="security" component={SettingSecurity} />
          </Route>

          <Route path="/todo/:boxId" component={TodoPage} />
          <Route exact path="/todo" component={TodoPage} />
          <Route path="profile" component={Profile} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
