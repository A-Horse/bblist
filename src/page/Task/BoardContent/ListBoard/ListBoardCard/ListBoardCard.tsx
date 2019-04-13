import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { makeActionRequestCollection } from '../../../../../actions/actions';

import './ListBoardCard.scss';

class ListBoardCard extends Component<any, any> {
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

const mapDispatchToProps = (dispatch: any) => {
  return {
    actions: bindActionCreators(makeActionRequestCollection(), dispatch)
  };
};

const mapStateToProps = (state: any) => {
  return {};
};

export const ListBoardCardContainer = 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ListBoardCard));
