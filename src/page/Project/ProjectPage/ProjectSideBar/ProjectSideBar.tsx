import './ProjectSideBar.scss';

import React, { Component } from 'react';
import { match } from 'react-router';

import { Side } from '../../../../components/widget/Side/Side';
import { SideItemLink } from '../../../../components/widget/Side/SideItemLink';
import { ProjectInfoSection } from './ProjectInfoSection/ProjectInfoSection';

export class ProjectSideBar extends Component<{
  projectID: string;
  match: match<any>;
}> {
  render() {
    return (
      <Side className="ProjectSideBar">
        <ProjectInfoSection projectID={this.props.projectID} />
        <SideItemLink
          icon="list-alt"
          to={`${this.props.match.url}/kanban`}
          name="看板"
        />
        <SideItemLink
          icon="vector-square"
          to={`${this.props.match.url}/epics`}
          name="史诗"
        />
        <SideItemLink
          icon="list-ol"
          to={`${this.props.match.url}/issues`}
          name="问题"
        />
        <SideItemLink
          icon="cog"
          to={`${this.props.match.url}/setting`}
          name="设置"
        />
      </Side>
    );
  }
}
