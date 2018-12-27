import React, { Component } from 'react';
import moment from 'moment';
import { Modal } from '../../../components/widget/Modal/Modal';
import { Button } from '../../../components/widget/Button/Button';
import { IconRemove, IconDelete, IconRight } from '../../../services/image-icon';
import Empty from '../../../components/Empty';

import '../../../style/page/todo/todo-repeat-chart-modal.scss';

export default class CardRepeatHistoryModal extends Component {
  state = {};

  constructor() {
    super();
    this.onTdRepeatHistoryYestoryUpdateClick = this.onTdRepeatHistoryYestoryUpdateClick.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.actions.unactiveTdRepeatHistory();
  }

  onTdRepeatHistoryYestoryUpdateClick() {
    this.props.actions
      .tdRepeatHistoryYestoryUpdate(this.props.tdId, { isDone: true })
      .then(() => this.props.actions.getTodoRepeatHistory(this.props.tdId));
  }

  renderHistoryTable() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th key="text">Status</th>
              {this.props.repeatHistory.map(history => (
                <th key={history.id}>{history.isDone ? <IconRight /> : <IconDelete />}</th>
              ))}
            </tr>
            <tr>
              <th key="text">Dealine</th>
              {this.props.repeatHistory.map(history => (
                <th key={history.id}>
                  {moment(history.created_at)
                    .subtract(1, 'days')
                    .format('MM-DD')}
                </th>
              ))}
            </tr>
          </tbody>
        </table>
        <Button onClick={this.onTdRepeatHistoryYestoryUpdateClick}>I forgot yestory done.</Button>
      </div>
    );
  }

  render() {
    return (
      <Modal
        className="todo-repeat-chart-modal"
        toggle={this.props.repeatHistoryModalToggle}
        close={this.close}
      >
        <div className="modal-header">
          <div className="modal-header--heading">Todo History Chart</div>
          <button className="close-button" onClick={this.close}>
            <IconRemove />
          </button>
        </div>

        {this.props.repeatHistory.length ? (
          this.renderHistoryTable()
        ) : (
          <div className="todo-repeat-chart-modal--empty">
            <Empty />
            <div className="empty--text">There have not repeat history now.</div>
          </div>
        )}
        <div />
      </Modal>
    );
  }
}
