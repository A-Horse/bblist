//
import React, { Component } from 'react';
import { UserAvatar } from '../../../../components/UserAvatar/UserAvatar';
import Input from 'components/widget/Input/Input';
import { Button } from 'components/widget/Button/Button';
import { testRegex } from 'services/validate-strategy';

export class Participant extends Component {
  componentWillMount() {
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
        <div>
          {this.props.boardParticipants && (
            <div>
              {this.props.boardParticipants.map(participant => {
                return (
                  <div key={participant.get('id')}>
                    <UserAvatar user={participant.get('user').toJS()} />
                    <div>{participant.getIn(['user', 'username'])}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div>invite someone</div>
          <Input
            size="middle"
            onChange={value => {
              if (testRegex('email', value)) {
                this.props.actions.QUERY_USER_INFOMATION_WITH_EMAIL_REQUEST({
                  email: value
                });
              }
              this.setState({ participantEmail: value });
            }}
            placeholder="Participant Email"
          />
          <div>
            <Button
              className="invite-button"
              disable={!this.props.inviteParticipant}
              onClick={() => {
                this.props.actions.INVITE_TASK_BOARD_PARTICIPANT_REQUEST({
                  boardId: board.get('id'),
                  userId: this.props.inviteParticipant.get('id')
                });
              }}
            >
              Invite
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
