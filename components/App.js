import React, { Component } from 'react';
import Nav from 'containers/Nav';
import Loading from 'components/Loading';

import { Router, Route, Switch, Redirect } from 'react-router';

import NotFound from 'page/NotFound';
import DashBoard from 'page/DashBoard';
import IndexPage from 'page/IndexPage';

import TodoPage from 'containers/Todo/TodoPage';
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

import Body from 'components/Body';

import Building from 'page/Building';
import { checkLogin } from 'utils/auth';

export default class App extends Component {
  componentWillMount() {
    // TODO props.actions
    this.props.actions.IDENTIFY_FN();
  }
  /*
   *   componentWillReceiveProps(newProps) {
   *     if (!newProps.isFetching && !newProps.isAuthenticated) {
   *       // return newProps.history.push('/signin');
   *     }
   *   }*/

  render() {
    console.log(this.props);

    if (this.props.isFetching) {
      return <Loading />;
    } else if (!this.props.isFetching && !this.props.isAuthenticated) {
      // return this.props.history.push('/signin');
      return null;
    } else {
      return (
        <div>
          <Nav />
          <Switch>
            <Route path="/home" component={DashBoard} onEnter={checkLogin} />

            <Route path="/idea" component={Ideas} />
            <Route path="task-wall" component={Boards} onEnter={checkLogin} />

            <Route path="/task-wall/" component={Board} onEnter={checkLogin}>
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

            <Route path="setting" component={Setting} onEnter={checkLogin}>
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
}
