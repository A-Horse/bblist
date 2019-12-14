import './KanbanColumn.scss';

import { List } from 'immutable';
import isEqual from 'lodash/fp/isEqual';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { ActionCreatorsMapObject, AnyAction, bindActionCreators, Dispatch } from 'redux';

import {
  getColumnCardsRequest,
  rankProjectCardInKanbanRequest
} from '../../../../../../actions/project/project-issue.action';
import { ProjectIssue } from '../../../../../../components/project/Issue/ProjectIssue/ProjectIssue';
import { AppButton } from '../../../../../../components/widget/Button';
import { RootState } from '../../../../../../reducers';
import { selectColumnCards } from '../../../../../../reducers/selector/card.selector';
import { KanbanColumnRecord } from '../../../../../../typings/kanban-column.typing';
import { ProjectIssueRecord, RankProjectCardInKanbanInput } from '../../../../../../typings/project-issue.typing';
import { ColumnDataFetcher } from './column-data-fetcher';
import { ColumnHeaderDropDown } from './ColumnHeaderDropDown/ColumnHeaderDropDown';

interface InputProps {
  column: KanbanColumnRecord;
  onIssueClick: Function;
}

interface ReduxProps {
  actions: ActionCreatorsMapObject;
  issues: List<ProjectIssueRecord> | null;
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

  render() {
    return (
      <div className="KanbanColumn">
        <div className="KanbanColumn--header">
          <span className="KanbanColumn--header-name">{this.props.column.get('name')}</span>
          <AppButton>
            <ColumnHeaderDropDown columnId={this.props.column.get('id')} />
          </AppButton>
        </div>

        <div className="KanbanColumn--content">
          {this.props.issues &&
            this.props
              .issues!.sortBy((issue: ProjectIssueRecord) => issue.get('order'))
              .map((issue: ProjectIssueRecord, index: number) => {
                return (
                  <ProjectIssue
                    key={issue.get('id')}
                    kanbanId={this.props.column.get('kanbanId')}
                    onClick={this.props.onIssueClick}
                    rankProjectCardColumn={this.props.rankProjectCardInKanbanRequest}
                    issue={issue}
                  />
                );
              })}
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
        rankProjectCardInKanbanInput: RankProjectCardInKanbanInput,
        meta: {
          temporary: boolean;
        }
      ) => {
        if (isEqual(rankProjectCardInKanbanInput, lastRankProjectCardInKanbanInput) && isEqual(meta, lastMeta)) {
          return;
        }
        lastRankProjectCardInKanbanInput = rankProjectCardInKanbanInput;
        lastMeta = meta;

        dispatch(rankProjectCardInKanbanRequest(rankProjectCardInKanbanInput, meta));
      };
    })()
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  const issues = selectColumnCards(state, props.column.get('id'));

  return {
    issues
  };
};

export const KanbanColumn = withRouter<InputProps & RouteComponentProps>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanColumnComponent)
);
