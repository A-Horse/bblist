import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {makeRemoteUrl} from 'services/remote-storage';
import Input from 'components/widget/Input';
import Button from 'components/widget/Button';

import 'style/page/task/setting/infomation.scss';

class Infomation extends Component {
  getCurrentBoard() {
    const {normalizedBoard} = this.props;
    return normalizedBoard.entities[this.props.params.id];
  }
  
  uploadCover(imageDataUrl) {
    // TODO extract commons
    const data = new FormData();
    data.append('playload', imageDataUrl);
    this.props.uploadCover(this.props.params.id, data);
  }

  render() {
    const board = this.getCurrentBoard();
    
    return (
      <div className='board-setting-infomation'>
        <h3>Infomation</h3>

        <div className='board-name'>
          <div>Board Name:</div>
          <div>
            <Input className='board-name--input'/>
            <Button>Change</Button>
          </div>
        </div>
        
        <div className='board-cover'>
          <div>Board Cover:</div>
          <div className='board-cover--wrapper'>
            <img className='cover-image' src={board && makeRemoteUrl(board.cover)}/>
            <div className='board-cover--uploader'>
              <ImageUploader ref='board-cover-uploader' uploadFn={this.uploadCover.bind(this)}>Upload new Cover</ImageUploader>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Infomation;
