import React, { Component } from 'react';
import Nav from './Nav/Nav';
import Loading from 'components/Loading';
import Bundle from 'components/Bundle';

import { Route, Switch, Redirect } from 'react-router';

import NotFound from 'page/NotFound';
import DashBoard from 'page/DashBoard';

import TaskBoardWall from './Task/BoardWall/BoardWall.container';
import TaskBoard from 'page/Task/Board/Board.container';

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

import Building from 'page/Building';

const TodoPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=todo-page!./Todo/TodoPage.container')}>
    {B => <B {...props} />}
  </Bundle>
);

export default class App extends Component {
  constructor(props) {
    super(props);
    props.actions.IDENTIFY_REQUEST();
  }

  render() {
    if (this.props.identifyFetching === undefined || this.props.identifyFetching) {
      return <Loading />;
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

          <Route exact path="/task-board" component={TaskBoardWall} />
          <Route path="/task-board/:boardId" component={TaskBoard} />
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
