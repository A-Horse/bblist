import React, { Component } from 'react';
import {
  faColumns,
  faPlusCircle,
  faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Side } from '../../../../widget/Side/Side';
import { SideGroup } from '../../../../widget/Side/SideGroup';
import { SideItemLink } from '../../../../widget/Side/SideItemLink';
import { SideItem } from '../../../../widget/Side/SideItem';
import './ProjectWallAside.scss';
import { ProjectCreatorModal } from '../../ProjectCreator/ProjectCreatorModal';
import { Divider } from '../../../../widget/Divider';

interface Props {}

export class ProjectWallAside extends Component<Props> {
  state = { createProjectModalOpen: false };

  componentWillMount() {}

  onCreateProject = () => {
    this.setState({ createProjectModalOpen: true });
  };

  render() {
    return (
      <>
        <Side className="ProjectWallAside">
          <SideGroup>
            <SideItemLink
              icon={faTachometerAlt}
              to={`/projects/overview`}
              name="主页"
            />
            <SideItemLink icon="list-alt" to={`/projects/all`} name="项目" />
            <SideItemLink
              icon={faColumns}
              to={`/projects/kanbans`}
              name="看板"
            />
          </SideGroup>

          <Divider />

          <SideGroup>
            <SideItem onClick={this.onCreateProject} icon={faPlusCircle}>
              新建项目
            </SideItem>
          </SideGroup>
        </Side>

        <ProjectCreatorModal
          isOpen={this.state.createProjectModalOpen}
          onClose={() => this.setState({ createProjectModalOpen: false })}
        />
      </>
    );
  }
}
