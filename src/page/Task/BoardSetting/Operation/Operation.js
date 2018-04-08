import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/widget/Button/Button';

import './Operation.scss';

class Operation extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    board: PropTypes.object
  };

  render() {
    return (
      <div className="board-setting-operation">
        <h3>Operation</h3>

        <div className="board-delete">
          <div className="board-delete--heading">Delete this Board:</div>
          <div>
            <Button
              styleType="dangerous"
              onClick={() =>
                this.props.actions.DESTORY_TASK_BOARD_REQUEST({ id: this.props.board.get('id') })}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Operation;
