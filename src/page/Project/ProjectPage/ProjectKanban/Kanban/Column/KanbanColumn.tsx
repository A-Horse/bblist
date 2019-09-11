import './KanbanColumn.scss';

import React, { Component } from 'react';

import { withRouter, RouteComponentProps } from 'react-router';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../../reducers';
import { KanbanColumnRecord } from '../../../../../../typings/kanban-column.typing';
import { getColumnCardsRequest } from '../../../../../../actions/project/kanban-card.action';
import { ColumnDataFetcher } from './column-data-fetcher';
import { ProjectCard } from '../../../../../../components/project/Card/ProjectCard';
import { List } from 'immutable';
import { ProjectCardRecord } from '../../../../../../typings/kanban-card.typing';
import { selectColumnCards } from '../../../../../../reducers/selector/card.selector';

interface InputProps {
  column: KanbanColumnRecord;
}

interface ReduxProps {
  actions: ActionCreatorsMapObject;
  cards: List<ProjectCardRecord> | null;
}

interface ComponentProps extends RouteComponentProps, InputProps {}

export class KanbanColumnComponent extends Component<
  ComponentProps & ReduxProps,
  {
    cardFetching: boolean;
  }
> {
  private columDataFetcher: ColumnDataFetcher;

  state = {
    cardFetching: false
  };

  constructor(props: Readonly<ComponentProps & ReduxProps>) {
    super(props);
    this.columDataFetcher = new ColumnDataFetcher(this);
  }
  

  componentWillMount() {
    this.columDataFetcher.fetchCards();
  }

  componentWillUnmount() {
    this.columDataFetcher.obsolete();
  }

  render() {
    return (
      <div className="KanbanColumn">
        <div className="">
          <div className="KanbanColumn-Name">{this.props.column.get('name')}</div>
          
        </div>

        <div className="">
          <div>
            {this.props.cards &&
              this.props
                .cards!.sortBy((card: ProjectCardRecord) => card.get('order'))
                .map((card: ProjectCardRecord) => {
                  return <ProjectCard key={card.get('id')} card={card} />;
                })
                .toArray()}
          </div>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getColumnCardsRequest: getColumnCardsRequest
      },
      dispatch
    )
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  const cards = selectColumnCards(state, props.column.get('id'));
  return {
    cards
  };
};

export const KanbanColumn = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanColumnComponent)
);
