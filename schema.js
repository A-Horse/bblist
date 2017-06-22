import { schema } from 'normalizr';

// TODO rename
export const track = new schema.Entity('track');
export const card = new schema.Entity('cards');
export const user = new schema.Entity('user');
export const board = new schema.Entity('board');
export const TD = new schema.Entity('todo');
export const TDS = new schema.Array(TD);
export const TDBox = new schema.Entity('TodoBox');

TDBox.define({
  todos: TDS
});

track.define({
  cards: schema.Array(card)
});

board.define({
  tracks: schema.Array(track)
});
