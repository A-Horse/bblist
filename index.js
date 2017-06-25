import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createDevTools} from 'redux-devtools';
// import LogMonitor from 'redux-devtools-log-monitor';
// import DockMonitor from 'redux-devtools-dock-monitor';

import NotFound from 'page/NotFound';
import DashBoard from 'page/DashBoard';
import IndexPage from 'page/IndexPage';
import TodoPage from 'page/todo/TodoPage';

import App from 'containers/App';
import SignUp from 'containers/SignUp';
import SignIn from 'containers/SignIn';
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

import { combineEpics, createEpicMiddleware } from 'redux-observable';

import {checkLogin} from 'utils/auth';
import * as reducers from 'reducers';

import rootEpic from './epic';

// TODO 不应该全部引入
/// import 'rxjs'; // https://redux-observable.js.org/docs/Troubleshooting.html RxJS operators are missing!

import 'style/normalize.css';
import 'style/app.scss';


const epicMiddleware = createEpicMiddleware(rootEpic);


const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

// const DevTools = createDevTools(
//   <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//     <LogMonitor theme="tomorrow" preserveScrollTop={false} />
//   </DockMonitor>
// );

const store = createStore(
  reducer,
  // DevTools.instrument(),
  applyMiddleware(
    thunkMiddleware,
    epicMiddleware
  )
);


const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>

    <Router history={history}>
      <Route path='/'>
        <IndexRoute path='' component={ IndexPage }/>

        <Route path='signin' component={ SignIn }/>
        <Route path='signup' component={ SignUp }/>
      </Route>

      <Route path='/' component={ App } >

        <Route path='home' component={ DashBoard } onEnter={ checkLogin }/>

        <Route path="idea" component={ Ideas }/>
        <Route path='task-wall' component={ Boards } onEnter={ checkLogin }/>

        <Route path='task-wall/' component={ Board } onEnter={ checkLogin }>
          <Route path='/task-wall/:id' component={ BoardContent }>
            <Route path='/task-wall/:id/:cardId' component={ TaskCardModal } />
          </Route>
          <Route path='/task-wall/:id/setting' component={ BoardSetting }>
            <Route path='infomation' component={ TaskSettingInfomation }/>
            <Route path='operation' component={ TaskSettingOperation }/>
            <Route path='preference' component={ TaskSettingPreference }/>
            <IndexRedirect to='infomation'/>
          </Route>
        </Route>

        <Route path='setting' component={ Setting } onEnter={ checkLogin }>
          <Route path='profile' component={ SettingProfile }/>
          <Route path='security' component={ SettingSecurity }/>
          <IndexRedirect to='profile'/>
        </Route>

        <Route path='todo' component={ TodoPage }/>
        <Route path='profile' component={ Profile }/>

        <Route path='404' component={ NotFound } />
      </Route>


    </Router>
    {/*<DevTools />*/}
  </Provider>,
  document.getElementById('root')
);

// require('offline-plugin/runtime').install();
