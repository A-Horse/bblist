import './CardDetail.scss';

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { RootState } from '../../../reducers';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { ProjectIssueRecord } from '../../../typings/kanban-card.typing';

export interface InputProps {
  cardId: string;
}

export interface ReduxProps {
  card?: ProjectIssueRecord;
}

class CardDetailComponent extends Component<InputProps & ReduxProps, any> {
  state = { toggle: true };

  render() {
    const { card } = this.props;

    if ( !card ) {
      return;
    }

    return <div>detail</div>;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  return {
    card: state.project.get('cardMap').get(props.cardId)
  };
};

export const CardDetail = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CardDetailComponent)
);
