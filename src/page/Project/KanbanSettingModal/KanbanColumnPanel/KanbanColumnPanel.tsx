import React, { Component, ChangeEvent } from 'react';
import { KanbanColumnRecord } from '../../../../typings/kanban-column.typing';
import { List } from 'immutable';

export class KanbanColumnPanel extends Component<{
  columns?: List<KanbanColumnRecord>;
}> {
  render() {
    return (
      <div>
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
