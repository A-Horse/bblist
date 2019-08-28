import './KanbanColumn.scss';

import { Dropdown, Icon, Menu } from 'antd';
import React, { Component } from 'react';

import { withRouter, RouteComponentProps } from 'react-router';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../../../reducers';
import { KanbanColumnRecord } from '../../../../../../typings/kanban-column.typing';
import { getColumnCardsRequest } from '../../../../../../actions/project/kanban-card.action';

interface InputProps {
  column: KanbanColumnRecord;
}
interface ReduxProps {
  actions: ActionCreatorsMapObject;
}
interface ComponentProps extends RouteComponentProps, InputProps {}

class ColumnDataFetcher {
  private obsoleted = false;
  constructor(private component: KanbanColumnComponent) {}

  public fetchCards() {
    this.component.setState({
      cardFetching: true
    });
    this.component.props.actions.getColumnCardsRequest(
      {
        kanbanId: this.component.props.column.get('kanbanId'),
        columnId: this.component.props.column.get('id')
      },
      {
        requestDoneCallback: this.onFetchDone
      }
    );
  }

  public obsolete() {
    this.obsoleted = true;
  }

  private onFetchDone = () => {
    if (this.obsoleted) {
      return;
    }
    this.component.setState({
      cardFetching: false
    });
  };
}

class KanbanColumnComponent extends Component<
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
  // state = {
  //   trackDropDownVisible: false
  // };
  // domMain: any;
  // cardInstanceMap: any;
  // cardDragMeta: any;

  componentWillMount() {
    this.columDataFetcher.fetchCards();
  }

  componentWillUnmount() {
    this.columDataFetcher.obsolete();
  }

  // componentDidMount() {}

  // getTrackIdAndIndex() {
  //   return {
  //     id: this.props.track.get('id'),
  //     index: Number(this.domMain.dataset.index)
  //   };
  // }

  // pickCardInstance(cardConnectedInstance: any, id: string) {
  //   this.cardInstanceMap[id] = cardConnectedInstance;
  //   if (!cardConnectedInstance) {
  //     this.cardInstanceMap = R.omit([id], this.cardInstanceMap);
  //   }
  // }

  // resetDragMeta() {
  //   this.cardDragMeta = { placeholderCardIndex: -1 };
  // }

  // addTaskCard = (data: any) => {
  //   return this.props.addTaskCard({
  //     trackId: this.props.track.get('id'),
  //     ...data
  //   });
  // };

  render() {
    return (
      <div>
        <div className="task-track--top-bar">
          <div className="task-track--name">{this.props.column.get('name')}</div>
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item key="0" onClick={() => {}}>
                  <i className="fa fa-trash" aria-hidden="true" />
                  <span>Delete</span>
                </Menu.Item>
              </Menu>
            }
          >
            <Icon type="appstore-o" />
          </Dropdown>
        </div>

        <div className="task-track--body">
          <div>
            {/* {this.props.cards
              .sortBy((card: any) => card.get('index'))
              .valueSeq()
              .toArray()
              .map((card: any) => {
                return (
                  <TaskCard
                    actions={this.props.actions}
                    key={card.get('id')}
                    boardId={this.props.boardId}
                    card={card}
                    history={this.props.history}
                    match={this.props.match}
                  />
                );
              })} */}
          </div>
          {/* <TaskCardCreater
            loginedUser={this.props.loginedUser}
            addTaskCard={this.addTaskCard}
            track={this.props.track}
          /> */}
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
  return {};
};

export const KanbanColumn = withRouter<ComponentProps>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(KanbanColumnComponent)
);
