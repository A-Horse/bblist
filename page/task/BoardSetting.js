import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, hashHistory} from 'react-router';
import {deleteTaskBoard} from 'actions/task/task-wall';
import {Modal} from 'components/widget/Modal';
import ReactCrop from 'react-image-crop';

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

  renderCoverUploader() {
    var crop = {
      x: 20,
      y: 10,
      width: 30,
      height: 10
    }

    return (
      <div>
        <input ref='cover-input' type='file' accept="image/x-png,image/gif,image/jpeg" onChange={this.onCoverInputChange.bind(this)}/>

        <img src={this.state.coverDataURL} />

        <ReactCrop src={this.state.coverDataURL} crop={crop}/>
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
