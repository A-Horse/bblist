// @flow
import React, { Component } from 'react';
import { Button } from 'antd';

import './Operation.scss';

export class Operation extends Component<{
  actions: any,
  board: any
}> {
  render() {
    return (
      <div className="board-setting-operation">
        <h3>Operation</h3>

        <div className="board-delete">
          <div className="board-delete--heading">Delete this Board:</div>
          <div>
            <Button
              type="danger"
              onClick={() =>
                this.props.actions.DESTORY_TASK_BOARD_REQUEST({ id: this.props.board.get('id') })
              }
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
