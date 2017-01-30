import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';

import Infomation from './Setting/Infomation';

import 'style/page/task/board-setting.scss';

export class BoardSetting extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {
      coverDataURL: ''
    };
  }

  componentDidMount() {
    
  }

  deleteTaskBoard() {
    this.props.deleteBoard(this.props.params.id);
  }

  close() {
    
  }

  uploadCover(imageDataUrl) {
    // TODO extract commons
    const data = new FormData();
    data.append('playload', imageDataUrl);
    this.props.uploadCover(this.props.params.id, data);
  }

  renderCoverUploader() {
    return (
      <div>
        <ImageUploader ref='board-cover-uploader' uploadFn={this.uploadCover.bind(this)}/>
      </div>
    );
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
      return <Infomation wall={this.props.wall} uploadCover={this.props.uploadCover} params={this.props.params}/>;
    }

  }

  switchPanel(name) {
    
  }
  
  render() {
    console.log(this.props);
    return (
      <div className='board-setting-page'>

        <div className='board-setting-side-bar'>
          <ul>
            <li onClick={this.switchPanel('infomation')}>Infomation</li>
            <li onClick={this.switchPanel('preference')}>Preference</li>
            <li onClick={this.switchPanel('operation')}>Operatioon</li>
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
