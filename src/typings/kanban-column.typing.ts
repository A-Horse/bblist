import { Record } from 'immutable';

export interface IColumn {
  id: string;
  name: string;
  kanbanId: string;
  order: number;
}
