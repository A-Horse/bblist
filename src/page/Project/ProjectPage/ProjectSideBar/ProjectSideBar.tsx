import './ProjectSideBar.scss';

import React, { Component } from 'react';
import { match } from 'react-router-dom';

import { Side } from '../../../../widget/Side/Side';
import { SideItemLink } from '../../../../widget/Side/SideItemLink';
import { ProjectInfoSection } from './ProjectInfoSection/ProjectInfoSection';
import { AppIcon } from '../../../../widget/Icon';
import { faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';
import { AppButton } from '../../../../widget/Button';

const localStorageShrinkToggleName = 'project-side-shrink';

export class ProjectSideBar extends Component<
  {
    projectID: string;
    match: match<any>;
  },
  {
    shrink: boolean;
  }
> {
  state = {
    shrink: false,
  };

  componentDidMount() {
    this.setState({
      shrink: !!window.localStorage.getItem(localStorageShrinkToggleName),
    });
  }

  onExpandButtonClick = () => {
    window.localStorage.setItem(
      localStorageShrinkToggleName,
      !this.state.shrink ? 'true' : ''
    );
    this.setState({ shrink: !this.state.shrink });
  };

  render() {
    return (
      <Side className={`ProjectSideBar${this.state.shrink ? ' shrink' : ''}`}>
        <div className="ProjectSideBar--main">
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
            icon={faUsers}
            to={`${this.props.match.url}/team`}
            name="团队"
          />
          <SideItemLink
            icon="list-ol"
            to={`${this.props.match.url}/issues`}
            name="问题"
          />
        </div>

        <footer>
          <div>
            <SideItemLink
              icon={faCog}
              to={`${this.props.match.url}/setting`}
              name="项目设置"
            />
          </div>

          <AppButton
            className="shrink-button"
            onClick={this.onExpandButtonClick}
          >
            <AppIcon icon={faCaretSquareLeft} />
          </AppButton>
        </footer>
      </Side>
    );
  }
}
