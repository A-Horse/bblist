import { List } from 'immutable';
import React, { Component } from 'react';

import { KanbanColumnRecord } from '../../../../typings/kanban-column.typing';

import './KanbanColumnPanel.scss';

export class KanbanColumnPanel extends Component<{
  columns: List<KanbanColumnRecord> | null;
}> {
  render() {
    return (
      <div className="KanbanColumnPanel">
        columns
        {this.props.columns &&
          this.props
            .columns!.map((column: KanbanColumnRecord) => {
              return <div key={column.get('id')}>{column.get('name')}</div>;
            })
            .toArray()}
      </div>
    );
  }
}
