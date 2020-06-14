import React, { Component, useState } from 'react';

import './KanbanColumnPanel.scss';
import { Heading } from '../../../../components/Typography/Heading';
import { EmptyTip } from '../../../../components/Tip/EmptyTip';
import { OperableListItem } from '../../../../components/List/OperableListItem';
import { AppList } from '../../../../components/List/List';
import { ConfirmModal } from '../../../../components/Modal/ConfirmModal';
import { IColumn } from '../../../../typings/kanban-column.typing';
import { useDispatch } from "react-redux";
import { deleteKanbanColumn, queryKanbanColumns } from "../../../../redux/actions/column.action";
import { AxiosDispatch } from "../../../../typings/util.typing";

function ColumnListItem(props: { column: IColumn }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const dispatch = useDispatch<AxiosDispatch>();

  const deleteColumn = () => {
    dispatch(deleteKanbanColumn(props.column.id)).then(() => {
      dispatch(queryKanbanColumns(props.column.kanbanId)).then()
      setDeleteConfirmVisible(false)
    })
  }

  return (
    <>
      <OperableListItem
        onEditClick={() => {}}
        onDeleteClick={() => setDeleteConfirmVisible(true)}
      >
        {props.column.name}
      </OperableListItem>

      <ConfirmModal
        visible={deleteConfirmVisible}
        confirmTextTip="删除后不能恢复，请谨慎操作"
        confirmButtonText="删除"
        onConfirm={() => deleteColumn()}
        onCancel={() => setDeleteConfirmVisible(false)}
      />
    </>
  );
}

export class KanbanColumnPanel extends Component<{
  columns: IColumn[];
}> {
  render() {
    return (
      <div className="KanbanColumnPanel">
        <Heading>价值列</Heading>
        {this.props.columns && (
          <AppList>
            {this.props.columns!.map((column: IColumn) => {
              return <ColumnListItem key={column.id} column={column} />;
            })}
          </AppList>
        )}

        {this.props.columns && !this.props.columns!.length && (
          <EmptyTip>暂无价值列</EmptyTip>
        )}
      </div>
    );
  }
}
