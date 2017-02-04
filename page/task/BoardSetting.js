import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import R from 'ramda';

import Infomation from './Setting/Infomation';
import Operation from './Setting/Operation';
import Preference from './Setting/Preference';
import 'style/page/task/board-setting.scss';

import {Router, Route, IndexRoute, browserHistory} from 'react-router';

export class BoardSetting extends Component {
  constructor() {
    super();
  }

  getCurrentBoard() {
    const {normalizedBoard} = this.props;
    return normalizedBoard.entities[this.props.params.id];
  }

  componentWillMount() {
    console.log(0, this.getCurrentBoard());
    this.panels = [
      <Infomation key='infomation' board={this.getCurrentBoard()} uploadCover={this.props.uploadCover} params={this.props.params}/>,
      <Operation key='operation'/>,
      <Preference key='preference'/>
    ];
    this.state = {currentPanel: R.head(this.panels)};
  }

  componentDidMount() {
        console.log(1, this.getCurrentBoard());
      }

      componentDidUpdate() {
        
      }

      componentWillReceiveProps() {
        this.panels = [
            <Infomation key='infomation' board={this.getCurrentBoard()} uploadCover={this.props.uploadCover} params={this.props.params}/>,
          <Operation key='operation'/>,
          <Preference key='preference'/>
          ];
          this.state = {currentPanel: R.head(this.panels)};
          this.render();
          }
      
  deleteTaskBoard() {
    this.props.deleteBoard(this.props.params.id);
  }
  
  renderInfotmationSetting() {
    return (
      <div>
        <div>
          <button onClick={this.deleteTaskBoard.bind(this)}>Delete this wall</button>
        </div>
        {this.renderCoverUploader()}
      </div>
    );
  }

  switchPanel(panel) {
    this.setState({currentPanel: panel});
  }
  
  renderSideBarItems() {
    return this.panels.map(panelWrapper => {
      const name = panelWrapper.type.name;
      return (<li key={name} className={this.state.currentPanel.type.name === name ? 'active' : null}
         onClick={() => this.switchPanel(panelWrapper)}>
         {name}
        </li>);
    });
  }
  
  render() {
    return (
      <div className='board-setting-page'>

        <div className='board-setting-side-bar'>
          <ul>
            {this.renderSideBarItems()}
          </ul>
        </div>

        <div className='board-setting-panel'>
          <Router>

            <Route path="/s" component={Infomation} />

            
          </Router>
        </div>        
      </div>
    );
  }
}

export default BoardSetting;
