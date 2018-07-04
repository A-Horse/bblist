// @flow
import React, { Component } from 'react';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { makeRemoteUrl } from '../../../../services/remote-storage';
import { Input } from 'antd';

import './Infomation.scss';

export class Infomation extends Component<{
  actions: any,
  board: any
}> {
  onCoverUpload = (coverBase64: string) => {
    const data = new FormData();
    data.append('cover', coverBase64);
    this.props.actions.UPLOAD_TASK_BOARD_COVER_REQUEST({
      id: this.props.board.get('id'),
      data: data
    });
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
          <div className="board-cover--uploader">
            <ImageUploader
              style={{ width: '250px', height: '125px', borderRadius: '6px' }}
              source={makeRemoteUrl(board.get('cover'))}
              upload={this.onCoverUpload}
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
              onChange={event =>
                this.props.actions.UPDATE_TASK_BOARD_REQUEST({
                  id: board.get('id'),
                  name: event.target.value
                })
              }
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
