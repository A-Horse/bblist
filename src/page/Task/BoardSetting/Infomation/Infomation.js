import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageUploader } from 'components/ImageUploader/ImageUploader';
import { makeRemoteUrl } from 'services/remote-storage';
import Input from 'components/widget/Input/Input';

import './Infomation.scss';

class Infomation extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object
  };

  render() {
    const board = this.props.board;
    if (!board) {
      return null;
    }
    return (
      <div className="board-setting-infomation">
        <h3>Infomation</h3>

        <div className="board-cover">
          <div className="board-cover--heading">Board Cover:</div>
          <div className="board-cover--wrapper">
            <img className="cover-image" src={makeRemoteUrl(board.get('cover'))} />
          </div>
          <div className="board-cover--uploader">
            <ImageUploader
              uploadFn={imageDataUrl => {
                const data = new FormData();
                data.append('cover', imageDataUrl);
                this.props.actions.UPLOAD_TASK_BOARD_COVER_REQUEST({
                  id: this.props.board.get('id'),
                  data: data
                });
              }}
            >
              Upload new Cover
            </ImageUploader>
          </div>
        </div>

        <div className="board-name">
          <div className="board-name--heading">Board Name:</div>
          <div>
            <Input
              className="board-name--input"
              defaultValue={board.get('name')}
              onChange={value =>
                this.props.actions.UPDATE_TASK_BOARD_REQUEST({ id: board.get('id'), name: value })}
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
