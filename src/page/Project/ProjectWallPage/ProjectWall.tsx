import './ProjectWall.scss';

import React, { useEffect } from 'react';
import { ProjectRecord } from '../../../typings/project.typing';
import { ProjectWallAside } from './ProjectWallAside/ProjectWallAside';
import { ProjectDisplayCard } from './ProjectCoverItem/ProjectDisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsRequest } from '../../../redux/actions/project.action';
import { RootState } from '../../../redux/reducer';

export function ProjectWallPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectsRequest());
  }, [dispatch]);

  const projects = useSelector((state: RootState) =>
    state.project.projectMap.valueSeq().toArray()
  );

  return (
    <div className="ProjectWallPage">
      <ProjectWallAside />

      <div className="ProjectWallPage--content-container">
        <div className="project-cover-container">
          {projects.map((project: ProjectRecord) => {
            return (
              <ProjectDisplayCard key={project.get('id')} project={project} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// export class ProjectWallPage extends Component<Props> {
//   componentWillMount() {
//     return this.props.actions.getProjectsRequest();
//   }
//
//   render() {
//     return ;
//   }
// }

export default ProjectWallPage;
