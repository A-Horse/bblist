import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

import { getProjectsRequest } from '../../../actions/project/project.action';
import { ProjectWall } from './ProjectWall';

const mapStateToProps = (state: any) => {
  return {
    projects: state.project
      .get('projectMap')
      .valueSeq()
      .toArray()
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectsRequest
      },
      dispatch
    )
  };
};

const ProjectWallContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectWall) as any);

export default ProjectWallContainer;
