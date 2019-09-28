import './KanbanColumn.scss';

import React, { Component } from 'react';

import { withRouter, RouteComponentProps } from 'react-router';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../../reducers';
import { KanbanColumnRecord } from '../../../../../../typings/kanban-column.typing';
import {
  getColumnCardsRequest,
  rankProjectCardInKanbanRequest
} from '../../../../../../actions/project/project-card.action';
import { ColumnDataFetcher } from './column-data-fetcher';
import { ProjectCard } from '../../../../../../components/project/Card/ProjectCard';
import { List } from 'immutable';
import {
  ProjectCardRecord,
  RankProjectCardInKanbanInput
} from '../../../../../../typings/kanban-card.typing';
import { selectColumnCards } from '../../../../../../reducers/selector/card.selector';
import isEqual from 'lodash/fp/isEqual';
import Column from 'antd/lib/table/Column';

interface InputProps {
  column: KanbanColumnRecord;
}

interface ReduxProps {
  actions: ActionCreatorsMapObject;
  cards: List<ProjectCardRecord> | null;
  rankProjectCardInKanbanRequest: Function;
}

interface ComponentProps extends RouteComponentProps, InputProps, ReduxProps {}

interface State {
  cardFetching: boolean;
}

export class KanbanColumnComponent extends Component<ComponentProps, State> {
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

  // shouldComponentUpdate(nextProps: ComponentProps, nextState: State) {
  //   return !nextProps.column.equals(this.props.column) || !isEqual(nextState, this.state);
  // }

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
                .toArray()
                .map((card: ProjectCardRecord, index: number) => {
                  return (
                    <ProjectCard
                      key={card.get('id')}
                      kanbanId={this.props.column.get('kanbanId')}
                      rankProjectCardColumn={this.props.rankProjectCardInKanbanRequest}
                      card={card}
                    />
                  );
                })}
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
    ),
    rankProjectCardInKanbanRequest: (() => {
      let lastRankProjectCardInKanbanInput: any;
      let lastMeta: any;

      return (
        RankProjectCardInKanbanInput: RankProjectCardInKanbanInput,
        meta: {
          temporary: boolean;
        }
      ) => {
        if (
          isEqual(RankProjectCardInKanbanInput, lastRankProjectCardInKanbanInput) &&
          isEqual(meta, lastMeta)
        ) {
          return;
        }
        lastRankProjectCardInKanbanInput = RankProjectCardInKanbanInput;
        lastMeta = meta;
        dispatch(rankProjectCardInKanbanRequest(RankProjectCardInKanbanInput, meta));
      };
    })()
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  const cards = selectColumnCards(state, props.column.get('id'));

  return {
    cards
  };
};

export const KanbanColumn = withRouter<InputProps & RouteComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanColumnComponent)
);
