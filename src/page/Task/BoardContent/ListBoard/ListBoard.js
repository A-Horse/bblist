//
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../actions/actions';
/* import { ListBoardCardContainer } from './ListBoardCard/ListBoardCard'; */
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import { List } from 'immutable';
import { TaskCard } from '../../TaskCard/TaskCard';

import './ListBoard.scss';

class ListBoardBase extends Component {
  state = {};

  render() {
    if (!this.props.board) {
      return null;
    }
    const boardId = this.props.board.get('id');
    // TODO 我的天，用不用传这么多东西进来
    return (
      <div className="list-board-container">
        {this.props.cards.map(card => (
          <TaskCard
            mode={'LONG'}
            key={card.get('id')}
            card={card}
            actions={this.props.actions}
            boardId={boardId}
            history={this.props.history}
            match={this.props.match}
          />
        ))}
      </div>
    );
  }
}

export const ListBoard = DragDropContext(HTML5Backend)(ListBoardBase);

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = state => {
  const trackMap = state.task2.get('trackMap');
  const cardMap = state.task2.get('cardMap');
  const tracks = trackMap.toArray();
  const cards = trackMap
    .map(track => track.get('cards'))
    .reduce((all, cards) => {
      return all.concat(cards);
    }, List())
    .map(cardId => cardMap.get(cardId.toString()));

  return {
    board: state.task2.get('board'),
    trackMap,
    cardMap,
    cards,
    loginedUser: state.auth.get('loginedUser')
  };
};

export const ListBoardContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListBoard)
);
