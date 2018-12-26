//
import React, { Component } from 'react';
import * as R from 'ramda';
import Input from '../../../components/widget/Input/Input';
import { TaskCard } from '../TaskCard/TaskCard';
import TaskCardCreater from '../CardCreater/CardCreater';
import { isEnterKey } from '../../../utils/keyboard';
import { onTrackTopBarMouseDown } from './track-switch-helper';
import { Menu, Dropdown, Icon } from 'antd';

import './Track.scss';

export class Track extends Component {
  state = {
    trackDropDownVisible: false
  };

  constructor(props) {
    super(props);
    this.resetDragMeta();
  }

  componentWillMount() {
    this.cardInstanceMap = {};
  }

  componentDidMount() {}

  getTrackIdAndIndex() {
    return {
      id: this.props.track.get('id'),
      index: Number(this.domMain.dataset.index)
    };
  }

  pickCardInstance(cardConnectedInstance, id) {
    this.cardInstanceMap[id] = cardConnectedInstance;
    if (!cardConnectedInstance) {
      this.cardInstanceMap = R.omit([id], this.cardInstanceMap);
    }
  }

  onTopBarMouseDown = event => {
    onTrackTopBarMouseDown(event, this);
  };

  resetDragMeta() {
    this.cardDragMeta = { placeholderCardIndex: -1 };
  }

  addTaskCard = data => {
    return this.props.addTaskCard({
      trackId: +this.props.track.get('id'),
      ...data
    });
  };

  shouldComponentUpdate(newProps, newState) {
    return (
      !this.props.cards.equals(newProps.cards) ||
      !this.props.track.equals(newProps.track) ||
      this.state !== newState
    );
  }

  render() {
    return (
      <div
        ref={ref => (this.domMain = ref)}
        data-index={this.props.track.get('index')}
        data-id={this.props.track.get('id')}
        className="task-track"
      >
        <div className="task-track--top-bar" onMouseDown={this.onTopBarMouseDown.bind(this)}>
          <div className="task-track--name">
            <Input
              className="task-track--input"
              onMouseDown={event => event.stopPropagation()}
              onKeyDown={event => {
                isEnterKey(event) && event.preventDefault();
              }}
              onChange={name =>
                this.props.updateTrack({
                  trackId: this.props.track.get('id'),
                  name
                })
              }
              defaultValue={this.props.track.get('name')}
            />
          </div>
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            overlay={
              <Menu>
                <Menu.Item
                  key="0"
                  onClick={() =>
                    this.props.destroyTrack({
                      trackId: this.props.track.get('id')
                    })
                  }
                >
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
            {this.props.cards
              .sortBy(card => card.get('index'))
              .toArray()
              .map(card => {
                return (
                  <TaskCard
                    ref={cardConnectedInstance =>
                      this.pickCardInstance(cardConnectedInstance, card.get('id'))
                    }
                    actions={this.props.actions}
                    key={card.get('id')}
                    boardId={this.props.boardId}
                    card={card}
                    history={this.props.history}
                    match={this.props.match}
                  />
                );
              })}
          </div>
          <TaskCardCreater
            loginedUser={this.props.loginedUser}
            addTaskCard={this.addTaskCard}
            track={this.props.track}
          />
        </div>
      </div>
    );
  }
}
export default Track;
