import './ProjectSideBar.scss';

import React, { Component } from 'react';
import { match } from 'react-router';

import { Side } from '../../../../components/widget/Side/Side';
import { SideItemLink } from '../../../../components/widget/Side/SideItemLink';

export class ProjectSideBar extends Component<{
  match: match<any>;
}> {
  render() {
    return (
      <Side className="ProjectSideBar">
        <SideItemLink icon="list-alt" to={`${this.props.match.url}/kanban`} name="Kanban" />
        <SideItemLink icon="vector-square" to={`${this.props.match.url}/epics`} name="Epics" />
        <SideItemLink icon="list-ol" to={`${this.props.match.url}/issues`} name="Issues" />
        <SideItemLink icon="cog" to={`${this.props.match.url}/setting`} name="Setting" />
        <SideItemLink icon="user-cog" to={`${this.props.match.url}/admin`} name="Admin" />
      </Side>
    );
  }
}
