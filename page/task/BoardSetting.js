import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import {deleteTaskBoard} from 'actions/task/task-wall';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';
import {ImageUploader} from 'components/ImageUploader';
import {uploadFile} from 'actions/common/file';

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
    const {dispatch} = this.props;
    return dispatch(deleteTaskBoard(this.props.params.id))
      .then(() => {
        browserHistory.push('/task-wall');
      });
  }

  close() {
    
  }

  uploadCover(imageDataUrl) {
    const {dispatch} = this.props;
    const data = new FormData();
    data.append('playload', imageDataUrl);
    dispatch(uploadFile('/file', data));
  }

  renderCoverUploader() {
    return (
      <div>
        <ImageUploader ref='board-cover-uploader' uploadFn={this.uploadCover.bind(this)}/>
      </div>
    );
  }

  onCoverInputChange(event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({coverDataURL: e.target.result});
    };
    reader.readAsDataURL(this.refs['cover-input'].files[0]);
  }

  renderModal() {
    
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.deleteTaskBoard.bind(this)}>Delete this wall</button>
        </div>

        {this.renderCoverUploader()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    wall: state.task.board.wall,
    lists: state.task.list.lists
  };
};

export default connect(mapStateToProps)(BoardSetting);
