// @flow
import React, { Component } from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../../actions/actions';

import './ListBoardCard.less';

class ListBoardCard extends Component<
  {
    card: any
  },
  {}
> {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps() {}

  render() {
    const { card } = this.props;
    return (
      <div>
        <div>
          <div className="list-board-card">
            <p
              className="list-board-card--title"
              onClick={() => {
                this.props.history.push(this.props.match.url + `/card/${card.get('id')}`);
              }}
            >
              {card.get('title')}
            </p>
          </div>
        </div>
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
  return {};
};

export const ListBoardCardContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ListBoardCard)
);
