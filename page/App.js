import React, { Component } from 'react';

import Nav from './Nav/Nav';
import Loading from 'components/Loading';

import { Router, Route, Switch, Redirect } from 'react-router';

import NotFound from 'page/NotFound';
import DashBoard from 'page/DashBoard';
import IndexPage from 'page/IndexPage';

import TodoPage from 'page/Todo/TodoPage.container';
import Boards from 'containers/task/Boards';
import Board from 'containers/task/Board';
import BoardSetting from 'containers/task/BoardSetting';
import BoardContent from 'containers/task/BoardContent';
import TaskCardModal from 'page/task/CardModal';
import TaskSettingInfomation from 'containers/task/Setting/Infomation';
import TaskSettingOperation from 'containers/task/Setting/Operation';
import TaskSettingPreference from 'containers/task/Setting/Preference';

import Profile from 'containers/Profile';

import Setting from 'containers/setting/Setting';
import SettingSecurity from 'containers/setting/Security';
import SettingProfile from 'containers/setting/Profile';

import Ideas from 'containers/idea/Ideas';

import Building from 'page/Building';
import { checkLogin } from 'utils/auth';

export default class App extends Component {
  constructor(props) {
    super(props);
    props.actions.IDENTIFY_FN();
  }

  render() {
    if (this.props.identifyFetching === undefined || this.props.identifyFetching) {
      return <Loading />;
    }
    if (!this.props.identifyFetching && !this.props.identifyAuthenticated) {
      console.log('hihihi');
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
          <Route path="task-wall" component={Boards} />

          <Route path="/task-wall/" component={Board}>
            <Route path="/task-wall/:id" component={BoardContent}>
              <Route path="/task-wall/:id/:cardId" component={TaskCardModal} />
            </Route>

            <Route path="/task-wall/:id/setting" component={BoardSetting}>
              <Route exact path="/" render={() => <Redirect to="/infomation" />} />
              <Route path="infomation" component={TaskSettingInfomation} />
              <Route path="operation" component={TaskSettingOperation} />
              <Route path="preference" component={TaskSettingPreference} />
            </Route>
          </Route>

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
