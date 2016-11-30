import React, {Component} from 'react';
import {browserHistory, hashHistory} from 'react-router';
import {deleteTaskWall} from 'actions/task/task-wall';
import {Modal} from 'components/widget/Modal';

import 'style/page/task/board-setting-modal.scss';

export class BoardSetting extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.state = {

    };
  }

  componentDidMount() {
    // browserHistory.push('/setting');
    console.log(hashHistory, browserHistory);
  }

  deleteWall() {
    const {dispatch} = this.props;
    const params = {id: this.props.params.id};
    
    return dispatch(deleteTaskWall(params))
      .then(() => {
        browserHistory.push('/task-wall');
      }).catch(error => {

      });
  }

  close() {

  }

  render() {
    return (
      <Modal className='board-setting-modal'
             toggle={this.props.toggle}
             close={this.close.bind(this)}>
        <button onClick={this.deleteTaskWall}>Delete this wall</button>
      </Modal>
    );
  }
}
