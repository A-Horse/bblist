import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'components/widget/Modal/Modal';
import ReactCrop from 'react-image-crop';
import { ImageUploader } from 'components/ImageUploader';
import { makeRemoteUrl } from 'services/remote-storage';
import Input from 'components/widget/Input/Input';
import Button from 'components/widget/Button/Button';
import Textarea from 'react-textarea-autosize';
import Loading from 'components/Loading';

import 'style/page/task/setting/infomation.scss';

class Infomation extends Component {
  constructor() {
    super();
    this.uploadCover = this.uploadCover.bind(this);
    this.onBoardNameChange = this.onBoardNameChange.bind(this);
  }

  uploadCover(imageDataUrl) {
    // TODO extract commons
    const data = new FormData();
    data.append('playload', imageDataUrl);
    this.props.uploadCover(this.props.params.id, data);
  }

  onBoardNameChange(value) {
    this.props.modifyTaskBoardName(value);
  }

  render() {
    const board = this.props.board;
    if (!board) {
      return <Loading />;
    }

    // TODO default cover
    return (
      <div className="board-setting-infomation">
        <h3>Infomation</h3>

        <div className="board-cover">
          <div className="board-cover--heading">Board Cover:</div>
          <div className="board-cover--wrapper">
            <img className="cover-image" src={makeRemoteUrl(board.cover)} />
          </div>
          <div className="board-cover--uploader">
            <ImageUploader ref="board-cover-uploader" uploadFn={this.uploadCover}>
              Upload new Cover
            </ImageUploader>
          </div>
        </div>

        <div className="board-name">
          <div className="board-name--heading">Board Name:</div>
          <div>
            <Input
              className="board-name--input"
              defaultValue={board.name}
              onChange={this.onBoardNameChange}
            />
          </div>
        </div>

        <div className="board-description">
          <div className="board-description--heading">Board Description:</div>
          <div>
            <textarea className="board-description--input" />
          </div>
        </div>
      </div>
    );
  }
}

export default Infomation;
