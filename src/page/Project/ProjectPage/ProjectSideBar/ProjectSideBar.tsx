import './ProjectSideBar.scss';

import React, { Component } from 'react';

import { Side } from '../../../../components/widget/Side/Side';
import { SideItemLink } from '../../../../components/widget/Side/SideItemLink';
import { match } from 'react-router';

export class ProjectSideBar extends Component<{
  match: match<any>;
}> {
  render() {
    return (
      <Side>
        <SideItemLink to={`${this.props.match.url}/kanban`} name="Kanban" />
        <SideItemLink to={`${this.props.match.url}/trackers`} name="Trackers" />
        <SideItemLink to={`${this.props.match.url}/issues`} name="Issues" />
        <SideItemLink to={`${this.props.match.url}/setting`} name="Setting" />
        <SideItemLink to={`${this.props.match.url}/admin`} name="Admin" />
      </Side>
    );
  }
}
