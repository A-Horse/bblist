// flow-typed

declare interface Todo {}

declare interface TodoBox {
  id?: number;
  name: string;
  creatorId?: number;
  ownerId?: number;
  type: string;
  created_at?: number;
  updated_at?: number;
}
