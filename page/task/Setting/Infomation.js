import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {makeRemoteUrl} from 'services/remote-storage';

import 'style/page/task/setting/infomation.scss';

class Infomation extends Component {

  static get name() {
    return 'infomation';
  }
  
  uploadCover(imageDataUrl) {
    // TODO extract commons
    const data = new FormData();
    data.append('playload', imageDataUrl);
    this.props.uploadCover(this.props.params.id, data);
  }

  render() {
    return (
      <div className='board-setting-infomation'>
        <h3>Infomation</h3>
        <div className='board-cover'>
          <div>Board Cover:</div>
          <div className='board-cover-wrapper'>
            <img className='cover-image' src={this.props.board && makeRemoteUrl(this.props.board.cover)}/>
            <div>
              <ImageUploader ref='board-cover-uploader' uploadFn={this.uploadCover.bind(this)}>Upload new Cover</ImageUploader>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Infomation;
