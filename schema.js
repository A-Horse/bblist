import {normalize, Schema, arrayOf} from 'normalizr';

export const track = new Schema('track');
export const card = new Schema('cards');
export const user = new Schema('user');
export const board = new Schema('board');

track.define({
  cards: arrayOf(card)
});

board.define({
  tracks: arrayOf(track)
});

// card.define({
//   creater: user,
//   owner: user
// });
