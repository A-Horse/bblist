import './ProjectSideBar.scss';

import React, { Component } from 'react';

import { Side } from '../../../../components/widget/Side/Side';
import { SideItemLink } from '../../../../components/widget/Side/SideItemLink';
import { match } from 'react-router';

export class BoardSideBar extends Component<{
  match: match<any>
}> {

  render() {
    return (
        <div>
            <Side>
                <SideItemLink to={`${this.props.match.url}/kanban`} name="kanban" />
                <SideItemLink to={`${this.props.match.url}/trackers`} name="trackers" />
                <SideItemLink to={`${this.props.match.url}/setting`} name="setting" />
            </Side>
        </div>
    );
  }
}
