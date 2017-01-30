import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';


import 'style/page/task/board-setting.scss';

export class Infomation extends Component {
  uploadCover(imageDataUrl) {
    // TODO extract commons
    const data = new FormData();
    data.append('playload', imageDataUrl);
    this.props.uploadCover(this.props.params.id, data);
  }

  render() {
    console.log(this.props);
    return (
      <div class='board-setting-infomation'>
        <div class='board-cover'>
          <img src={this.props.wall.cover}/>
          <div>
            <ImageUploader ref='board-cover-uploader' uploadFn={this.uploadCover.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Infomation;
