import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav/Nav';
import Bundle from 'components/Bundle';

import { Route, Switch, Redirect } from 'react-router';

import NotFound from 'page/NotFound';
import DashBoard from 'page/DashBoard';

import Ideas from 'containers/idea/Ideas';

const TodoPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=todo-page!./Todo/TodoPage.container')}>
    {B => <B {...props} />}
  </Bundle>
);

const SettingPage = props => (
  <Bundle load={require('bundle-loader?lazy&name=setting-page!./Setting/SettingPage.container')}>
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

const ProfilePage = props => (
  <Bundle load={require('bundle-loader?lazy&name=profile-page!page/Profile/ProfilePage.container')}>
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

  componentDidMount() {
    this.props.actions.IDENTIFY_REQUEST();
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.identifyFetching && !newProps.identifyAuthenticated) {
      this.props.actions.IDENTIFY_FINISH();
    }
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

          <Route path="/todo/:boxId" component={TodoPage} />
          <Route exact path="/todo" component={TodoPage} />

          <Route path="/setting" component={SettingPage} />
          <Route path="/profile" component={ProfilePage} />

          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}
