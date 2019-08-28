import { KanbanColumnRecord } from './../typings/kanban-column.typing';
import { List } from 'immutable';
import { SelectOption } from '../typings/select.typing';

export function generateColumnOptions(colunms: List<KanbanColumnRecord>): SelectOption[] {
  return colunms
    .map(column => {
      return {
        value: column.get('id'),
        label: column.get('name')
      };
    })
    .toArray();
}