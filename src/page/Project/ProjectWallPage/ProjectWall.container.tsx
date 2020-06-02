import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { getProjectsRequest } from '../../../redux/actions/project.action';
import { ProjectWallPage } from './ProjectWall';

const mapStateToProps = (state: any) => {
  return {
    projects: state.project.get('projectMap').valueSeq().toArray(),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  return {
    actions: bindActionCreators(
      {
        getProjectsRequest,
      },
      dispatch
    ),
  };
};

const ProjectWallContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectWallPage) as any
);

export default ProjectWallContainer;
