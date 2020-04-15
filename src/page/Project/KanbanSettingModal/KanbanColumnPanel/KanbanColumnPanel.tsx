import React, { Component } from 'react';

import { KanbanColumnRecord } from '../../../../typings/kanban-column.typing';

import './KanbanColumnPanel.scss';
import { Heading } from '../../../../components/Typography/Heading';
import { EmptyTip } from '../../../../components/Tip/EmptyTip';
import { OperableListItem } from '../../../../components/List/OperableListItem';
import { List } from 'immutable';
import { AppList } from '../../../../components/List/List';

function ColumnListItem(props: { column: KanbanColumnRecord }) {
  return <OperableListItem>{props.column.get('name')}</OperableListItem>;
}

export class KanbanColumnPanel extends Component<{
  columns: List<KanbanColumnRecord> | null;
}> {
  render() {
    return (
      <div className="KanbanColumnPanel">
        <Heading>价值列</Heading>
        {this.props.columns && (
          <AppList>
            {this.props.columns!.map((column: KanbanColumnRecord) => {
              return <ColumnListItem key={column.get('id')} column={column} />;
            })}
          </AppList>
        )}

        {this.props.columns && !this.props.columns!.size && (
          <EmptyTip>暂无价值列</EmptyTip>
        )}
      </div>
    );
  }
}
