import { schema } from 'normalizr';

// TODO rename
export const card = new schema.Entity('cards');
export const track = new schema.Entity('track', {
  cards: [card]
});
export const user = new schema.Entity('user');
export const board = new schema.Entity('board', {
  tracks: [track]
});
export const TD = new schema.Entity('Todo');
export const TDS = new schema.Array(TD);
export const TDBox = new schema.Entity('TodoBox', {
  todos: TDS
});
export const TDRepeat = new schema.Entity('TodoRepeat');
export const TDRepeats = new schema.Array(TDRepeat);
