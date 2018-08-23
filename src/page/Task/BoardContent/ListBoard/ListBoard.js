// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../actions/actions';
import { ListBoardCardContainer } from './ListBoardCard/ListBoardCard';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { List } from 'immutable';

import './ListBoard.less';

@DragDropContext(HTML5Backend)
export class ListBoard extends Component<
  {
    actions: any,
    cards: any
  },
  {}
> {
  state = {};

  render() {
    return (
      <div className="list-board-container">
        {this.props.cards.map(card => <ListBoardCardContainer key={card.get('id')} card={card} />)}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = state => {
  const trackMap = state.task2.get('trackMap');
  const cardMap = state.task2.get('cardMap');
  console.log(cardMap);
  console.log(trackMap);
  const tracks = trackMap.toArray();
  console.log(tracks);
  const cards = trackMap
    .map(track => track.get('cards'))
    .reduce((all, cards) => {
      return all.concat(cards);
    }, List())
    .map(cardId => cardMap.get(cardId.toString()));
  console.log('cards', cards);

  return {
    board: state.task2.get('board'),
    trackMap,
    cardMap,
    cards,
    loginedUser: state.auth.get('loginedUser')
  };
};

export const ListBoardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListBoard)
);
