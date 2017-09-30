import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageUploader } from 'components/ImageUploader/ImageUploader';
import { makeRemoteUrl } from 'services/remote-storage';
import Input from 'components/widget/Input/Input';

import './Participant.scss';

class Participant extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object,
    match: PropTypes.object.isRequired
  };

  componentWillMount() {
    console.log(this.props.match);

    this.props.actions.GET_TASK_BOARD_PARTICIPANT_REQUEST({
      id: this.props.match.params.boardId
    });
  }

  render() {
    const board = this.props.board;
    if (!board) {
      return null;
    }
    return (
      <div className="board-setting-infomation">
        <h3>Participant</h3>
      </div>
    );
  }
}

export default Participant;
