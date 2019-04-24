import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_BOARD_COVER_SRC } from '../../../constants';
import { Layout } from 'antd';


import { BoardWallAside } from './BoardWallAside/BoardWallAside';
import { generateBoardCoverUrl } from '../../../utils/url';

const { Content } = Layout;

import './BoardWall.scss';

interface Props {
  actions: any;
  boardMap: any;
  boardSettingMap: any;
}

export class BoardWall extends Component<Props> {
  componentWillMount() {
    return this.props.actions.GET_TASK_ALL_BOARD_REQUEST();
  }

  render() {
    return (
      <Content className="board-wall-page-content">
        <div className="board-wall-page-content--inner-container">
          <div className="board-wall-page-content--inner-content">
            <BoardWallAside />

            <div className="taskboard-boards">
              <div className="board-group">
                <div className="board-card-container">
                  {this.props.boardMap &&
                    this.props.boardMap
                      .valueSeq()
                      .toArray()
                      .map((board: any) => {
                        console.log(board);
                        return (
                          <Link
                            className="taskboard-card"
                            style={{
                              backgroundImage: board.get('setting').get('cover')
                                ? `url(${generateBoardCoverUrl(board.get('setting').get('cover'))})`
                                : `url(${DEFAULT_BOARD_COVER_SRC})`
                            }}
                            key={board.get('id')}
                            to={`/task-board/${board.get('id')}`}
                          >
                            <div className="taskboard-card-info">
                              <div className="taskboard-card-info--name">{board.get('name')}</div>
                            </div>
                          </Link>
                        );
                      })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Content>
    );
  }
}
