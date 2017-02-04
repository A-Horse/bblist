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

export class BoardSetting extends Component {
  constructor() {
    super();
    this.panels = [<Infomation/>, <Operation/>, <Preference/>];
    this.state = {currentPanel: R.head(this.panels)};
  }

  getCurrentBoard() {
    const {normalizedBoard} = this.props;
    return normalizedBoard.entities[this.props.params.id];
  }

  componentDidMount() {
    
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

  renderPanel(name) {
    switch (name) {
    case 'infomation':
      return <Infomation/>;
      break;
    case 'preference':
      break;
    default:
      return <Infomation board={this.getCurrentBoard()} uploadCover={this.props.uploadCover} params={this.props.params}/>;
    }
  }

  switchPanel(panel) {
    this.setState({currentPanel: panel});
  }
  
  renderSideBarItems() {
    return this.panels.map(panelWrapper => {
      const name = panelWrapper.type.name;
      return (<li className={this.state.currentPanel.type.name === name ? 'active' : null}
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
          {this.renderPanel(this.state.currentPanel)}
        </div>        
      </div>
    );
  }
}

export default BoardSetting;
