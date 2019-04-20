//
import React, { Component } from 'react';
import { Input } from 'antd';
import { ImageUploader } from '../../../../components/ImageUploader/ImageUploader';
import { DEFAULT_BOARD_COVER_SRC } from '../../../../constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeActionRequestCollection } from '../../../../actions/actions';
import { withRouter } from 'react-router';
import { generateBoardCoverUrl } from '../../../../utils/url';

import './Infomation.scss';

class Infomation extends Component<any> {
  onCoverUpload = (coverBase64: any) => {
    const data = new FormData();
    data.append('cover', coverBase64);
    this.props.actions.UPLOAD_TASK_BOARD_COVER_REQUEST({
      id: this.props.board.get('id'),
      data: data
    });
  };

  render() {
    const board = this.props.board;
    if (!board || !this.props.boardSetting) {
      return null;
    }
    return (
      <div className="board-setting-infomation">
        <h3>Infomation</h3>

        <div className="board-cover">
          <div className="board-cover--heading">Board Cover:</div>
          <div className="board-cover--uploader">
            <ImageUploader
              style={{
                width: '250px',
                height: '125px',
                borderRadius: '6px',
                display: 'block'
              }}
              source={
                this.props.boardSetting.get('cover')
                  ? generateBoardCoverUrl(this.props.boardSetting.get('cover'))
                  : DEFAULT_BOARD_COVER_SRC
              }
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state: any, props: any) => {
  console.log(props);
  console.log(state);
  return {
    board: state.task2.get('currentBoard'),
    boardSetting: state.task2.get('boardSettingMap').get(props.match.params.boardId),
    boardParticipants: state.task2.get('boardParticipants'),
    boardFetching: state.task2.get('boardFetching'),
    boardName: state.task2.get('board') ? state.task2.getIn(['board', 'name']) : '',
    trackMap: state.task2.get('trackMap'),
    cardMap: state.task2.get('cardMap'),
    loginedUser: state.auth.get('loginedUser')
  };
};

export const InfomationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Infomation));
