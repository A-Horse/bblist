import './ProjectSideBar.scss';

import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Side } from '../../../../widget/Side/Side';
import { SideItemLink } from '../../../../widget/Side/SideItemLink';
import { ProjectInfoSection } from './ProjectInfoSection/ProjectInfoSection';
import { AppIcon } from '../../../../widget/Icon';
import { faChartLine, faCog, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons';
import { AppButton } from '../../../../widget/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducer';
import { selectKanbans } from '../../../../redux/reducer/selector/kanban.selector';
import { IKanban } from '../../../../typings/kanban.typing';

const localStorageShrinkToggleName = 'project-side-shrink';

export function ProjectSideBar(props: { projectId: string }) {
  const [shrink, setShrink] = useState(false);
  const match = useRouteMatch<{ projectId: string }>();
  const kanbans: IKanban[] = useSelector((state: RootState) => {
    return selectKanbans(state, props.projectId);
  });
  useEffect(() => {
    setShrink(!!window.localStorage.getItem(localStorageShrinkToggleName));
  }, []);

  const onExpandButtonClick = () => {
    window.localStorage.setItem(
      localStorageShrinkToggleName,
      !shrink ? 'true' : ''
    );
    setShrink(!shrink);
  };

  return (
    <Side className={`ProjectSideBar${shrink ? ' shrink' : ''}`}>
      <div className="ProjectSideBar--main">
        <ProjectInfoSection projectID={props.projectId} />
        <SideItemLink
          icon={faChartLine}
          to={`${match.url}/dashboard`}
          name="总览"
        />
        <>
          {kanbans.map((kanban: IKanban, index: number) => (
            <SideItemLink
              key={index}
              icon="list-alt"
              to={`${match.url}/kanban/${kanban.id}`}
              name={kanban.name}
            />
          ))}
        </>
        <SideItemLink
          icon="vector-square"
          to={`${match.url}/epics`}
          name="史诗"
        />
        <SideItemLink icon={faUsers} to={`${match.url}/team`} name="团队" />
        <SideItemLink icon="list-ol" to={`${match.url}/issues`} name="问题" />
      </div>

      <footer>
        <div>
          <SideItemLink
            icon={faCog}
            to={`${match.url}/setting`}
            name="项目设置"
          />
        </div>

        <AppButton className="shrink-button" onClick={onExpandButtonClick}>
          <AppIcon icon={faCaretSquareLeft} />
        </AppButton>
      </footer>
    </Side>
  );
}
