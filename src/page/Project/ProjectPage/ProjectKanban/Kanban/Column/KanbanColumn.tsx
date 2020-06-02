import './KanbanColumn.scss';

import { List } from 'immutable';
import isEqual from 'lodash/fp/isEqual';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
  ActionCreatorsMapObject,
  AnyAction,
  bindActionCreators,
  Dispatch,
} from 'redux';

import {
  getColumnCardsRequest,
  rankProjectCardInKanbanRequest,
} from '../../../../../../redux/actions/project-issue.action';
import { ProjectIssue } from '../../../../../../components/Project/Issue/ProjectIssue/ProjectIssue';
import { RootState } from '../../../../../../redux/reducer';
import { selectColumnCards } from '../../../../../../redux/reducer/selector/card.selector';
import { KanbanColumnRecord } from '../../../../../../typings/kanban-column.typing';
import {
  ProjectIssueRecord,
  RankProjectCardInKanbanInput,
} from '../../../../../../typings/project-issue.typing';
import { ColumnDataFetcher } from './column-data-fetcher';
import { ColumnHeaderDropDown } from './ColumnHeaderDropDown/ColumnHeaderDropDown';
import { ColumnIssueCreator } from './ColumnIssueCreator/ColumnIssueCreator';

interface InputProps {
  column: KanbanColumnRecord;
  projectID: string;
  kanbanID: string;
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
  state = {
    cardFetching: false,
  };
  private columDataFetcher: ColumnDataFetcher;

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
        <div className="KanbanColumn--main">
          <div className="KanbanColumn--header">
            <span className="KanbanColumn--header-name">
              {this.props.column.get('name')}
            </span>
            <ColumnHeaderDropDown columnID={this.props.column.get('id')} />
          </div>

          <div className="KanbanColumn--content">
            <div>
              {this.props.issues &&
                this.props
                  .issues!.sortBy((issue: ProjectIssueRecord) =>
                    issue.get('order')
                  )
                  .map((issue: ProjectIssueRecord, index: number) => {
                    return (
                      <ProjectIssue
                        key={issue.get('id')}
                        kanbanId={this.props.column.get('kanbanId')}
                        onClick={this.props.onIssueClick}
                        rankProjectCardColumn={
                          this.props.rankProjectCardInKanbanRequest
                        }
                        issue={issue}
                        moveCard={() => {}}
                      />
                    );
                  })}
            </div>
          </div>

          <ColumnIssueCreator
            projectID={this.props.projectID}
            kanbanID={this.props.kanbanID}
            columnID={this.props.column.get('id')}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getColumnCardsRequest: getColumnCardsRequest,
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
        if (
          isEqual(
            rankProjectCardInKanbanInput,
            lastRankProjectCardInKanbanInput
          ) &&
          isEqual(meta, lastMeta)
        ) {
          return;
        }
        lastRankProjectCardInKanbanInput = rankProjectCardInKanbanInput;
        lastMeta = meta;

        dispatch(
          rankProjectCardInKanbanRequest(rankProjectCardInKanbanInput, meta)
        );
      };
    })(),
  };
};

const mapStateToProps = (state: RootState, props: InputProps) => {
  const issues = selectColumnCards(state, props.column.get('id'));

  return {
    issues,
  };
};

export const KanbanColumn = withRouter<InputProps & RouteComponentProps, any>(
  connect(mapStateToProps, mapDispatchToProps)(KanbanColumnComponent)
);
